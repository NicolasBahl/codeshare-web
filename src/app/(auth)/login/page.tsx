import React from "react";

const Login = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div>
        <p className="text-center text-2xl font-bold">
          Sign in to your account
        </p>
        <p className="text-md text-center text-gray-400">
          This page is work in progress
        </p>
      </div>
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
