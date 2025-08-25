// app/actions/dashboard_raw.ts
"use server";

import { createClient } from "@/utils/supabase/server";

function getUtcWeekBounds(now = new Date()) {
  const day = now.getUTCDay(); // 0=Sun..6=Sat
  const diffToMonday = (day + 6) % 7; // 0 if Monday
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - diffToMonday, 0, 0, 0, 0)
  );
  const end = new Date(
    Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + 7, 0, 0, 0, 0)
  );
  return { start, end };
}

function getUtcDayBounds(now = new Date()) {
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0)
  );
  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0)
  );
  return { start, end };
}

export async function getStatistics() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "User not found", status: 400 as const };

  const clientRes = await supabase.from("clients").select("id").eq("user_id", user.id).single();

  if (!clientRes.data) return { error: "Client not found", status: 400 as const };
  const clientId = clientRes.data.id;

  const { start: todayStartUTC, end: todayEndUTC } = getUtcDayBounds();
  const { start: weekStartUTC, end: weekEndUTC } = getUtcWeekBounds();

  // Calls today (UTC)
  const callsQ = supabase
    .from("calls")
    .select("*", { count: "exact", head: true })
    .gte("call_time", todayStartUTC.toISOString())
    .lt("call_time", todayEndUTC.toISOString())
    .eq("client_id", clientId);

  // Appointments this week (UTC)
  const apptsQ = supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .gte("date_time", weekStartUTC.toISOString())
    .lt("date_time", weekEndUTC.toISOString())
    .eq("client_id", clientId);

  // Reviews this week (UTC)
  const reviewsQ = supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })
    .gte("created_at", weekStartUTC.toISOString())
    .lt("created_at", weekEndUTC.toISOString())
    .eq("client_id", clientId);

  const [
    { count: callsToday, error: e1 },
    { count: appointmentsThisWeek, error: e2 },
    { count: reviewsThisWeek, error: e3 },
  ] = await Promise.all([callsQ, apptsQ, reviewsQ]);

  if (e1) return { error: e1.message, status: 400 as const };
  if (e2) return { error: e2.message, status: 400 as const };
  if (e3) return { error: e3.message, status: 400 as const };

  return {
    data: {
      callsToday: callsToday ?? 0,
      appointmentsThisWeek: appointmentsThisWeek ?? 0,
      reviewThiWeek: reviewsThisWeek ?? 0, // kept your original key name
      rangesUTC: {
        today: { start: todayStartUTC.toISOString(), end: todayEndUTC.toISOString() },
        week: { start: weekStartUTC.toISOString(), end: weekEndUTC.toISOString() },
      },
    },
    status: 200 as const,
  };
}
