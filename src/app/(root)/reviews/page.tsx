"use client";
import { SectionSubTitle, SectionTitle } from "@/components";
import Reviews from "@/components/review/Reviews";
import { useTranslation } from "react-i18next";


const Page = () => {
  const { t } = useTranslation();
  return (
    <div>
      <SectionTitle
        title={t("reviews.title")}
        description={t("reviews.description")}
      />

      <div className="mt-[20px] rounded-[10px] border-[1px] border-dark p-5">
        <SectionSubTitle
          title={t("reviews.customer_reviews")}
          description={t("reviews.view_and_respond")}
        />
        <Reviews />
      </div>
    </div>
  );
};

export default Page;
