"use client";
import Navbar from "@/components/NavigationBar/navBar";
import Menu from "@/components/menu";
import Image from "next/image";
import { ChangeEvent } from "react";

export default function Home() {
  return (
    <div style={{ width: "100%" }}>
      <Navbar onChange={(e) => console.log(e.target.value)} />
      <div className="flex flex-row">
        <div className="h-screen w-1/4 md:block">
          <Menu />
        </div>
      </div>
    </div>
  );
}
