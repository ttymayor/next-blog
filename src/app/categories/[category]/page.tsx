import PostList from "@/components/PostList";
import { getAllPosts, getAllCategories } from "@/lib/markdown";
import { Suspense } from "react";

async function CategoryPosts({ category }: { category: string }) {
  const decodedCategory = decodeURIComponent(category);
  const filteredPosts = (await getAllPosts())
    .filter(({ metadata }) => metadata.categories === decodedCategory)
    .map(({ slug, metadata }) => ({
      slug,
      metadata,
      filePath: "",
    }));

  return <PostList posts={filteredPosts} />;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return (
    <div className="mx-[3%] px-4 py-8 md:mx-[10%] lg:mx-[15%]">
      <main>
        <h2 className="mb-4 text-2xl font-bold">分類「{decodedCategory}」</h2>
        <div className="flex flex-col gap-4">
          <Suspense fallback={<div>載入中...</div>}>
            <CategoryPosts category={category} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}
