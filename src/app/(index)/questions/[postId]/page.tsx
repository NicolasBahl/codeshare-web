import Post from "@/components/post";
import ApiService from "@/utils/ApiService";
import { notFound } from "next/navigation";
import PostItem from "@/app/(index)/questions/[postId]/post";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  // Fetch the post data from API
  const { post } = await getPost(params.postId);

  return (
    <div>
      <PostItem post={post} />
    </div>
  );
}

async function getPost(postId: string) {
  const res = await ApiService.getPostById(postId);

  // If the post is not found, return 404 page
  if (res.status !== 200) {
    notFound();
  }

  return res.data;
}
