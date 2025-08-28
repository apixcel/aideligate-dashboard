"use client";

import { SectionSubTitle } from "@/components";
import { cn } from "@/utils";
import { Filter } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppointmentsTabs from "./AppointmentsTabs";
import CallTabs from "./CallTabs";
import ReviewsTabs from "./ReviewsTabs";

const tabs = [
  // {
  //   label: "All",
  //   value: "all",
  // },
  {
    label: "nav.appointments",
    value: "appointments",
  },
  {
    label: "nav.calls",
    value: "calls",
  },

  {
    label: "nav.reviews",
    value: "reviews",
  },
];

const HomeFeedTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6 transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* section sub title */}
        <SectionSubTitle
          title={t("dashboard_overview.live_activity")}
          description={t("dashboard_overview.recent_activity")}
        />

        <div className="flex items-center gap-4">
          <Filter className="h-4 w-4 text-lighter" />
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                onClick={() => setActiveTab(tab.value)}
                key={tab.value}
                className={cn(
                  "rounded-md px-3 py-1 text-sm text-lighter hover:bg-brand-blue-2/80",
                  tab.value === activeTab && "bg-brand-blue-2"
                )}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        {/* {activeTab === "all" && <AllTabs />} */}
        {activeTab === "appointments" && <AppointmentsTabs />}
        {activeTab === "calls" && <CallTabs />}
        {activeTab === "reviews" && <ReviewsTabs />}
      </div>
    </div>
  );
};

export default HomeFeedTabs;
