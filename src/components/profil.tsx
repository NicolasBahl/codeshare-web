import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const dropdownItems = [
    { label: "My profile", href: "/" },
    { label: "Achievements", href: "/" },
    { label: "Inbox", href: "/" },
  ];

  return (
    <div className="relative">
      <button
        className="flex items-center focus:outline-none"
        onClick={toggleDropdown}
      >
        <Image
          src="/random_user.png"
          alt="Profil"
          width={30}
          height={30}
          className="h-8 w-8 rounded-full cursor-pointer"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-4 py-2 w-48 bg-neutral-50 rounded-md shadow-lg transform translate-x-1/2">
          {dropdownItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <p
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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