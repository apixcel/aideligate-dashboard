import { CurrentPlan, SectionSubTitle, SectionTitle, UsageStatistics } from "@/components";

const UsagePage = () => {
  return (
    <>
      <SectionTitle
        title="Plan & Usage"
        description="Monitor your plan usage and billing information"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <CurrentPlan />
        <UsageStatistics />
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6">
        <div>
          {/* section sub title */}
          <SectionSubTitle
            title="Usage Insights"
            description="Recommendations to optimize your plan usage"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-darker bg-darkest p-4">
            <h4 className="mb-2 font-medium">Call Efficiency</h4>
            <p className="text-sm text-light">
              Your average call duration is 8:45, which is within the optimal range for customer
              satisfaction.
            </p>
          </div>
          <div className="rounded-lg border border-darker bg-darkest p-4">
            <h4 className="mb-2 font-medium">Peak Usage</h4>
            <p className="text-sm text-light">
              Mondays see the highest call volume. Consider scheduling more staff during peak times.
            </p>
          </div>
          <div className="rounded-lg border border-darker bg-darkest p-4">
            <h4 className="mb-2 font-medium">Plan Optimization</h4>
            <p className="text-sm text-light">Your usage is on track for this billing cycle.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsagePage;
