import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="text-center ">
        <p className="text-2xl font-bold">Sign in to your account</p>
        <p className="mt-1 text-sm text-gray-400">
          Enter your details below to access your account
        </p>
      </div>
      <LoginForm />
      <div className="flex flex-col items-center">
        <p className="text-md text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-md text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
