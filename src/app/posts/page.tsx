"use cache";

import { getAllPosts } from "@/lib/markdown";
import PostList from "@/components/post/PostList";

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <>
      <main>
        <PostList posts={posts} />
      </main>
    </>
  );
}
