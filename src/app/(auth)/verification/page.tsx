"use client";

import { verifyEmail } from "@/actions/auth.action";
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [error, setError] = useState("");

  const router = useRouter();

  const { t } = useTranslation();

  const handleVerify = async () => {
    if (!code) return setError(t("verify_account.code_not_found"));
    const res = await verifyEmail(code);
    if (res?.error) return setError(res.error);

    setError("");
    router.replace("/login");
  };

  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <div className="flex w-full items-center justify-center">
      {error ? (
        <span className="capitalize">{error}</span>
      ) : (
        <span className="flex items-center justify-center gap-[8px]">
          {t("verify_account.loading_txt")} <LoaderCircle className="animate-spin" />
        </span>
      )}
    </div>
  );
};

export default Page;
