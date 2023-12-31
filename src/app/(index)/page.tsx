"use client";

import ApiService from "@/utils/ApiService";
import Post from "@/components/post";
import { Post as PostType } from "@/types/post";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useAuth } from "@/contexts/AuthProvider";
import React from "react";
import Skeleton from "@/components/ui/skeleton";

export default function Home() {
  const { authToken } = useAuth();

  const { data, mutate: refreshData, isLoading } = useSWR(
    [`/posts`, authToken],
    ([url, token]) => fetcher(url, token),
    { refreshInterval: 60000 }, // 1 minute
  );

  return (
    <>
      <main>
        {data?.posts?.length > 0 ? (
          data?.posts.map((post: PostType) => (
            <div key={post.id} className="mb-5">
              <Post post={post} compact={true} refreshData={refreshData} />
            </div>
          ))
        ) : (
          <div className="my-5 flex items-center space-x-4 rounded-xl bg-neutral-50 p-5">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

async function getPosts() {
  const res = await ApiService.getPosts();
  return res.data;
}
