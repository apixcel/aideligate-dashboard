import { HomeFeedTabs, HomeStatisticsCards, SectionTitle } from "@/components";
import CreateAppointment from "@/components/appointment/CreateAppointment";
import AddTimeBlockWindow from "@/components/settings/AddTimeBlockWindow";
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
        <CreateAppointment />
        <AddTimeBlockWindow label="Add Time Block" />
      </div>

      {/* feed tabs component */}
      <HomeFeedTabs />
    </>
  );
};

export default Home;
