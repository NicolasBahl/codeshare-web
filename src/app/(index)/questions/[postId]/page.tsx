import Post from "@/components/post";
import ApiService from "@/utils/ApiService";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { post } = await getPost(params.postId);

  return (
    <div>
      <Post post={post} />
    </div>
  );
}

async function getPost(postId: string) {
  const res = await ApiService.getPostById(postId);

  if (res.status !== 200) {
    notFound();
  }

  return res.data;
}
