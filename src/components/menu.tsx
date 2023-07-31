import React from "react";
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineQuestion,
  AiOutlineMessage,
} from "react-icons/ai";
import Link from "next/link";
import "@/styles/post.css";
import SearchBar from "./NavigationBar/searchBar";
import cn from "@/utils/cn";

const menuItems = [
  {
    icon: <AiOutlineHome style={{ fontSize: "25px" }} />,
    label: "Home",
    link: "/",
  },
  {
    icon: <AiOutlineCompass style={{ fontSize: "25px" }} />,
    label: "Explore Topics",
    link: "/",
  },
  {
    icon: <AiOutlineQuestion style={{ fontSize: "25px" }} />,
    label: "My Topics",
    link: "/",
  },
  {
    icon: <AiOutlineMessage style={{ fontSize: "25px" }} />,
    label: "My Answers",
    link: "/",
  },
];

export default function Menu() {
  return (
    <div className="flex flex-col items-start text-gray-500">
      <div className="flex w-52 flex-col">
        <h1 className="ml-8 p-4 font-medium">MENU</h1>
        {menuItems.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className="my-2 hover:bg-blue-100 hover:text-primary"
          >
            <div className="relative ml-5 flex items-center hover:before:absolute hover:before:-left-5 hover:before:h-full hover:before:w-3 hover:before:bg-primary hover:before:content-[''] focus:bg-primary">
              {item.icon}
              <p className="mx-4 my-2">{item.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MenuOverlay({ isOpen }: MenuOverlayProps) {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 z-20 flex h-screen w-full bg-white pt-28 duration-500 lg:hidden",
        isOpen ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="flex w-80 flex-col">
        {menuItems.map((item, index) => (
          <Link href={item.link} key={index}>
            <div className="relative flex items-center p-5">
              <p className="mx-4 my-2 text-3xl transition-colors duration-300 hover:text-neutral-500">
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

interface MenuOverlayProps {
  isOpen: boolean;
}
