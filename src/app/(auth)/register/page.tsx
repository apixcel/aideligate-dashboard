"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      {/* header */}
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-3xl font-bold">Register</h2>
        <p className="px-4 text-sm text-light">
          Create an account to access your business management platform
        </p>
      </div>

      {/* form */}
      <form className="flex flex-col gap-4">
        {/* email / username */}
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Enter your email" className="w-full" />
        </div>

        {/* password */}
        <div>
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2"
              onClick={handleShowPassword}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* confirm password */}
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-[8px] bg-brand-blue-2 px-[14px] py-[6px] font-[500] text-white hover:bg-brand-blue-2/80"
        >
          Register
        </button>
      </form>

      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-sm text-light">
          Already have an account?{" "}
          <Link className="text-sm text-lightest hover:underline" href="/login">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
