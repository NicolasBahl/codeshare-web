import React from "react";
import Navbar from "@/components/NavigationBar/navBar";
import Menu from "@/components/menu";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <div className="container mx-auto px-0 lg:px-10 lg:pt-8 lg:max-w-screen-xxl">
        <div className="flex">
          <div className="hidden lg:block px-5">
            <Menu />
          </div>
          <div className="flex-grow">{children}</div>
        </div>
      </div>
    </section>
  );
}
