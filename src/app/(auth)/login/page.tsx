"use client";

import { signInAction } from "@/actions/auth.action";
import RenderFormErrorMessage from "@/components/ui/RenderFormErrorMessage";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as Yup from "yup";

// Yup schema: email OR username, plus password
const LoginSchema = Yup.object({
  identifier: Yup.string()
    .required("login.validation.email_required")
    .email("login.validation.email_invalid"),
  password: Yup.string().required("login.validation.password_required"),
});

const initialValues = {
  identifier: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { t } = useTranslation();

  const handleSubmit = async (
    values: typeof initialValues,
    helper: FormikHelpers<typeof initialValues>
  ) => {
    try {
      helper.setSubmitting(true);
      const res = await signInAction({ email: values.identifier, password: values.password });

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      router.replace("/");
      toast.success("Login successful");
    } finally {
      helper.setSubmitting(false);
    }
  };

  return (
    <>
      {/* header */}
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-3xl font-bold">{t("login.title")}</h2>
        <p className="text-sm text-light">{t("login.description")}</p>
      </div>

      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4" noValidate>
            {/* email / username */}
            <div>
              <label htmlFor="identifier">{t("login.email")}</label>
              <Field
                id="identifier"
                name="identifier"
                type="text"
                placeholder={t("login.email_placeholder")}
                className="w-full"
                autoComplete="username"
              />
              <RenderFormErrorMessage name="identifier" />
            </div>

            {/* password */}
            <div>
              <label htmlFor="password">{t("login.password")}</label>
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full"
                  autoComplete="current-password"
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

            {/* submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-[8px] bg-brand-blue-2 px-[14px] py-[6px] font-[500] text-white hover:bg-brand-blue-2/80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="flex flex-col items-center justify-center gap-2">
        <Link className="text-sm hover:underline" href="/forgot-password">
          {t("login.forgot_password")}?
        </Link>
        <p className="text-sm text-light">
          {t("login.dont_have_an_account")}?{" "}
          <Link className="text-sm text-lightest hover:underline" href="/register">
            {t("login.register")}
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
