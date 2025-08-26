"use server";

import { IAppointment, TAppointmentStatus } from "@/interface/appointment.interface";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createAppointmentAction(
  payload: Omit<IAppointment, "id" | "client_id"> & { revalidate?: string }
) {
  const supabase = await createClient();

  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError) {
    return { error: authError.message, status: 400 } as const;
  }

  const client = await supabase.from("clients").select("*").eq("user_id", auth.user.id).single();
  if (!client.data) {
    return { error: "Client not found", status: 400 } as const;
  }

  if (client.error) {
    return { error: client.error.message, status: 400 } as const;
  }

  if (!payload.date_time) {
    return { error: "date_time is required", status: 400 } as const;
  }

  const dt =
    typeof payload.date_time === "string" ? new Date(payload.date_time) : payload.date_time;

  if (Number.isNaN(dt.getTime())) {
    return { error: "date_time is invalid", status: 400 } as const;
  }
  const parseOffsetMinutes = (timetz: string): number => {
    const z = timetz.endsWith("Z");
    if (z) return 0;

    const m = timetz.match(/([+-])(\d{2})(?::?(\d{2}))?$/);
    if (!m) return 0;
    const sign = m[1] === "-" ? -1 : 1;
    const hh = parseInt(m[2], 10);
    const mm = m[3] ? parseInt(m[3], 10) : 0;
    return sign * (hh * 60 + mm);
  };

  // "HH:MM[:SS]" (prefix of timetz) → minutes since midnight
  const parseHHMMtoMinutes = (timetz: string): number => {
    const m = timetz.match(/^(\d{2}):(\d{2})(?::\d{2})?/);
    if (!m) return 0;
    return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
  };

  // Convert a UTC instant → local (for numeric offset) minutes + ISO weekday 1..7
  const localMinutesAndIsoDow = (utcInstant: Date, offsetMin: number) => {
    const localMs = utcInstant.getTime() + offsetMin * 60_000;
    const d = new Date(localMs); // use UTC getters to avoid host tz
    const minsSinceMidnight = d.getUTCHours() * 60 + d.getUTCMinutes();
    const dow0Sun6 = d.getUTCDay();
    const isoDow = ((dow0Sun6 + 6) % 7) + 1; // 1=Mon..7=Sun
    return { minsSinceMidnight, isoDow };
  };

  // --- fetch blocks and check conflicts ---

  const { data: blocks, error: blocksError } = await supabase
    .from("time_block")
    .select("day_of_week,start_time,end_time")
    .eq("client_id", client.data.id);

  if (blocksError) return { error: blocksError.message, status: 400 } as const;

  // Check against each block (each timetz carries its own offset)
  for (const b of blocks ?? []) {
    const startOffset = parseOffsetMinutes(b.start_time as unknown as string);
    const endOffset = parseOffsetMinutes(b.end_time as unknown as string);

    // if offsets differ, pick start's (they *should* match per row)
    const offsetMin = startOffset || endOffset || 0;

    const { minsSinceMidnight, isoDow } = localMinutesAndIsoDow(dt, offsetMin);
    if (isoDow !== b.day_of_week) continue;

    const startMin = parseHHMMtoMinutes(b.start_time as unknown as string);
    const endMin = parseHHMMtoMinutes(b.end_time as unknown as string);
    // overlap if appt time ∈ [start, end)
    if (minsSinceMidnight >= startMin && minsSinceMidnight < endMin) {
      return {
        error: `This time is blocked`,
        status: 409, // conflict
      } as const;
    }
  }

  // insert (RLS will ensure the user can only insert for their own client_id)
  const { data, error } = await supabase
    .from("appointments") // <- your exact table name
    .insert({
      client_id: client.data.id,
      patient_name: payload.patient_name ?? "N/A",
      date_time: dt,
      service_type: payload.service_type ?? "N/A",
      notes: payload.notes ?? "N/A",
      doctor_id: payload.doctor_id ?? null,
    })
    .select("*")
    .single();

  if (error) {
    return { error: error.message, status: 400 } as const;
  }

  if (payload.revalidate) revalidatePath(payload.revalidate, "page");
  return { data, status: 200 } as const;
}
export type ListAppointmentsParams = {
  doctor_id?: string; // optional filter
  from?: string | Date; // start datetime (inclusive)
  to?: string | Date; // end datetime (exclusive)
  page?: number; // default 1
  limit?: number; // default 20
  order?: "asc" | "desc"; // default "desc" (newest first)
  search?: string;
  status?: TAppointmentStatus;
};

