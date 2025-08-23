"use client";

import { LanguageFilter, SectionSubTitle, SectionTitle, TimeBlockSteering } from "@/components";
import { Globe, Pause, Save } from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [isPause, setIsPause] = useState(false);
  const [reasonForPause, setReasonForPause] = useState("");

  return (
    <>
      <div className="flex items-center justify-between">
        <SectionTitle
          title="Settings"
          description="Configure your business preferences and automation settings"
        />

        <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-brand-blue-btn px-4 py-2 text-sm font-medium whitespace-nowrap text-lighter shadow-xs transition-all hover:bg-brand-blue-btn/90 has-[>svg]:px-3">
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      {/* emergency pause warning */}
      {isPause && (
        <div className="flex flex-col gap-6 rounded-xl border border-warning/70 bg-warning-dark/50 p-6">
          <SectionSubTitle
            icon={Pause}
            title="Emergency Pause"
            titleClassName="text-warning/90"
            description={`— ${reasonForPause || "Emergency pause is active"}`}
            descriptionClassName="text-warning/90 ml-4"
          />
        </div>
      )}

      {/* time block steering */}
      <TimeBlockSteering />

      {/* emergency pause */}
      <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6">
        <div className="flex items-center justify-between">
          <SectionSubTitle
            icon={Pause}
            title="Emergency Pause"
            description="Temporarily pause all appointment scheduling"
          />

          <button
            type="button"
            role="switch"
            aria-checked={isPause}
            data-state={isPause ? "checked" : "unchecked"}
            value="on"
            data-slot="switch"
            className="peer focus-visible:border-ring inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-brand-blue-2/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand-blue-btn data-[state=unchecked]:bg-dark"
            onClick={() => setIsPause(!isPause)}
          >
            <span
              data-state={isPause ? "checked" : "unchecked"}
              data-slot="switch-thumb"
              className="pointer-events-none block size-4 rounded-full bg-white-secondary ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
            ></span>
          </button>
        </div>

        {isPause && (
          <div>
            <label className="text-sm" htmlFor="reason-for-pause">
              Reason for pause (shown to patients)
            </label>
            <textarea
              value={reasonForPause}
              onChange={(e) => setReasonForPause(e.target.value)}
              id="reason-for-pause"
              name="reason-for-pause"
              className="w-full rounded-md border border-darker bg-darkest p-2.5 text-sm text-light outline-0 placeholder:text-lighter focus:border-neutral"
              placeholder="e.g. Emergency maintenance, Staff unavailable, etc."
              rows={4}
            ></textarea>
          </div>
        )}
      </div>

      {/* language preference */}
      <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6">
        <SectionSubTitle
          icon={Globe}
          title="Language Preference"
          description="All interface text supports EN/VI via JSON resources."
        />

        <div className="flex items-center gap-4">
          <label className="mb-0 text-sm">Interface Language</label>
          <LanguageFilter variant="settings" />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
