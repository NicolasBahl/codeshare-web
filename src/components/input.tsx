"use client";

import React from "react";

import cn from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ loading, error, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          className={cn(
            "border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500 ring-red-100" : undefined
          )}
          disabled={loading}
          {...props}
        />
        {error && <p className="ml-1 mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
