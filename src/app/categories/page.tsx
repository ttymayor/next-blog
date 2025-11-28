"use cache";

import { getAllCategories } from "@/lib/markdown";
import CategoryLink from "@/components/CategoryLink";
import { Badge } from "@/components/ui/badge";

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  return (
    <>
      <main>
        <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold">
          分類 <Badge>{categories.length}</Badge>
        </h2>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <CategoryLink key={category} category={category} />
          ))}
        </div>
      </main>
    </>
  );
}
