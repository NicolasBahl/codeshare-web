"use client";

import React from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthProvider";
import { LoginState } from "@/types/auth";
import BannerAlert from "@/components/bannerAlert";

const LoginForm = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginState>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<LoginState> = async (formData) => {
    await login(formData);
  };

  return (
    <form
      className="mt-5 flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <BannerAlert message={"This is a test"} />
      <Input
        placeholder="Email"
        {...register("email", {
          required: true,
          validate: {
            email: (value) => value.includes("@"),
          },
        })}
      />
      <Input
        placeholder="Password"
        type="password"
        {...register("password", { required: true })}
      />
      <Button disabled={!isValid}>Sign in</Button>
    </form>
  );
};

export default LoginForm;
