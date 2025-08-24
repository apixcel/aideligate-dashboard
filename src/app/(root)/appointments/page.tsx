import { SectionSubTitle, SectionTitle } from "@/components";

const page = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <SectionTitle
        title="Appointments"
        description="Manage and track all your appointments. New appointments will appear automatically."
      />
      <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6 transition-all duration-300">
        <SectionSubTitle title="All Appointments" description="View filter/create appointments" />
        <div className="flex items-center justify-between">

        </div>
      </div>
    </div>
  );
};

export default page;
