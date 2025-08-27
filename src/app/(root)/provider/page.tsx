import { SectionSubTitle, SectionTitle } from "@/components";
import ProvidersTable from "@/components/provider/ProvidersTable";

const page = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <SectionTitle title="Provider" description="Manage your providers" />
      <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6 transition-all duration-300">
        <SectionSubTitle title="All Providers" description="Manage your service providers" />
        <ProvidersTable />
      </div>
    </div>
  );
};

export default page;
