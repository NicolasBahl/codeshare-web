"use client";

import React from "react";
import clsx from "clsx";
interface InputProps {
  placeholder: string;
  style?: React.CSSProperties;
  className?: React.HTMLAttributes<HTMLInputElement>["className"];
  loading?: boolean;
}
const Input: React.FC<InputProps> = ({
  placeholder,
  style,
  className,
  loading,
}) => {
  return (
    <input
      className={clsx(
        "border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      disabled={loading}
      style={style}
      placeholder={placeholder}
    />
  );
};

export default Input;
