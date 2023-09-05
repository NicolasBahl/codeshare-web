'use client';

import React from "react";
import { useAuth } from "@/contexts/AuthProvider";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Post as PostType } from "@/types/post";
import Post from "@/components/post";
import Skeleton from "@/components/ui/skeleton";

const ProfilePosts = ({ userId }: { userId: string }) => {
  const { authToken } = useAuth();

  const { data, isLoading } = useSWR(
    [`/users/${userId}/posts`, authToken],
    ([url, token]) => fetcher(url, token),
    { refreshInterval: 60000 }, // 1 minute
  );

  if (isLoading)
    return (
      <>
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
      </>
    );

  return (
    <div>
      {data?.posts?.length > 0 ? (
        data?.posts.map((post: PostType) => (
          <div key={post.id} className="mb-5">
            <Post post={post} compact={true} />
          </div>
        ))
      ) : (
        <p>This user has no posts yet.</p>
      )}
    </div>
  );
};

export default ProfilePosts;
