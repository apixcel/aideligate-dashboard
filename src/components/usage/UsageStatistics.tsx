"use client";
import { SectionSubTitle } from "@/components";
import { Calendar, ChartColumn, Phone, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const UsageStatistics = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6">
      <div>
        {/* section sub title */}
        <SectionSubTitle
          icon={ChartColumn}
          title={t("usage_plan.current_plan")}
          description={t("usage_plan.your_subscription_details_and_usage_limits")}
        />
      </div>

      <div className="flex flex-col gap-4">
        {/* calls this month */}
        <div className="flex items-center justify-between rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">{t("usage_plan.calls_this_month")}</p>
              <p className="text-xs text-light">{t("usage_plan.total_incoming_outgoing")}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">387</p>
          </div>
        </div>

        {/* appointments */}
        <div className="flex items-center justify-between rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">{t("usage_plan.appointments")}</p>
              <p className="text-xs text-light">{t("usage_plan.scheduled_this_month")}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">142</p>
          </div>
        </div>

        {/* reviews */}
        <div className="flex items-center justify-between rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">{t("usage_plan.reviews")}</p>
              <p className="text-xs text-light">{t("usage_plan.new_reviews_received")}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">23</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-darker pt-4">
        <div className="text-center">
          <p className="text-sm text-light">{t("usage_plan.avg_call_duration")}</p>
          <p className="text-lg font-semibold">8:45</p>
        </div>

        <div className="text-center">
          <p className="text-sm text-light">{t("usage_plan.peak_usage_day")}</p>
          <p className="text-lg font-semibold">{t("usage_plan.monday")}</p>
        </div>
      </div>
    </div>
  );
};

export default UsageStatistics;
