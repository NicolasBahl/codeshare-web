import React from "react";
import Input from "@/components/input";
import Button from "@/components/button";

const LoginForm = () => {

  return (
    <form className="mt-5 flex flex-col gap-3">
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <Button>Sign in</Button>
    </form>
  );
};

export default LoginForm;
