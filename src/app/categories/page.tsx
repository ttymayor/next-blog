import { getAllCategories } from "@/lib/markdown";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  return (
    <div className="mx-[3%] px-4 py-8 md:mx-[10%] lg:mx-[15%]">
      <main>
        <h2 className="mb-4 text-2xl font-bold">分類</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              href={`/categories/${encodeURIComponent(category)}`}
              key={category}
            >
              <Badge
                variant="secondary"
                className="text-md text-tty-pink-foreground bg-tty-pink hover:bg-tty-pink/80 rounded-sm transition-all"
              >
                {category}
              </Badge>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
