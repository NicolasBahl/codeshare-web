"use client";

import React from "react";
import LetterPicture from "@/components/LetterPicture";
import { BsCamera } from "react-icons/bs";
import * as emoji from "node-emoji";
import { useAuth } from "@/contexts/AuthProvider";
import { UserData } from "@/types/user";

const ProfileAvatar = ({ user }: { user: UserData }) => {
  const { user: me } = useAuth();
  const [profilePhoto, setProfilePhoto] = React.useState<string | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const isMe = me?.username === user.username;

  const handleMouseEnter = () => {
    isMe && setIsHovered(true);
  };

  const handleMouseLeave = () => {
    isMe && setIsHovered(false);
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
    <div className="relative rounded-lg">
      <div className="h-52 w-full bg-gradient-to-b from-violet-500 to-cyan-600 lg:rounded-t-lg"></div>
      <div className="absolute -bottom-24 left-20 flex h-44 w-44 items-center justify-center rounded-full border-8 border-white bg-gray-300">
        <LetterPicture
          username={user?.username || ""}
          className="absolute"
          width={200}
          height={200}
          fontSize={80}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <label
          htmlFor="photoInput"
          className="flex h-24 w-24 items-center justify-center text-white"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered && <BsCamera className="h-12 w-12" />}
        </label>
        {isMe && (
          <input
            id="photoInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadPhoto}
          />
        )}
        <div>
          <div className="absolute -right-1 bottom-2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-white">
            {user && emoji.get(user?.level as string)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAvatar;
