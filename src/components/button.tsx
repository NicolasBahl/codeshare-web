"use client";

import React from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, loading, ...props }, ref) => {
  return (
    <button
      className={clsx(
        "focus-visible:ring-ring inline-flex h-9 w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      ref={ref}
      disabled={loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {props.children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
