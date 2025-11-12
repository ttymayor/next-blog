import { getAllPosts, getAllTags } from "@/lib/markdown";
import PostList from "@/components/PostList";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  // 解碼 URL 編碼的標籤名稱
  const decodedTag = decodeURIComponent(tag);
  const filteredPosts = (await getAllPosts())
    .filter(({ metadata }) => metadata.tags?.includes(decodedTag))
    .map(({ slug, metadata }) => ({
      slug,
      metadata,
      filePath: "",
    }));

  return (
    <div className="mx-[3%] px-4 py-8 md:mx-[10%] lg:mx-[15%]">
      <main>
        <h2 className="mb-4 text-2xl font-bold">標籤「{decodedTag}」</h2>
        <div className="flex flex-col gap-4">
          <PostList posts={filteredPosts} />
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}
