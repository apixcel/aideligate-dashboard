"use server";

import { ITimeBlock } from "@/interface/timeBlock.interface";
import { createClient } from "@/utils/supabase/server";
import { ensureDefaultClient } from "./auth.action";

export const createTimeBlocks = async (
  payloads: Pick<ITimeBlock, "start_time" | "end_time" | "day_of_week">[]
) => {
  const supabase = await createClient();

  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    return {
      error: "User not authenticated",
      status: 401,
    };
  }

  let client = await supabase.from("clients").select("id").eq("user_id", auth.user.id).single();

  if (!client.data) {
    await ensureDefaultClient(Promise.resolve(supabase), {
      client_email: auth.user.email!,
      client_name: auth.user.user_metadata.display_name || "N/A",
    });
    client = await supabase.from("clients").select("id").eq("user_id", auth.user.id).single();
  }

  const { data, error } = await supabase
    .from("time_block")
    .insert(
      payloads.map((p) => ({
        start_time: p.start_time,
        end_time: p.end_time,
        day_of_week: p.day_of_week,
        client_id: client.data?.id,
      }))
    )
    .select("*");

  if (error) {
    console.error("Error creating time blocks:", error);
    throw new Error(error.message);
  }

  return {
    data: data as ITimeBlock[],
  };
};
export interface GetTimeBlocksOptions {
  day_of_week?: number; // filter by 1..7
  limit?: number; // pagination: number of rows
  offset?: number; // pagination: starting row (0-based)
}
export const getTimeBlocks = async (opts: GetTimeBlocksOptions = {}) => {
  const supabase = await createClient();

  let query = supabase
    .from("time_block")
    .select("*", { count: "exact" })
    .order("day_of_week", { ascending: true })
    .order("start_time", { ascending: true });

  if (typeof opts.day_of_week === "number") {
    query = query.eq("day_of_week", opts.day_of_week);
  }

  if (opts.limit && opts.limit > 0) {
    const from = opts.offset ?? 0;
    const to = from + opts.limit - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching time blocks:", error);
    return { error: error.message };
  }

  // Cast to your shape if needed
  return {
    data: (data ?? []) as ITimeBlock[],
    count: count ?? null,
  };
};

export const deleteTimeBlock = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase.from("time_block").delete().eq("id", id);

  if (error) {
    console.error("Error deleting time block:", error);
    return { error: error.message };
  }

  return { success: true };
};
