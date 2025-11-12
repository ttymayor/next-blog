import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/markdown";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const filteredPosts = (await getAllPosts())
    .filter(({ metadata }) => metadata.categories?.includes(decodedCategory))
    .map(({ slug, metadata }) => ({
      slug,
      metadata,
      filePath: "",
    }));
  return (
    <div className="mx-[3%] px-4 py-8 md:mx-[10%] lg:mx-[15%]">
      <main>
        <h2 className="mb-4 text-2xl font-bold">分類「{decodedCategory}」</h2>
        <div className="flex flex-col gap-4">
          <PostList posts={filteredPosts} />
        </div>
      </main>
    </div>
  );
}
