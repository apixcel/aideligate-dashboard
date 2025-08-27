"use client";
import { CallsTable, SectionTitle } from "@/components";
import { useTranslation } from "react-i18next";

const CallsPage = () => {
  const {t} = useTranslation();
  return (
    <>
      <SectionTitle
        title={t("calls.title")}
        description={t("calls.description")}
      />

      <CallsTable />
    </>
  );
};

export default CallsPage;
