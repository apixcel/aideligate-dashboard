"use client";

import { signUpAction } from "@/actions/auth.action";
import RenderFormErrorMessage from "@/components/ui/RenderFormErrorMessage";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Eye, EyeOff, LoaderCircle, MailCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as Yup from "yup";

// Yup schema
const RegisterSchema = Yup.object({
  email: Yup.string()
    .email("register.validation.email_invalid")
    .required("register.validation.email_required"),
  password: Yup.string()
    .min(8, "register.validation.password_min")
    .matches(/[a-z]/, "register.validation.password_lower")
    .matches(/[A-Z]/, "register.validation.password_upper")
    .matches(/\d/, "register.validation.password_digit")
    .matches(/[^A-Za-z0-9]/, "register.validation.password_special")
    .required("register.validation.password_required"),
  full_name: Yup.string().required("register.validation.full_name_required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "register.validation.confirm_password_must_match")
    .required("register.validation.confirm_password_required"),
});

const initialvalue = { email: "", password: "", confirmPassword: "", full_name: "" };

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // success state: when set to an email string, we render the success message
  const [successEmail, setSuccessEmail] = useState<string | null>(null);

  const handleSubmit = async (
    values: typeof initialvalue,
    helper: FormikHelpers<typeof initialvalue>
  ) => {
    helper.setSubmitting(true);
    const res = await signUpAction({
      email: values.email,
      password: values.password,
      full_name: values.full_name,
      role: "staff",
    });
    helper.setSubmitting(false);

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Registration successful");
    setSuccessEmail(values.email);
    helper.resetForm();
  };

  const { t } = useTranslation();

  return (
    <>
      {successEmail ? (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center justify-center rounded-full border p-4">
            <MailCheck className="h-10 w-10" aria-hidden />
          </div>
          <div className="max-w-md space-y-2">
            <h2 className="text-3xl font-bold">{t("register.confirmation.check_mail")}</h2>
            <p className="text-sm text-light">{t("register.confirmation.description")}</p>
            <p className="text-xs text-light">{t("register.confirmation.msg")}</p>
          </div>

          {/* Optional actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-[8px] bg-brand-blue-2 px-[14px] py-[6px] font-[500] text-white hover:bg-brand-blue-2/80"
            >
              {t("register.confirmation.go_to_login")}
            </Link>
            {/* TODO: Hook up a resend endpoint if you have one */}
            {/* <button
            onClick={handleResend}
            className="rounded-[8px] border px-[14px] py-[6px] text-sm hover:bg-muted"
          >
            Resend Email
          </button> */}
          </div>
        </div>
      ) : (
        <>
          {/* header */}
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-3xl font-bold">{t("register.title")}</h2>
            <p className="px-4 text-sm text-light">{t("register.description")}</p>
          </div>

          {/* form */}
          <Formik
            initialValues={initialvalue}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <div>
                  <label htmlFor="full_name">{t("register.full_name")}</label>
                  <Field
                    id="full_name"
                    name="full_name"
                    type="full_name"
                    placeholder={t("register.full_name_placeholder")}
                    className="w-full"
                  />
                  <RenderFormErrorMessage name="full_name" />
                </div>
                <div>
                  <label htmlFor="email">{t("register.email")}</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("register.email_placeholder")}
                    className="w-full"
                  />
                  <RenderFormErrorMessage name="email" />
                </div>

                {/* password */}
                <div>
                  <label htmlFor="password">{t("register.password")}</label>
                  <div className="relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("register.password_placeholder")}
                      className="w-full"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <RenderFormErrorMessage name="password" />
                </div>

                {/* confirm password */}
                <div>
                  <label htmlFor="confirmPassword">{t("register.confirm_password")}</label>
                  <div className="relative">
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("register.confirm_password_placeholder")}
                      className="w-full"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2"
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      aria-label={
                        showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <RenderFormErrorMessage name="confirmPassword" />
                </div>

                {/* submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-[8px] bg-brand-blue-2 px-[14px] py-[6px] font-[500] text-white hover:bg-brand-blue-2/80 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {t("register.title")}{" "}
                  {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : ""}
                </button>
              </Form>
            )}
          </Formik>

          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-sm text-light">
              {t("register.already_have_account")}?{" "}
              <Link className="text-sm text-lightest hover:underline" href="/login">
                {t("login.title")}
              </Link>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
