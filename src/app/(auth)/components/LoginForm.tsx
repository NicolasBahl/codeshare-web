"use client";

import React from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthProvider";
import { LoginState } from "@/types/auth";
import BannerAlert from "@/components/bannerAlert";

const LoginForm = () => {
  const { login, error, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginState>({
    mode: "onSubmit",
  });

  return (
    <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit(login)}>
      {error && <BannerAlert message={error} />}
      <Input
        placeholder="Email"
        {...register("email", {
          required: true,
          validate: {
            email: (value) => value.includes("@"),
          },
        })}
        loading={loading}
      />
      <Input
        placeholder="Password"
        type="password"
        {...register("password", { required: true })}
        loading={loading}
      />
      <Button disabled={!isValid} loading={loading}>
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
