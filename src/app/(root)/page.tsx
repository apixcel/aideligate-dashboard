"use client";
import { HomeFeedTabs, HomeStatisticsCards, SectionTitle } from "@/components";
import CreateAppointment from "@/components/appointment/CreateAppointment";
import AddTimeBlockWindow from "@/components/settings/AddTimeBlockWindow";

import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionTitle
        title={t("dashboard_overview.title")}
        description={t("dashboard_overview.description")}
      />

      {/* statistics cards component */}
      <HomeStatisticsCards />

      {/* quick actions button */}
      <div className="flex flex-wrap gap-4">
        <CreateAppointment />
        <AddTimeBlockWindow label={"dashboard_overview.add_time_block"} />
      </div>

      {/* feed tabs component */}
      <HomeFeedTabs />
    </>
  );
};

export default Home;
