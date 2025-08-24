// app/actions/calls.ts
"use server";

import { ICall, TCallStatus } from "@/interface/call.interface";
import { createClient } from "@/utils/supabase/server";

export type GetClientCallsInput = {
  /** Pagination */
  page?: number; // default 1
  pageSize?: number; // default 20

  /** Filters */
  status?: TCallStatus;
  from?: string | Date; // call_time >= from
  to?: string | Date; // call_time <= to
  search?: string; // matches caller_number or notes (ILIKE)

  /** Sort */
  sortBy?: "call_time" | "created_at" | "caller_number" | "status";
  sortDir?: "asc" | "desc";
};



export const getClientCallsAction = async (input: GetClientCallsInput = {}) => {
  const supabase = await createClient();

  const {
    page = 1,
    pageSize = 20,
    status,
    from,
    to,
    search,
    sortBy = "call_time",
    sortDir = "desc",
  } = input;

  const fromIdx = Math.max(0, (page - 1) * pageSize);
  const toIdx = fromIdx + pageSize - 1;

  let query = supabase.from("calls").select(
    // join to get client_name (respects RLS on clients too)
    "id, client_id, caller_number, call_time, status, notes, clients!inner(client_name), created_at",
    { count: "exact" }
  );

  if (status) query = query.eq("status", status);

  if (from) query = query.gte("call_time", new Date(from).toISOString());
  if (to) query = query.lte("call_time", new Date(to).toISOString());

  if (search && search.trim()) {
    const term = `%${search.trim()}%`;
    // match caller_number or notes
    query = query.or(`caller_number.ilike.${term},notes.ilike.${term}`);
  }

  // sort + paginate
  query = query.order(sortBy, { ascending: sortDir === "asc" }).range(fromIdx, toIdx);

  const { data, count, error } = await query;

  if (error) {
    return { error: error.message, status: 400 as const };
  }

  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data: (data ?? []) as ICall[],
    meta: {
      page,
      pageSize,
      total: count ?? 0,
      totalPages: Math.max(1, Math.ceil((count ?? 0) / pageSize)),
      sortBy,
      sortDir,
      filters: {
        status: status ?? null,
        from: from ?? null,
        to: to ?? null,
        search: search ?? null,
      },
    },
    status: 200 as const,
  };
};
