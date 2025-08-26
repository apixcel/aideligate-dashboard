"use client";

import { updatePassword } from "@/actions/auth.action";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import * as Yup from "yup";
const passwordSchema = Yup.object({
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

  return (
    <div>
      {!code || err_msg || error ? (
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold">Someting Went Wrong</h2>
          <p className="text-sm text-red">
            {err_msg || error || "Unexpected Error please try again"}
          </p>
          <Link href="/forgot-password" className="text-sm text-light hover:underline">
            Try Again
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-sm">
          <h1 className="mb-4 text-xl font-semibold">Set a new password</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={passwordSchema}
            onSubmit={handleSubmit}
          >
            {({ status, isValid, dirty, isSubmitting }) => (
              <Form className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm">New password</label>
                  <Field
                    name="password"
                    type="password"
                    className="w-full rounded-xl border p-2"
                    placeholder="********"
                  />
                  <div className="mt-1 text-xs text-red">
                    <ErrorMessage name="password" />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm">Confirm password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="w-full rounded-xl border p-2"
                    placeholder="********"
                  />
                  <div className="mt-1 text-xs text-red">
                    <ErrorMessage name="confirmPassword" />
                  </div>
                </div>

                {status && <p className="text-sm text-green-700">{status}</p>}
                {error && <p className="text-sm text-red">{error}</p>}

                <button
                  type="submit"
                  className="w-full rounded-xl border px-4 py-2"
                  disabled={isSubmitting || !dirty || !isValid}
                >
                  {isSubmitting ? "Updating…" : "Update password"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-3 text-center text-sm">
            <Link href="/signin" className="hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
