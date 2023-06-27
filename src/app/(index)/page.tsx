import { redirect } from "next/navigation";

export default function Home() {

  // Redirect to /login
  //TODO: Remove redirect and integrate index page
  redirect("/login");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
