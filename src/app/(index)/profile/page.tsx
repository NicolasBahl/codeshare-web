"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { BsCamera } from "react-icons/bs";
import Skeleton from "@/components/ui/skeleton";
import { FcCloseUpMode } from "react-icons/fc";

const ProfilePage = () => {
  const { user } = useAuth();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isHovered, setIsHovered] = useState(false);



  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleUploadPhoto = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="w-full rounded-lg bg-white pb-8 shadow-md">
        <div className="relative rounded-lg">
          <div className="h-52 w-full bg-gradient-to-b from-violet-500 to-cyan-600 lg:rounded-t-lg"></div>
          <div
            className="absolute -bottom-24 left-20 flex h-44 w-44 items-center justify-center rounded-full border-8 border-white bg-gray-300"
            style={{
              backgroundImage: profilePhoto ? `url(${profilePhoto})` : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <label
              htmlFor="photoInput"
              className="flex h-24 w-24 items-center justify-center text-white"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {isHovered && <BsCamera className="h-12 w-12" />}
            </label>
            <input
              id="photoInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadPhoto}
            />
            <div className="absolute -right-1 bottom-2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-white">
              <FcCloseUpMode className="h-9 w-9" />
            </div>
          </div>
        </div>
        <div>
          <div className="mt-28 px-24 text-2xl">{user?.username}</div>
          <div className="mt-4 px-24 text-gray-500">
            <span className="font-bold">250</span> points
          </div>
        </div>
      </div>
      <p className="mt-12 px-8 text-xl">Publications utilisateur</p>
      <div className="flex w-full flex-col items-center pt-5">
        {/* for twice */}
        {Array(4)
          .fill(0)
          .map((_, i) => (
            // eslint-disable-next-line react/jsx-key
            <div className="my-5 flex items-center space-x-4 rounded-xl bg-neutral-50 p-5">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProfilePage;
