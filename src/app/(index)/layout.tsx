import React from "react";
import Navbar from "@/components/NavigationBar/navBar";
import Menu from "@/components/menu";
import TopUser from "@/components/topUser";
import ApiService from "@/utils/ApiService";
import Link from "next/link";

const fetchTopUsers = async () => {
  const res = await ApiService.getTopUsers();
  if (res.status !== 200) return;

  return res.data;
};

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const topUsers = await fetchTopUsers();
  return (
    <section>
      <Navbar />
      <div className="lg:max-w-screen-xxl container mx-auto px-0 lg:px-10 lg:pt-8">
        <div className="flex">
          <div className="hidden px-5 lg:block">
            <Menu />
          </div>
          <div className="flex-grow">{children}</div>
          <div className="hidden px-5 lg:block">
            <Link
              href="/questions/new"
              className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90"
            >
              Start a New Topic
            </Link>
            <div className="py-4" />
            <TopUser topUsers={topUsers} />
          </div>
        </div>
      </div>
    </section>
  );
}
