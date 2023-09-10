"use client";

import Post from "@/components/post";
import { Post as PostType } from "@/types/post";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useAuth } from "@/contexts/AuthProvider";
import React from "react";
import Skeleton from "@/components/ui/skeleton";
import Image from "next/image";

export default function MyAnswers() {
  return (
    <main>
      <h1 className="font-bold text-xl pl-2 py-3">My Answers</h1>
      <ShowPosts />
    </main>
  );
}

const ShowPosts = () => {
  const { authToken } = useAuth();

  const { data, isLoading } = useSWR(
    [`/posts/comments/me`, authToken],
    ([url, token]) => fetcher(url, token),
    { refreshInterval: 60000 }, // 1 minute
  );
  if (isLoading)
    return (
      <div className="my-5 flex items-center space-x-4 rounded-xl bg-neutral-50 p-5">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  return (
    <>
      {data?.posts?.length > 0 ? (
        data?.posts.map((post: PostType) => (
          <div key={post.id} className="mb-5">
            <Post post={post} compact={true} />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            src="/images/undraw_void.png"
            alt="empty"
            width={300}
            height={300}
            className="w-[300px]"
          />
          <p className="text-neutral-600">
            You have not answered any questions yet.
          </p>
        </div>
      )}
    </>
  );
};
