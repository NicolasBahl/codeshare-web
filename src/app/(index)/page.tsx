import ApiService from "@/utils/ApiService";
import Post from "@/components/post";
import { Post as PostType } from "@/types/post";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { posts } = await getPosts();
  return (
    <>
      <main>
        {posts &&
          posts.map((post: PostType) => (
            <div key={post.id} className="mb-5">
              <Post post={post} compact={true} />
            </div>
          ))}
      </main>
    </>
  );
}

async function getPosts() {
  const res = await ApiService.getPosts();
  return res.data;
}
