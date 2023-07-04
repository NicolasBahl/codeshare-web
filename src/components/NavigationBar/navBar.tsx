"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../public/codeshare.png";
import randomUser from "../../../public/random_user.png";
import SearchBar from "./searchBar";
import { FaBell } from "react-icons/fa";
import { useRouter } from "next/navigation";

const routes = [
  {
    path: "/profile",
    img: "../../../public/random_user.png",
  },
];

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="flex h-24 w-full items-center bg-white px-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between lg:max-w-screen-xl">
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
          searchBarStyle="hidden sm:flex mr-20 ml-10"
          onChange={(e) => {}}
        />

        <div className="flex">
          <FaBell className=".cursor-pointer" size={30} />
          {routes.map((route, index) => (
            <Link className="mx-4" href={route.path} key={index}>
              {route.img && (
                <Image
                  src={randomUser}
                  alt="Profil"
                  className="h-8 w-8 rounded-full"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
