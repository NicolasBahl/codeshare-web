"use client";

import Image from "next/image";
import React from "react";
import Logo from "../../../public/codeshare.png";
import SearchBar from "./searchBar";
import { GrClose, GrMenu } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { MenuOverlay } from "../menu";
import ProfileDropdown from "../profil";
import Notification from "../Icons/Notification";
import { useAuth } from "@/contexts/AuthProvider";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [isOverlayMenuOpen, setIsOverlayMenuOpen] =
    React.useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      <div className="relative z-50 flex h-24 w-full items-center bg-white px-10 shadow-lg">
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

          <div className="flex items-center gap-5 w-12">
            {isAuthenticated && <Notification />}
            <ProfileDropdown />
          </div>
        </div>
      </div>
      <MenuOverlay isOpen={isOverlayMenuOpen} />
    </>
  );
};

export default Navbar;
