"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { LuLoader2 } from "react-icons/lu";
import Button from "@/components/ui/button";

const UserData = () => {
  const { user, loading, logout } = useAuth();
  if (loading)
    return (
      <div className={"flex h-screen justify-center"}>
        <LuLoader2 className="animate-spin" size={48} />
      </div>
    );
  if (!user) return <div>User not authenticated</div>;
  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray-400">Name</span>
      <span>{user.username}</span>
      <span className="text-gray-400">Email</span>
      <span>{user.email}</span>
      <span className="text-gray-400">isAdmin</span>
      <span>{user.isAdmin ? "Yes" : "No"}</span>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default UserData;
