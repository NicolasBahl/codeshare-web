import ApiService from "@/utils/ApiService";
import Post from "@/components/post";
import { Post as PostType } from "@/types/post";

export default async function Home() {
  const { posts } = await getPosts();
  return (
    <>
      <main>
        {posts.map((post: PostType) => (
          <Post post={post} key={post.id} compact={true} />
        ))}
      </main>
    </>
  );
}

async function getPosts() {
  const res = await ApiService.getPosts();
  return res.data;
}
