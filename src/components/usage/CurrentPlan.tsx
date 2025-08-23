import { SectionSubTitle } from "@/components";
import { TrendingUp, Zap } from "lucide-react";

const CurrentPlan = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6">
      <div className="flex items-center justify-between">
        {/* section sub title */}
        <SectionSubTitle
          icon={Zap}
          title="Current Plan"
          description="Your subscription details and usage limits"
        />

        <span className="rounded-md bg-brand-blue-btn px-2 py-1 text-xs text-lighter">
          Professional Plan
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Call Usage</span>
            <span className="text-sm text-light">387 / 500</span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-brand-blue-2/20">
            <div className="animate-progress h-full w-1/2 bg-brand-blue-2"></div>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-light">77% used</span>
            <span className="text-xs text-light">113 remaining</span>
          </div>
        </div>

        {/* usage resets on */}
        <div className="flex items-center justify-between border-t border-darker py-2 text-light">
          <span className="text-sm">Usage resets on</span>
          <span className="text-sm font-medium">February 15, 2024</span>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium">Plan Features</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue-2"></div>
              <span className="text-light">500 calls per month</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue-2"></div>
              <span className="text-light">Unlimited appointments</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue-2"></div>
              <span className="text-light">Review management</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue-2"></div>
              <span className="text-light">SMS &amp; Email templates</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue-2"></div>
              <span className="text-light">Priority support</span>
            </div>
          </div>
        </div>

        {/* upgrade button */}
        <button className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-brand-blue-btn px-4 py-2 text-sm font-medium whitespace-nowrap text-lighter shadow-xs transition-all hover:bg-brand-blue-btn/90 has-[>svg]:px-3">
          <TrendingUp className="h-4 w-4" />
          Upgrade Plan
        </button>
      </div>
    </div>
  );
};

export default CurrentPlan;
