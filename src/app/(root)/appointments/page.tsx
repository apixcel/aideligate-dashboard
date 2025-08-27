"use client";
import { SectionSubTitle, SectionTitle } from "@/components";
import AppointmentTable from "@/components/appointment/AppointmentTable";
import CreateAppointment from "@/components/appointment/CreateAppointment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const Page = () => {
  const [refetch, setRefetch] = useState(0);
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col gap-6">
      <SectionTitle
        title={t("dashboard_overview.title")}
        description= {t("dashboard_overview.description")}
      />
      <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6 transition-all duration-300">
        <div className="flex items-center justify-between gap-[10px]">
          <SectionSubTitle title={t("appointments.all_appointments")} description={t("appointments.view_filter_create")} />
          <div className="flex items-center justify-between">
            <CreateAppointment onSuccess={() => setRefetch(refetch + 1)} />
          </div>
        </div>
        {/* <p>{t("dashobarad")}</p> */}
        <AppointmentTable refetch={refetch} setRefetch={setRefetch} />
      </div>
    </div>
  );
};

export default Page;
