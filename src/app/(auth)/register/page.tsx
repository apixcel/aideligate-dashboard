"use client";

import { signUpAction } from "@/actions/auth.action";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Eye, EyeOff, MailCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

// Yup schema
const RegisterSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .matches(/[a-z]/, "Include a lowercase letter")
    .matches(/[A-Z]/, "Include an uppercase letter")
    .matches(/\d/, "Include a number")
    .matches(/[^A-Za-z0-9]/, "Include a symbol")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

const initialvalue = { email: "", password: "", confirmPassword: "" };

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
      role: "staff",
    });
    helper.setSubmitting(false);

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Registration successful");
    setSuccessEmail(values.email); // <- flip UI to success state
    helper.resetForm();
  };

  // If registration succeeded, show the verification notice instead of the form

  // Default: render the registration form
  return (
    <>
      {successEmail ? (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center justify-center rounded-full border p-4">
            <MailCheck className="h-10 w-10" aria-hidden />
          </div>
          <div className="max-w-md space-y-2">
            <h2 className="text-3xl font-bold">Check your email</h2>
            <p className="text-sm text-light">
              We’ve sent a verification link to <span className="font-medium">{successEmail}</span>.
              Please open it to verify your account and complete your registration.
            </p>
            <p className="text-xs text-light">
              Didn’t get the email? Check your spam folder or try again in a minute.
            </p>
          </div>

          {/* Optional actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-[8px] bg-brand-blue-2 px-[14px] py-[6px] font-[500] text-white hover:bg-brand-blue-2/80"
            >
              Go to Login
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
            <h2 className="text-3xl font-bold">Register</h2>
            <p className="px-4 text-sm text-light">
              Create an account to access your business management platform
            </p>
          </div>

          {/* form */}
          <Formik
            initialValues={initialvalue}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                {/* email */}
                <div>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full"
                  />
                  <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-500" />
                </div>

                {/* password */}
                <div>
                  <label htmlFor="password">Password</label>
                  <div className="relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                {/* confirm password */}
                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="relative">
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
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
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                {/* submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-[8px] bg-brand-blue-2 px-[14px] py-[6px] font-[500] text-white hover:bg-brand-blue-2/80 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-sm text-light">
              Already have an account?{" "}
              <Link className="text-sm text-lightest hover:underline" href="/login">
                Login
              </Link>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
