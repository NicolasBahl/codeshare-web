"use client";

import { RxAvatar } from "react-icons/rx";
import "@/styles/post.css";
import Link from "next/link";
import React, { useState } from "react";
import * as emoji from "node-emoji";
import { useAuth } from "@/contexts/AuthProvider";
import LetterPicture from "@/components/LetterPicture";

interface topProps {
  username: string;
  score: number;
  level: string;
}

export default function TopUser({ topUsers }: { topUsers: topProps[] }) {
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
    <div className="rounded-lg bg-white p-5 shadow-md w-64">
      <h1 className="mb-2 font-bold text-gray-500">Top Users</h1>
      {topUsers && topUsers.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LetterPicture
              username={item.username}
              height={100}
              width={100}
              fontSize={32}
              style={{
                height: "24px",
                width: "24px",
              }}
            />
            <Link href={`/profile/${item.username}`} className="text-primary">
              {item.username}
            </Link>
          </div>
          <div className="flex items-center">
            <span className="ml-3 mr-1 py-2 text-gray-500">
              {formatVotes(item.score)}
            </span>
            {item && emoji.get(item.level as string)}
          </div>
        </div>
      ))}
      {me && (
        <>
          <div className="my-2 border-t border-gray-200" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <RxAvatar
                className="text-gray-500"
                style={{ fontSize: "25px" }}
              />
              <Link href={`/profile/${me.username}`} className="text-primary">
                You
              </Link>
            </div>
            <div className="flex items-center">
              <span className="ml-3 mr-1 py-2 text-gray-500">
                {formatVotes(me.score as number)}
              </span>
              {me && emoji.get(me.level as string)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

