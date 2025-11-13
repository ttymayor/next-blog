import { getAllCategories } from "@/lib/markdown";
import CategoryLink from "@/components/CategoryLink";

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  return (
    <div className="mx-[3%] px-4 py-8 md:mx-[10%] lg:mx-[15%]">
      <main>
        <h2 className="mb-8 text-2xl font-bold">分類</h2>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <CategoryLink key={category} category={category} />
          ))}
        </div>
      </main>
    </div>
  );
}
