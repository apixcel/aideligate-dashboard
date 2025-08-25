"use server";
import { IDoctor } from "@/interface/doctor";
import { createClient } from "@/utils/supabase/server";
export const getAllDoctors = async () => {
  const supabase = await createClient();
  const query = supabase.from("doctors").select("*", { count: "exact" });
  const { data, count, error } = await query;

  if (error) {
    return { error: error.message, status: 400 as const };
  }
  return {
    data: data as IDoctor[],
    error: null,
    status: 200,
    meta: {
      total: count ?? 0,
    },
  };
};
