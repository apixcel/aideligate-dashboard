import { HomeFeedTabs, HomeStatisticsCards, SectionTitle } from "@/components";
import { Clock, Plus } from "lucide-react";
const Home = () => {
  return (
    <>
      <SectionTitle
        title="Dashboard Overview"
        description="Welcome back! Here's what's happening with your business today."
      />

      {/* statistics cards component */}
      <HomeStatisticsCards />

      {/* quick actions button */}
      <div className="flex gap-4">
        <button className="flex items-center justify-center gap-2 rounded-[8px] bg-brand-blue-2 px-[14px] py-[6px] font-[500] text-white hover:bg-brand-blue-2/90">
          <Plus className="h-4 w-4" />
          New Appointment
        </button>
        <button className="flex items-center justify-center gap-2 rounded-[8px] bg-white-secondary px-[14px] py-[6px] font-[500] text-black-secondary hover:bg-white-secondary/90">
          <Clock className="h-4 w-4" />
          Block Time
        </button>
      </div>

      {/* feed tabs component */}
      <HomeFeedTabs />
    </>
  );
};

export default Home;
