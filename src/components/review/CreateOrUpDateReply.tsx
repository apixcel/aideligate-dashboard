// components/reviews/CreateOrUpDateReply.tsx
"use client";

import { updateReviewReplyAction } from "@/actions/reviews.action";
import type { IReview } from "@/interface/review.interface";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  review: IReview;
  onSuccess?: () => void;
};

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    aria-hidden="true"
    className={`h-4 w-4 ${filled ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"} stroke-current`}
  >
    <path
      strokeWidth="1"
      d="M10 2.5l2.35 4.76 5.26.77-3.8 3.7.9 5.24L10 14.93 5.29 17l.9-5.24-3.8-3.7 5.26-.77L10 2.5z"
    />
  </svg>
);

export default function CreateOrUpDateReply({ review, onSuccess }: Props) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [reply, setReply] = useState(review.reply ?? "");
  const [saving, setSaving] = useState(false);

  const name = review.user_name || "Anonymous";
  const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSaving(true);
      await updateReviewReplyAction({ id: review.id, reply });
      onSuccess?.();
      setIsOpen(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-lg border border-light px-3 py-1.5 text-sm font-medium"
        onClick={() => setIsOpen(true)}
      >
        ↩︎ {t(review.reply ? "reviews.edit_reply" : "reviews.reply")}
      </button>

      {/* Dialog */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0 translate-y-1 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-1 sm:scale-95"
              >
                <Dialog.Panel className="w-full max-w-md rounded-2xl border-[1px] border-light bg-darker p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <Dialog.Title className="text-base font-semibold">Reply to Review</Dialog.Title>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="rounded p-1 text-gray-500 hover:bg-gray-100"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Reviewer row */}
                  <div className="mt-3 flex items-start gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{name}</p>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} filled={i < rating} />
                          ))}
                          <span className="ml-1 text-xs text-gray-500">({rating})</span>
                        </div>
                      </div>
                      {/* Original review text (if you have it as review.text) */}
                      {Boolean(review.text) && (
                        <p className="mt-2 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                          {review.text}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Reply form */}
                  <form onSubmit={handleSubmit} className="mt-4">
                    <label className="mb-1 block text-sm font-medium">
                      {" "}
                      {t("reviews.your_reply")}{" "}
                    </label>
                    <div className="relative">
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        rows={4}
                        placeholder="Write your reply to this review..."
                        className="w-full resize-none rounded-lg bg-dark p-3 pr-12 text-sm ring-0 outline-none"
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving || !reply.trim()}
                        className="rounded-md bg-brand-blue-2 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                      >
                        {saving ? "Posting..." : "Post Reply"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
