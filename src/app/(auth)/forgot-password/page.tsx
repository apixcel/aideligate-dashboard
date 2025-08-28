"use client";
import { forgotPasswordAction } from "@/actions/auth.action";
import RenderFormErrorMessage from "@/components/ui/RenderFormErrorMessage";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { LoaderCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as Yup from "yup";
const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("forgot_password.validation.email_invalid")
    .required("forgot_password.validation.email_required"),
});

const ForgotPasswordPage = () => {
  const handleSubmit = async (
    values: typeof initialValues,
    helper: FormikHelpers<typeof initialValues>
  ) => {
    helper.setSubmitting(true);
    const res = await forgotPasswordAction(values.email);
    helper.setSubmitting(false);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Password reset link sent to your email");
    helper.resetForm();
  };

  const { t } = useTranslation();

  return (
    <div>
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-3xl font-bold">{t("forgot_password.title")}</h2>
        <p className="text-sm text-light">{t("forgot_password.description")}</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4" noValidate>
            {/* email / username */}
            <div>
              <label htmlFor="email">{t("forgot_password.email")}</label>
              <Field
                id="email"
                name="email"
                type="text"
                placeholder={t("forgot_password.email_placeholder")}
                className="w-full"
                autoComplete="username"
              />
              <RenderFormErrorMessage name="email" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-[8px] bg-brand-blue-2 px-[14px] py-[6px] font-[500] text-white hover:bg-brand-blue-2/80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {t("forgot_password.submit")}{" "}
              {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : ""}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordPage;
