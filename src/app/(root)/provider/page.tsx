"use client";

import { SectionSubTitle, SectionTitle } from "@/components";
import ProvidersTable from "@/components/provider/ProvidersTable";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col gap-6">
      <SectionTitle title={t("provider.title")} description={t("provider.description")} />
      <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6 transition-all duration-300">
        <SectionSubTitle
          title={t("provider.all_providers")}
          description={t("provider.manage_your_service")}
        />
        <ProvidersTable />
      </div>
    </div>
  );
};

export default Page;
