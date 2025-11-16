import { getAllPosts } from "@/lib/markdown";
import PostList from "@/components/post/PostList";

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-[3%] px-4 py-8 md:mx-[10%] lg:mx-[15%]">
      <main>
        <PostList posts={posts} />
      </main>
    </div>
  );
}
