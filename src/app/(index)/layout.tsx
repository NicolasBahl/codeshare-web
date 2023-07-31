import React from "react";
import Navbar from "@/components/NavigationBar/navBar";
import Menu from "@/components/menu";
import Top from "@/components/top";
import ApiService from "@/utils/ApiService";

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
            <Top topUsers={topUsers} />
          </div>
        </div>
      </div>
    </section>
  );
}
