"use client";

import Image from "next/image";
import React from "react";
import Logo from "../../../public/codeshare.png";
import randomUser from "../../../public/random_user.png";
import SearchBar from "./searchBar";
import { LuBell } from "react-icons/lu";
import { GrClose, GrMenu } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { MenuOverlay } from "../menu";

const Navbar = () => {
  const [isOverlayMenuOpen, setIsOverlayMenuOpen] =
    React.useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      <div className="z-50 flex h-24 w-full items-center bg-white px-10 shadow-lg">
        <div className="container mx-auto flex items-center justify-between lg:max-w-screen-xl">
          <>
            {isOverlayMenuOpen ? (
              <GrClose
                className="mr-4 h-8 w-8 lg:hidden"
                onClick={() => setIsOverlayMenuOpen(!isOverlayMenuOpen)}
              />
            ) : (
              <GrMenu
                className="mr-4 h-8 w-8 lg:hidden"
                onClick={() => setIsOverlayMenuOpen(!isOverlayMenuOpen)}
              />
            )}
          </>
          <>
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
          </>
          <SearchBar
            searchBarStyle="hidden lg:block w-1/4 xl:w-1/2"
            onChange={(e) => {}}
          />

          <div className="flex items-center gap-5">
            <LuBell className="cursor-pointer text-gray-600" size={20} />
            <div>
              <Image
                src={randomUser}
                alt="Profil"
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
      <MenuOverlay isOpen={isOverlayMenuOpen} />
    </>
  );
};

export default Navbar;