export async function getAppointments(params: ListAppointmentsParams = {}) {
  const supabase = await createClient();

  const page = Math.max(1, params.page ?? 1);
  const limit = Math.min(100, Math.max(1, params.limit ?? 20));
  const fromIdx = (page - 1) * limit;
  const toIdx = fromIdx + limit - 1;

  let q = supabase
    .from("appointments") // note: your table name has 3 p's
    .select("*, doctor:doctors(id, full_name)", { count: "exact" })
    .order("date_time", { ascending: (params.order ?? "asc") === "asc" })
    .range(fromIdx, toIdx);

  if (params.doctor_id) q = q.eq("doctor_id", params.doctor_id);

  // date range
  const toISO = (v: string | Date) => (v instanceof Date ? v : new Date(v)).toISOString();
  if (params.search?.trim()) {
    const term = params.search.trim().replace(/[%_]/g, "\\$&"); // escape % and _
    // PostgREST OR syntax: col.ilike.%value%,other.ilike.%value%
    q = q.or(`patient_name.ilike.%${term}%,notes.ilike.%${term}%`);
  }
  if (params.from) q = q.gte("date_time", toISO(params.from));
  if (params.to) q = q.lt("date_time", toISO(params.to));

  if (params.status) q = q.eq("status", params.status);

  const { data, error, count } = await q;

  if (error) {
    return { error: error.message, status: 400 as const };
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
    status: 200 as const,
  };
}

export async function deleteAppointmentAction(id: string, opts?: { revalidate?: string }) {
  const supabase = await createClient();

  if (id === undefined || id === null || id === "") {
    return { error: "id is required", status: 400 as const };
  }

  const { data, error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) return { error: error.message, status: 400 as const };
  if (!data) return { error: "Appointment not found", status: 404 as const };

  if (opts?.revalidate) revalidatePath(opts.revalidate, "page");
  return { data, status: 200 as const };
}

export async function updateAppointmentAction(
  input: Partial<IAppointment> & { revalidate?: string }
) {
  const supabase = await createClient();

  if (!input.id) {
    return { error: "id is required", status: 400 as const };
  }

  const patch: Record<string, string | Date> = {};
  if (input.patient_name !== undefined) patch.patient_name = input.patient_name;
  if (input.service_type !== undefined) patch.service_type = input.service_type;
  if (input.notes !== undefined) patch.notes = input.notes;
  if (input.doctor_id !== undefined) patch.doctor_id = input.doctor_id;
  if (input.status !== undefined) patch.status = input.status;

  // ---- Compose date_time if provided ----
  if (input.date_time !== undefined) {
    patch.date_time = input.date_time instanceof Date ? input.date_time : new Date(input.date_time);
    if (isNaN(patch.date_time.getTime())) {
      return { error: "Invalid date_time", status: 400 as const };
    }
  }

  if (Object.keys(patch).length === 0) {
    return { error: "Nothing to update", status: 400 as const };
  }

  const { data, error } = await supabase
    .from("appointments") // <- triple 'p'
    .update(patch)
    .eq("id", input.id)
    .maybeSingle();

  if (error) return { error: error.message, status: 400 as const };

  if (input.revalidate) revalidatePath(input.revalidate, "page");
  return { data, status: 200 as const };
}
