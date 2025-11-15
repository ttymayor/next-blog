import PostList from "@/components/PostList";
import { getAllPosts, getAllCategories } from "@/lib/markdown";

async function CategoryPosts({ category }: { category: string }) {
  const decodedCategory = decodeURIComponent(category);
  const filteredPosts = (await getAllPosts()).filter(
    ({ metadata }) => metadata.categories === decodedCategory,
  );
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
        <h2 className="mb-8 text-2xl font-bold">分類「{decodedCategory}」</h2>
        <CategoryPosts category={category} />
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
