import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthProvider";
import cn from "@/utils/cn";
import LetterPicture from "@/components/LetterPicture";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isAuthenticated, user } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  interface DropdownItem {
    label: string;
    href?: string;
    onClick?: () => void;
    destructive?: boolean;
  }

  const dropdownItems: DropdownItem[] = isAuthenticated
    ? [
        { label: "Profile", href: `profile/${user?.username}` },
        { label: "Logout", onClick: logout, destructive: true },
      ]
    : [
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
      ];

  return (
    <div className="relative">
      <button
        className="flex items-center focus:outline-none"
        onClick={toggleDropdown}
      >
        {isAuthenticated ? (
          <LetterPicture username={user?.username || ""} />
        ) : (
          <Image
            src="/random_user.png"
            alt="Profil"
            width={30}
            height={30}
            className="h-8 w-8 cursor-pointer rounded-full"
          />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-4 w-48 translate-x-1/2 transform rounded-md bg-neutral-50 py-2 shadow-lg">
          {dropdownItems.map((item, index) => (
            <Link key={index} href={item.href || "#"} onClick={item.onClick}>
              <p
                className={cn(
                  "px-4 py-2 text-sm  hover:bg-gray-100",
                  item.destructive ? "text-red-500" : "text-gray-700"
                )}
                onClick={handleLinkClick}
              >
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
