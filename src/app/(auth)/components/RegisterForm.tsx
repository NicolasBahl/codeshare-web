"use client";

import React from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  useForm,
  SubmitHandler,
  FieldErrors,
  UseFormGetValues,
} from "react-hook-form";
import ApiService from "@/utils/ApiService";
import BannerAlert from "@/components/bannerAlert";
import { useAuth } from "@/contexts/AuthProvider";

const RegisterForm = () => {
  const FINAL_STEP = 2;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [step, setStep] = React.useState<number>(0);
  const [error, setError] = React.useState<string | null>(null);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<InitialState>({
    mode: "onSubmit",
  });
  const onSubmit: SubmitHandler<InitialState> = async (formData) => {
    if (step !== FINAL_STEP) {
      setStep((prev) => prev + 1);
      return;
    }
    setLoading(true);
    try {
      const res = await ApiService.register(
        formData.email,
        formData.password,
        formData.username
      );
      if (res && res.status === 200) {
        await login({ email: formData.email, password: formData.password });
      } else {
        setError(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  const stepValidation: { [key: number]: () => boolean } = {
    0: () => !errors.email,
    1: () => !errors.firstName || !errors.lastName || !errors.username,
    2: () => !errors.password || !errors.confirmPassword,
  };

  const validateStep: () => boolean = stepValidation[step] || (() => true);

  return (
    <form
      className="mt-5 flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && <BannerAlert message={error} />}
      <RenderStep
        step={step}
        loading={loading}
        register={register}
        errors={errors}
        getValues={getValues}
      />
      <Button type="submit" loading={loading} disabled={!validateStep()}>
        {step === FINAL_STEP ? "Sign up" : "Continue"}
      </Button>
    </form>
  );
};

const RenderStep = (props: StepProps) => {
  switch (props.step) {
    case 0:
      return <InitialStep {...props} />;
    case 1:
      return <FirstStep {...props} />;
    case 2:
      return <LastStep {...props} />;
    default:
      return null;
  }
};

const InitialStep = ({ register, errors }: StepProps) => {
  return (
    <Input
      placeholder="Email"
      {...register("email", {
        required: true,
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Email is invalid",
        },
      })}
      error={errors.email?.message}
    />
  );
};

const FirstStep = ({ register }: StepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-3">
        <Input
          placeholder="First name"
          {...register("firstName", {
            required: true,
          })}
        />
        <Input
          placeholder="Last name"
          {...register("lastName", {
            required: true,
          })}
        />
        <Input
          placeholder="Username"
          {...register("username", {
            required: true,
          })}
        />
      </div>
    </motion.div>
  );
};

const LastStep = ({ loading, register, errors, getValues }: StepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Password"
          loading={loading}
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          type="password"
          error={errors.password?.message}
        />
        <Input
          placeholder="Confirm password"
          loading={loading}
          type="password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: (value: any) => {
              return (
                value === getValues("password") || "Password does not match"
              );
            },
          })}
          error={errors.confirmPassword?.message}
        />
      </div>
    </motion.div>
  );
};

interface InitialState {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface StepProps {
  step: number;
  loading: boolean;
  register: any;
  errors: FieldErrors<InitialState>;
  getValues: UseFormGetValues<InitialState>;
}

export default RegisterForm;
