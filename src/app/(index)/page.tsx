import { redirect } from "next/navigation";

export default function Home() {
  //TODO: Remove redirect and integrate index page
  redirect("/me");

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

      </main>
    </>
  );
}
