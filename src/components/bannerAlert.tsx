"use client";

import React from "react";
import cn from "@/utils/cn";

const BannerAlert: React.FC<BannerAlertProps> = ({
  message,
  type = "error",
  title = getDefaultTitle(type),
}) => {
  return (
    <div
      className={cn(
        "relative flex rounded-md border p-4",
        type === "error" && "border-red-500 text-red-500",
        type === "info" && "border-blue-500 text-blue-500",
        type === "success" && "border-green-500 text-green-500",
        type === "warning" && "border-yellow-500 text-yellow-500"
      )}
    >
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm font-light">{message}</p>
      </div>
    </div>
  );
};

const getDefaultTitle = (type: BannerAlertType) => {
  switch (type) {
    case "error":
      return "Error";
    case "info":
      return "Info";
    case "success":
      return "Success";
    case "warning":
      return "Warning";
  }
};

interface BannerAlertProps {
  title?: string;
  message: string;
  type?: BannerAlertType;
}

type BannerAlertType = "error" | "success" | "warning" | "info";

export default BannerAlert;
