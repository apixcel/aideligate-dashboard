import { CallsTable, SectionTitle } from "@/components";

const CallsPage = () => {
  return (
    <>
      <SectionTitle
        title="Calls"
        description="Manage and track all your business calls. New calls will appear automatically."
      />

      <CallsTable />
    </>
  );
};

export default CallsPage;
