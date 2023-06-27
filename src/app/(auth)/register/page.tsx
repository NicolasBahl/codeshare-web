import React from "react";
import RegisterForm from "@/app/(auth)/register/components/RegisterForm";

const Register = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div>
        <p className="text-center text-2xl font-bold">Create an account</p>
        <p className="text-md text-gray-400">
          Enter your details below to create your account
        </p>
      </div>
      <RegisterForm />
      <div className="flex flex-col items-center">
        <p className="text-md text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-md text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
