"use client";

import { FiArrowUp } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import "@/styles/post.css";
import Link from "next/link";
import React, { useState } from "react";
import ApiService from "@/utils/ApiService";
import * as emoji from "node-emoji";
import { useAuth } from "@/contexts/AuthProvider";

interface topProps {
  username: string;
  score: number;
  level: string;
}

export default function Top({ topUsers }: { topUsers: topProps[] }) {
  const { user: me } = useAuth();

  const formatVotes = (votes: number) => {
    const absoluteVotes = Math.abs(votes);

    if (absoluteVotes >= 1000) {
      const formattedVotes = (absoluteVotes / 1000).toFixed(1);
      return `${formattedVotes}k`;
    }
    return votes;
  };

  return (
    <div>
      <div className="flex flex-col rounded-lg bg-white shadow-md">
        <div className="relative flex flex-col items-start">
          <div className="flex w-full flex-col">
            <h1 className="p-4 font-bold text-gray-500">Top Users</h1>
            {topUsers.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-12 p-2"
              >
                <div className="flex items-center">
                  <RxAvatar
                    className="text-gray-500"
                    style={{ fontSize: "25px" }}
                  />
                  <Link
                    href={`/profile/${item.username}`}
                    className="p-4 text-blue-800"
                  >
                    {item.username}
                  </Link>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-500">
                    {formatVotes(item.score)}
                  </span>
                  {item && emoji.get(item.level as string)}
                </div>
              </div>
            ))}
          </div>
        </div>
        {me && (
          <>
            <div className="mx-10 my-2 mt-4 h-px bg-gray-500"></div>
            <div className="flex items-center justify-between gap-12 p-2">
              <div className="flex items-center">
                <RxAvatar
                  className="text-gray-500"
                  style={{ fontSize: "25px" }}
                />
                <Link
                  href={`/profile/${me?.username}`}
                  className="p-4 text-blue-800"
                >
                  You
                </Link>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-gray-500">
                  {formatVotes(me?.score as number)}
                </span>
                {emoji.get(me.level as string)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
