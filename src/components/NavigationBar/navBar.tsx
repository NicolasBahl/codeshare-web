import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../public/codeshare.png";
import randomUser from "../../../public/random_user.png";
import SearchBar from "./searchBar";
import { FaBell } from "react-icons/fa";

const routes = [
  {
    path: "/profile",
    img: "../../../public/random_user.png",
  },
];

interface NavbarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Navbar = (props: NavbarProps) => {
  const { onChange } = props;
  return (
    <div className="flex justify-between items-center px-4 2x1:px-46 fixed w-full h-24 shadow-lg bg-transparent">
      <div className="flex-1 ml-10">
        <Image
          src={Logo}
          alt="Logo"
          width={150}
          height={50}
          className="cursor-pointer"
          priority
        />
      </div>
      <SearchBar searchBarStyle="hidden sm:flex" onChange={onChange} />
      <div className="flex">
        <FaBell className=".cursor-pointer" size={30} />
        {routes.map((route, index) => (
          <Link className="mx-4" href={route.path} key={index}>
            {route.img && (
              <Image
                src={randomUser}
                alt="Profil"
                className="rounded-full h-8 w-8"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
