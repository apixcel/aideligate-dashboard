"use client";
import { SectionSubTitle, SectionTitle } from "@/components";
import AppointmentTable from "@/components/appointment/AppointmentTable";
import CreateAppointment from "@/components/appointment/CreateAppointment";
import { useState } from "react";
const Page = () => {
  const [refetch, setRefetch] = useState(0);
  return (
    <div className="flex w-full flex-col gap-6">
      <SectionTitle
        title="Appointments"
        description="Manage and track all your appointments. New appointments will appear automatically."
      />
      <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6 transition-all duration-300">
        <div className="flex items-center justify-between gap-[10px]">
          <SectionSubTitle title="All Appointments" description="View filter/create appointments" />
          <div className="flex items-center justify-between">
            <CreateAppointment onSuccess={() => setRefetch(refetch + 1)}/>
          </div>
        </div>
        <AppointmentTable refetch={refetch} setRefetch={setRefetch} />
      </div>
    </div>
  );
};

export default Page;
