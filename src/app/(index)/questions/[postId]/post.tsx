"use client";

import React from "react";
import { Post as PostType } from "@/types/post";
import Post from "@/components/post";
import useSWR from "swr";
import { useAuth } from "@/contexts/AuthProvider";
import { fetcher } from "@/utils/fetcher";

const PostItem = ({ post }: { post: PostType }) => {
  const { authToken } = useAuth();

  // Fetch the post data from API
  const { data } = useSWR([`/posts/${post.id}`, authToken], ([url, token]) =>
    fetcher(url, token)
  );

  return (
    <>
      <Post post={data?.post || post} />
    </>
  );
};

export default PostItem;
