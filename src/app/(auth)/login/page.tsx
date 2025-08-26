"use client";

import { signInAction } from "@/actions/auth.action";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

// Yup schema: email OR username, plus password
const LoginSchema = Yup.object({
  identifier: Yup.string()
    .required("Email or username is required")
    .test("email-or-username", "Enter a valid email or username", (value) => {
      if (!value) return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/; // simple username rule (3+ chars)
      return emailRegex.test(value) || usernameRegex.test(value);
    }),
  password: Yup.string().min(8, "At least 8 characters").required("Password is required"),
});

const initialValues = {
  identifier: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
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
        <h2 className="text-3xl font-bold">Login</h2>
        <p className="text-sm text-light">Sign in to access your business management platform</p>
      </div>

      {/* form */}
      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col gap-4" noValidate>
            {/* email / username */}
            <div>
              <label htmlFor="identifier">Email / Username</label>
              <Field
                id="identifier"
                name="identifier"
                type="text"
                placeholder="Enter your email or username"
                className="w-full"
                autoComplete="username"
              />
              <ErrorMessage name="identifier" component="p" className="mt-1 text-sm text-red-500" />
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
              <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-500" />
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
          Forgot Password?
        </Link>
        <p className="text-sm text-light">
          Don&apos;t have an account?{" "}
          <Link className="text-sm text-lightest hover:underline" href="/register">
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
