"use server";

import { IAppointment } from "@/interface/appointment.interface";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createAppointmentAction(payload: IAppointment) {
  const supabase = await createClient();

  // basic validation
  if (!payload.client_id) {
    return { error: "client_id is required", status: 400 } as const;
  }
  if (!payload.date_time) {
    return { error: "date_time is required", status: 400 } as const;
  }

  const dt =
    typeof payload.date_time === "string" ? new Date(payload.date_time) : payload.date_time;

  if (Number.isNaN(dt.getTime())) {
    return { error: "date_time is invalid", status: 400 } as const;
  }

  // insert (RLS will ensure the user can only insert for their own client_id)
  const { data, error } = await supabase
    .from("apppointments") // <- your exact table name
    .insert({
      client_id: payload.client_id,
      patient_name: payload.patient_name ?? null,
      date_time: dt,
      service_type: payload.service_type ?? null,
      notes: payload.notes ?? null,
      // IMPORTANT: your schema sets a DEFAULT gen_random_uuid() for doctor_id.
      // Pass doctor_id explicitly, or make sure that default is removed.
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
  client_id?: string; // filter by client
  doctor_id?: string; // optional filter
  from?: string | Date; // start datetime (inclusive)
  to?: string | Date; // end datetime (exclusive)
  page?: number; // default 1
  limit?: number; // default 20
  order?: "asc" | "desc"; // default "desc" (newest first)
};

export async function listAppointmentsAction(params: ListAppointmentsParams = {}) {
  const supabase = await createClient();

  const page = Math.max(1, params.page ?? 1);
  const limit = Math.min(100, Math.max(1, params.limit ?? 20));
  const fromIdx = (page - 1) * limit;
  const toIdx = fromIdx + limit - 1;

  let q = supabase
    .from("apppointments") // note: your table name has 3 p's
    .select(
      // select only what you need; "*" is fine to start
      "id, created_at, patient_name, date_time, service_type, notes, doctor_id, client_id",
      { count: "exact" }
    )
    .order("date_time", { ascending: (params.order ?? "desc") === "asc" })
    .range(fromIdx, toIdx);

  if (params.client_id) q = q.eq("client_id", params.client_id);
  if (params.doctor_id) q = q.eq("doctor_id", params.doctor_id);

  // date range
  const toISO = (v: string | Date) => (v instanceof Date ? v : new Date(v)).toISOString();
  if (params.from) q = q.gte("date_time", toISO(params.from));
  if (params.to) q = q.lt("date_time", toISO(params.to));

  const { data, error, count } = await q;

  if (error) {
    return { error: error.message, status: 400 as const };
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    data,
    page,
    limit,
    total,
    totalPages,
    status: 200 as const,
  };
}
