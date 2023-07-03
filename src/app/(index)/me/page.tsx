import UserData from "@/app/(index)/me/userData";
import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  const session = React.use(getSession());

  if (!session.isAuth) {
    return redirect("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserData />
    </main>
  );
}

function getSession() {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/check", {
    headers: { Cookie: cookies().toString() },
  }).then((res) => res.json());
}
