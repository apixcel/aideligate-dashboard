"use client";
import { getReviews, ListReviewsParams } from "@/actions/reviews.action";
import { IReview } from "@/interface/review.interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DropDownSelector from "../shared/DropDownSelector";
import CreateOrUpDateReply from "./CreateOrUpDateReply";
/** --- Small UI bits --- */
const Star = ({ filled = false, className = "" }) => (
  <svg
    viewBox="0 0 20 20"
    aria-hidden="true"
    className={`h-4 w-4 ${className}`}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 2.5l2.472 4.924 5.435.79-3.933 3.835.928 5.409L10 14.95l-4.902 2.508.928-5.409L2.093 8.214l5.435-.79L10 2.5z"
    />
  </svg>
);

const Badge = ({
  tone = "green",
  children,
}: {
  tone?: "green" | "slate" | "red";
  children: React.ReactNode;
}) => {
  const tones =
    tone === "green"
      ? "bg-green-50 text-green-700 ring-green-600/20"
      : tone === "red"
        ? "bg-red-50 text-red-800 ring-red-600/20"
        : "bg-slate-100 text-slate-700 ring-slate-600/20";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${tones}`}
    >
      {children}
    </span>
  );
};

/** --- Card --- */
const ReviewCard = ({ review, onReply }: { review: IReview; onReply?: () => void }) => {
  const name = review.user_name || "Anonymous";
  const rawRating = Number(review.rating);
  const rating = Number.isFinite(rawRating) ? Math.max(0, Math.min(5, rawRating)) : 0;

  const { t } = useTranslation();

  // >3 = Positive, =3 = Neutral, <3 = Negative
  const sentiment =
    rating > 3
      ? { label: "reviews.positive", tone: "green" as const }
      : rating === 3
        ? { label: "reviews.neutral", tone: "slate" as const }
        : { label: "reviews.negative", tone: "red" as const };

  const dateStr = review.created_at
    ? new Date(review.created_at as unknown as string).toLocaleDateString()
    : "";

  return (
    <div className="rounded-2xl border border-dark bg-darker px-5 py-[40px] shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{name}</p>
              <Badge tone={sentiment.tone}>{t(sentiment.label)}</Badge>
              {review.reply && <Badge tone="slate">{t("reviews.replied")}</Badge>}
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} filled={i < rating} />
                ))}
              </div>
              <span className="text-yellow-500">({rating})</span>
              {dateStr && <span className="text-light">• {dateStr}</span>}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <CreateOrUpDateReply onSuccess={onReply} review={review} />
          <Link
            href={"/"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-light px-3 py-1.5 text-sm font-medium"
          >
            ↗ {t("reviews.view_original")}
          </Link>
        </div>
      </div>

      {/* Body */}
      {review.text && <p className="mt-4 text-[15px] leading-6">{review.text}</p>}

      {review.reply && (
        <div className="mt-5 border-l-2 border-emerald-400 pl-4">
          <p className="text-sm font-medium text-emerald-700">{t("reviews.your_reply")}</p>
          <p className="mt-1 text-sm">{review.reply}</p>
        </div>
      )}
    </div>
  );
};

/** --- Page --- */
const Reviews = () => {
  const [data, setData] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  const [refetch, setRefetch] = useState(0);

  const [query, setQuery] = useState<ListReviewsParams>({
    media: "",
    rating: { op: "gt", value: 0 },
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviews({
          ...query,
        });
        setData(res?.data || []);
        console.log(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [query, refetch]);

  if (loading) {
    return <div className="p-6 text-slate-500">Loading reviews…</div>;
  }

  return (
    <div className="my-7">
      <div className="flex items-end justify-start gap-[15px]">
        <div className="flex flex-col gap-[10px]">
          <span>{t("reviews.sentiment")}</span>
          <DropDownSelector
            containerClassName="w-full max-w-[150px]"
            data={[
              { value: "", label: t("reviews.all") },
              { value: "positive", label: t("reviews.positive") },
              { value: "negative", label: t("reviews.negative") },
              { value: "neutral", label: t("reviews.neutral") },
            ]}
            onChange={(e) => {
              const op =
                e.value === "positive"
                  ? { op: "gt", value: 3 }
                  : e.value === "negative"
                    ? { op: "lt", value: 3 }
                    : e.value === "neutral"
                      ? { op: "eq", value: 3 }
                      : { op: "", value: 0 };
              setQuery({ ...query, rating: op as { op: "lt" | "gt" | "eq"; value: number } });
            }}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <span>{t("reviews.source")}</span>
          <DropDownSelector
            containerClassName="w-full max-w-[150px]"
            onChange={(value) => setQuery({ ...query, media: value.value as string })}
            data={[
              { value: "", label: t("reviews.all") },
              { value: "facebook", label: "Facebook" },
              { value: "google", label: "Google" },
              { value: "x", label: "X" },
            ]}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <span>{t("reviews.reply_status")}</span>
          <DropDownSelector
            containerClassName="w-full max-w-[150px]"
            data={[
              { value: "", label: t("reviews.all") },
              { value: "replied", label: t("reviews.replied") },
              { value: "not_replied", label: t("reviews.not_replied") },
            ]}
            onChange={(value) =>
              setQuery({ ...query, replied: value.value as "replied" | "not_replied" })
            }
          />
        </div>
      </div>

      {data.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          No reviews yet.
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-[20px]">
          {data.map((r) => (
            <ReviewCard onReply={() => setRefetch(refetch + 1)} key={r.id} review={r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
