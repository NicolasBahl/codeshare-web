import React from "react";
import Navbar from "@/components/NavigationBar/navBar";
import Menu from "@/components/menu";
import Top from "@/components/top";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 pt-8 lg:max-w-screen-xl">
        <div className="flex">
          <Menu />
          <div className="flex-grow">{children}</div>
        </div>
      </div>
    </section>
  );
}
