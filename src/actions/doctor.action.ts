"use server";
import { IDoctor } from "@/interface/doctor";
import { createClient } from "@/utils/supabase/server";
import { ensureDefaultClient } from "./auth.action";
export const getAllDoctors = async (opts?: { search?: string }) => {
  const supabase = await createClient();

  let q = supabase.from("doctors").select("*", { count: "exact" });

  // optional search on full_name (ILIKE %term%)
  if (opts?.search?.trim()) {
    const term = opts.search.trim().replace(/[%_]/g, "\\$&"); // escape % and _
    q = q.ilike("full_name", `%${term}%`);
    // If you want prefix-only search, use: q = q.ilike("full_name", `${term}%`);
  }

  const { data, count, error } = await q;

  if (error) {
    return { error: error.message, status: 400 as const };
  }
  return {
    data: (data ?? []) as IDoctor[],
    error: null,
    status: 200 as const,
    meta: { total: count ?? 0 },
  };
};

export const createDoctorAction = async (payload: Pick<IDoctor, "full_name">) => {
  const supabase = await createClient();

  if (!payload.full_name?.trim()) {
    return { error: "full_name is required", status: 400 as const };
  }

  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    return { error: "User not found", status: 400 as const };
  }
  let client = await supabase.from("clients").select("id").eq("user_id", auth.user.id).single();

  if (!client.data) {
    await ensureDefaultClient({
      client_email: auth.user.email!,
      client_name: auth.user.user_metadata.display_name || "N/A",
    });
    client = await supabase.from("clients").select("id").eq("user_id", auth.user.id).single();
  }

  const { data, error } = await supabase
    .from("doctors")
    .insert({ full_name: payload.full_name.trim(), client_id: client.data?.id })
    .select("*")
    .single();

  if (error) return { error: error.message, status: 400 as const };

  return { data, status: 200 as const };
};
export const updateDoctorAction = async (input: Partial<IDoctor>) => {
  const supabase = await createClient();

  if (!input.id) return { error: "id is required", status: 400 as const };

  const patch: Record<string, unknown> = {};
  if (typeof input.full_name === "string") patch.full_name = input.full_name.trim();

  if (Object.keys(patch).length === 0) {
    return { error: "Nothing to update", status: 400 as const };
  }

  const { data, error } = await supabase
    .from("doctors")
    .update(patch)
    .eq("id", input.id)
    .select("*")
    .single();

  if (error) return { error: error.message, status: 400 as const };

  return { data, status: 200 as const };
};

export const deleteDoctorAction = async (doctorId: string) => {
  const supabase = await createClient();

  if (!doctorId) return { error: "id is required", status: 400 as const };

  const { data, error } = await supabase
    .from("doctors")
    .delete()
    .eq("id", doctorId)
    .select("id")
    .maybeSingle();

  if (error) {
    // Common case: FK constraint if appointments reference this doctor
    // Surface the message; you can also map it to a friendlier text in UI.
    return { error: error.message, status: 400 as const };
  }
  if (!data) return { error: "Doctor not found", status: 404 as const };

  return { data, status: 200 };
};
