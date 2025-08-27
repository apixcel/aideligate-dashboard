"use client";
import { CurrentPlan, SectionSubTitle, SectionTitle, UsageStatistics } from "@/components";
import { useTranslation } from "react-i18next";

const UsagePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionTitle
        title={t("usage_plan.title")}
        description= {t("usage_plan.description")}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <CurrentPlan />
        <UsageStatistics />
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6">
        <div>
          {/* section sub title */}
          <SectionSubTitle
            title={t("usage_plan.usage_insights")}
            description= {t("usage_plan.recommendation_to_optimize")}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-darker bg-darkest p-4">
            <h4 className="mb-2 font-medium">{t("usage_plan.call_efficiency")}</h4>
            <p className="text-sm text-light">
            {t("usage_plan.your_avg_call_duration")}
            </p>
          </div>
          <div className="rounded-lg border border-darker bg-darkest p-4">
            <h4 className="mb-2 font-medium">{t("usage_plan.peak_usage")}</h4>
            <p className="text-sm text-light">
              {t("usage_plan.mondays_see_the_highest_call_volume")}
            </p>
          </div>
          <div className="rounded-lg border border-darker bg-darkest p-4">
            <h4 className="mb-2 font-medium">{t("usage_plan.plan_optimization")}</h4>
            <p className="text-sm text-light">{t("usage_plan.your_usage_is_on_track")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsagePage;
