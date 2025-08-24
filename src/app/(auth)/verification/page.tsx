"use client";

import { verifyEmail } from "@/actions/auth.action";
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleVerify = async () => {
    if (!code) return setError("Verification code not found");
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
          Verifying Account <LoaderCircle className="animate-spin" />
        </span>
      )}
    </div>
  );
};

export default Page;
