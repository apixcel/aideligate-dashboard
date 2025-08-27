"use client";

import { SectionSubTitle, SectionTitle } from "@/components";
import ProvidersTable from "@/components/provider/ProvidersTable";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col gap-6">
      <SectionTitle title={t("Provider.title")} description={t("Provider.description")} />
      <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6 transition-all duration-300">
        <SectionSubTitle title={t("Provider.all_providers")} description={t("Provider.manage_your_service")} />
        <ProvidersTable />
      </div>
    </div>
  );
};

export default Page;
