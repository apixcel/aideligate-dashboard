"use server";

import { IReview } from "@/interface/review.interface";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export type ListReviewsParams = {
  page?: number; // default 1
  limit?: number; // default 20 (max 100)
  orderBy?: "created_at" | "rating"; // default "created_at"
  order?: "asc" | "desc"; // default "desc"
  rating?: { op: "lt" | "gt" | "eq"; value: number }; // e.g. { op: "gte", value: 4 } -> use lt/gt/eq
  media?: string;
  replied?: "replied" | "not_replied"; // presence of reply
};

export async function getReviews(params: ListReviewsParams = {}) {
  const supabase = await createClient();

  const page = Math.max(1, params.page ?? 1);
  const limit = Math.min(100, Math.max(1, params.limit ?? 20));
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let q = supabase
    .from("reviews")
    .select("id, client_id, user_name, rating, reply, media,text, created_at", { count: "exact" });

  // ---- rating filter (lt/gt/eq) ----
  if (params.rating && typeof params.rating.value === "number") {
    const { op, value } = params.rating;
    if (value < 0 || value > 5) {
      return { error: "rating value must be between 1 and 5", status: 400 as const };
    }
    if (op === "lt") q = q.lt("rating", value);
    if (op === "gt") q = q.gt("rating", value);
    if (op === "eq") q = q.eq("rating", value);
  }

  // ---- media presence ----
  if (params.media) {
    q = q.eq("media", params.media);
  }

  // ---- reply presence ----
  if (params.replied === "replied") {
    q = q.not("reply", "is", null).neq("reply", "");
  } else if (params.replied === "not_replied") {
    q = q.is("reply", null);
    // If you also consider empty string as "not replied", use:
    // q = q.or("reply.is.null,reply.eq.");
  }

  q = q
    .order(params.orderBy ?? "created_at", {
      ascending: (params.order ?? "desc") === "asc",
    })
    .range(from, to);

  const { data, error, count } = await q;

  if (error) return { error: error.message, status: 400 as const };

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    data: data as IReview[],
    meta: { page, limit, total, totalPages },
    status: 200 as const,
  };
}

export type UpdateReviewReplyInput = {
  id: string;
  reply: string;
  revalidate?: string; // e.g. "/reviews"
};

export async function updateReviewReplyAction(input: UpdateReviewReplyInput) {
  const supabase = await createClient();

  if (!input.id) return { error: "id is required", status: 400 as const };

  if (!input.reply?.trim()) return { error: "reply is required", status: 400 as const };

  const normalizedReply = input.reply.trim();

  const { data, error } = await supabase
    .from("reviews")
    .update({ reply: normalizedReply })
    .eq("id", input.id)
    .select("id, client_id, user_name, rating, reply, media, created_at")
    .maybeSingle();

  if (error) return { error: error.message, status: 400 as const };
  if (!data) return { error: "Review not found", status: 404 as const };

  if (input.revalidate) revalidatePath(input.revalidate, "page");
  return { data, status: 200 as const };
}
