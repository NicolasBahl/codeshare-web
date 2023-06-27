"use client";

import React from "react";
import clsx from "clsx";

interface InputProps {
  placeholder: string;
  style?: React.CSSProperties;
  className?: React.HTMLAttributes<HTMLInputElement>["className"];
  loading?: boolean;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, style, className, loading, error, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          className={clsx(
            "border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            error ? "border-red-500 ring-red-100" : undefined
          )}
          disabled={loading}
          style={style}
          placeholder={placeholder}
          {...props}
        />
        {error && <p className="ml-1 mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
