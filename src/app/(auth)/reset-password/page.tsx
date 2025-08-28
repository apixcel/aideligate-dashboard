"use client";

import { updatePassword } from "@/actions/auth.action";
import RenderFormErrorMessage from "@/components/ui/RenderFormErrorMessage";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import * as Yup from "yup";
const passwordSchema = Yup.object({
  password: Yup.string()
    .min(8, "reset_password.validation.password_min")
    .matches(/[a-z]/, "reset_password.validation.password_lower")
    .matches(/[A-Z]/, "reset_password.validation.password_upper")
    .matches(/\d/, "reset_password.validation.password_digit")
    .matches(/[^A-Za-z0-9]/, "register.validation.password_special")
    .required("reset_password.validation.password_required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "reset_password.validation.confirm_password_must_match")
    .required("reset_password.validation.confirm_password_required"),
});
const initialValues = { password: "", confirmPassword: "" };
const Page = () => {
  const [error, setError] = useState<string | null>(null);

  const searachParams = useSearchParams();
  const err_msg = searachParams.get("error_description");
  const code = searachParams.get("code");

  const router = useRouter();

  const handleSubmit = async (values: typeof initialValues) => {
    const res = await updatePassword(values.password, code || "");
    if (res.error) {
      setError(res.error);
      return;
    }
    setError(null);
    toast.success("Password reset successfully");
    router.push("/login");
  };

  const { t } = useTranslation();

  return (
    <div>
      {!code || err_msg || error ? (
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold">{t("reset_password.err_title")}</h2>
          <p className="text-sm text-red">
            {err_msg || error || t("reset_password.err_description")}
          </p>
          <Link href="/forgot-password" className="text-sm text-light hover:underline">
            {t("reset_password.try_again")}
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-sm">
          <h1 className="mb-4 text-xl font-semibold">{t("reset_password.title")}</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={passwordSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm">{t("reset_password.new_password")}</label>
                  <Field
                    name="password"
                    type="password"
                    className="w-full rounded-xl border p-2"
                    placeholder="********"
                  />
                  <div className="mt-1 text-xs text-red">
                    <RenderFormErrorMessage name="password" />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm">
                    {t("reset_password.confirm_password")}
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="w-full rounded-xl border p-2"
                    placeholder="********"
                  />
                  <div className="mt-1 text-xs text-red">
                    <RenderFormErrorMessage name="confirmPassword" />
                  </div>
                </div>

                {error && <p className="text-sm text-red">{error}</p>}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-brand-blue-2 px-4 py-2 text-white"
                  disabled={isSubmitting || !dirty || !isValid}
                >
                  {t("reset_password.update_password")}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-3 text-center text-sm">
            <Link href="/signin" className="hover:underline">
              {t("reset_password.back_to_signin")}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
