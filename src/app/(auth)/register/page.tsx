import React from "react";
import RegisterForm from "@/app/(auth)/components/RegisterForm";
import Link from "next/link";

const Register = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="text-center ">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="mt-1 text-sm text-gray-400">
          Enter your details below to create your account
        </p>
      </div>
      <RegisterForm />
      <div className="flex flex-col items-center">
        <p className="text-md text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-md text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
