import React from "react";
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineQuestion,
  AiOutlineMessage,
  AiOutlineClose,
} from "react-icons/ai";
import Link from "next/link";
import "@/styles/post.css";
import clsx from "clsx";
import SearchBar from "./NavigationBar/searchBar"

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
    <div className="flex">
      <div className="flex w-56 flex-col items-start text-gray-500">
        <div className="flex w-80 flex-col">
          <h1 className="ml-8 p-4 font-medium">MENU</h1>
          {menuItems.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="my-2 hover:bg-blue-100 hover:text-blue-800"
            >
              <div className="relative ml-5 flex items-center hover:before:absolute hover:before:-left-5 hover:before:h-full hover:before:w-3 hover:before:bg-blue-700 hover:before:content-[''] focus:bg-blue-200">
                {item.icon}
                <p className="mx-4 my-2">{item.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MenuOverlay({isOpen} : MenuOverlayProps) {


  return (
    
    <div className={clsx("flex w-full h-screen absolute bg-white z-20 duration-500 top-0 left-0 pt-28 lg:hidden", isOpen ? 'translate-y-0' : '-translate-y-full')}>
    <div className="flex w-80 flex-col">
      <div className="mx-4 my-2">
      <SearchBar /> 
      </div>
      {menuItems.map((item, index) => (
        <Link
          href={item.link}
          key={index}
         
        >
          <div className="relative p-5 flex items-center">
            <p className="mx-4 my-2 text-3xl hover:text-neutral-500 transition-colors duration-300">{item.label}</p>
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

