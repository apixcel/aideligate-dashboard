"use client";

import { DaySelectFilter, SectionSubTitle } from "@/components";
import { Clock, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const TimeBlockSteering = () => {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6">
      <div className="flex items-center justify-between">
        <SectionSubTitle
          icon={Clock}
          title="Time Block Steering"
          description="Steer bookings toward preferred windows."
        />

        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          data-state={isChecked ? "checked" : "unchecked"}
          value="on"
          data-slot="switch"
          className="peer focus-visible:border-ring inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-brand-blue-2/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand-blue-btn data-[state=unchecked]:bg-dark"
          onClick={() => setIsChecked(!isChecked)}
        >
          <span
            data-state={isChecked ? "checked" : "unchecked"}
            data-slot="switch-thumb"
            className="pointer-events-none block size-4 rounded-full bg-white-secondary ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          ></span>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="mb-0">Preferred Time Windows</label>
          <button className="flex items-center justify-center gap-2 rounded-[8px] border border-darker bg-white-secondary px-[14px] py-[6px] font-[500] text-black-secondary hover:bg-white-secondary/90">
            <Plus className="h-4 w-4" />
            Add Window
          </button>
        </div>

        {/* window card */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-lg border border-dark p-3">
            <DaySelectFilter />
            <span className="text-sm text-light">from</span>
            <span className="text-sm text-light">to</span>
            <button className="rounded px-2.5 py-2 text-red hover:bg-brand-blue-btn hover:text-white-secondary">
              <Trash2 className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeBlockSteering;
