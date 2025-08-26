"use client";
import { forgotPasswordAction, updateEmail } from "@/actions/auth.action";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
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

  useEffect(() => {
    updateEmail("sakib@apixcel.com").then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-3xl font-bold">Forgot Password</h2>
        <p className="text-sm text-light">Recover your password</p>
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
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email or username"
                className="w-full"
                autoComplete="username"
              />
              <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-500" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-[8px] bg-brand-blue-2 px-[14px] py-[6px] font-[500] text-white hover:bg-brand-blue-2/80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordPage;
