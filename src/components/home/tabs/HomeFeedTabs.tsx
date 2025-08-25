"use client";

import { SectionSubTitle } from "@/components";
import { cn } from "@/utils";
import { Filter } from "lucide-react";
import { useState } from "react";
import AllTabs from "./AllTabs";
import AppointmentsTabs from "./AppointmentsTabs";
import CallTabs from "./CallTabs";
import ReviewsTabs from "./ReviewsTabs";

const tabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Calls",
    value: "calls",
  },
  {
    label: "Appointments",
    value: "appointments",
  },
  {
    label: "Reviews",
    value: "reviews",
  },
];

const HomeFeedTabs = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6 transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* section sub title */}
        <SectionSubTitle
          title="Live Activity Feed"
          description="Recent activity across your business"
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
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        {activeTab === "all" && <AllTabs />}
        {activeTab === "calls" && <CallTabs />}
        {activeTab === "appointments" && <AppointmentsTabs />}
        {activeTab === "reviews" && <ReviewsTabs />}
      </div>
    </div>
  );
};

export default HomeFeedTabs;
