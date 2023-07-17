import UserData from "@/app/(index)/me/userData";
import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserData />
    </main>
  );
}
