"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../public/codeshare.png";
import randomUser from "../../../public/random_user.png";
import SearchBar from "./searchBar";
import { FaBell } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { GrClose, GrMenu } from "react-icons/gr"
import { useRouter } from "next/navigation";
import { MenuOverlay } from "../menu";
import { BookUp } from "lucide-react";
import Button from "../button";
import ProfileDropdown from "../profil";

const routes = [
  {
    path: "/profile",
    img: "../../../public/random_user.png",
  },
];

const Navbar = () => {

  const [isOverlayMenuOpen, setIsOverlayMenuOpen] = React.useState<boolean>(false);
  const router = useRouter();
  return (
    <>
    <div className="flex h-24 w-full items-center bg-white px-4 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between lg:max-w-screen-xl">
        <div>
      {isOverlayMenuOpen ? (
        <GrClose
          className="w-8 h-8 mr-4 lg:hidden"
          onClick={() => setIsOverlayMenuOpen(!isOverlayMenuOpen)}
        />
      ) : (
        <GrMenu  
          className="w-8 h-8 mr-4 lg:hidden"
          onClick={() => setIsOverlayMenuOpen(!isOverlayMenuOpen)}
        />
      )}
    </div>
        <div className="ml-10 flex-1 ">
          <Image
            src={Logo}
            alt="Logo"
            width={150}
            height={50}
            className="cursor-pointer"
            priority
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <SearchBar
          searchBarStyle="hidden lg:flex mr-20 ml-10"
          onChange={(e) => {}}
        />
        {/* <Button className="burger-button" onClick={() => setIsOverlayMenuOpen(!isOverlayMenuOpen)}>open</Button> */}


        <FaBell className=".cursor-pointer" size={30} />
        <div className="p-4">
          <ProfileDropdown />
        </div>


      </div>
   
    </div>
    <MenuOverlay isOpen={isOverlayMenuOpen}/> 
    </>
  );
};

export default Navbar;
