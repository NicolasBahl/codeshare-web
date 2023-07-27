import React from "react";
import Skeleton from "@/components/ui/skeleton";
import ApiService from "@/utils/ApiService";
import { notFound } from "next/navigation";
import ProfileAvatar from "./ProfileAvatar";

const fetchUser = async (username: string) => {
  const res = await ApiService.getUserByUsername(username);
  if (res.status === 404) {
    return notFound();
  }
  if (res.status !== 200) return;

  return res.data;
};

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const user = await fetchUser(params.username);

  return (
    <>
      <div className="w-full rounded-lg bg-white pb-8 shadow-md">
        <ProfileAvatar user={user} />
        <div>
          <div className="mt-28 px-24 text-2xl">{user?.username}</div>
          <div className="mt-4 px-24 text-gray-500">
            <span className="font-bold">{user?.score}</span> points
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
