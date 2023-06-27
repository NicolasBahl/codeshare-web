"use client";

import React from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import { motion } from "framer-motion";

interface InitialState {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const RegisterForm = () => {
  const LAST_STEP = 2;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [step, setStep] = React.useState<number>(0);
  const [state, setState] = React.useState<InitialState>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  // TODO: Add handleSubmit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    if (step !== LAST_STEP) {
      setStep((prev) => prev + 1);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit}>
      <RenderStep
        step={step}
        state={state}
        setState={setState}
        loading={loading}
      />
      <Button loading={loading}>
        {step === LAST_STEP ? "Sign up" : "Continue"}
      </Button>
    </form>
  );
};

const RenderStep = ({
  step,
  state,
  setState,
  loading,
}: {
  step: number;
  state: InitialState;
  setState: React.Dispatch<React.SetStateAction<InitialState>>;
  loading: boolean;
}) => {
  switch (step) {
    case 0:
      return <InitialStep state={state} setState={setState} />;
    case 1:
      return <FirstStep state={state} setState={setState} />;
    case 2:
      return <LastStep state={state} setState={setState} loading={loading} />;
    default:
      return null;
  }
};

const InitialStep = ({
  state,
  setState,
}: {
  state: InitialState;
  setState: React.Dispatch<React.SetStateAction<InitialState>>;
}) => {
  return <Input placeholder="Email" />;
};

const FirstStep = ({
  state,
  setState,
}: {
  state: InitialState;
  setState: React.Dispatch<React.SetStateAction<InitialState>>;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-3">
        <Input placeholder="First name" />
        <Input placeholder="Last name" />
        <Input placeholder="Nickname" />
      </div>
    </motion.div>
  );
};

const LastStep = ({
  state,
  setState,
  loading,
}: {
  state: InitialState;
  loading: boolean;
  setState: React.Dispatch<React.SetStateAction<InitialState>>;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-3">
        <Input placeholder="Password" loading={loading} />
        <Input placeholder="Confirm password" loading={loading} />
      </div>
    </motion.div>
  );
};

export default RegisterForm;
