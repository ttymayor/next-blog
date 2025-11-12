import { getAllTags } from "@/lib/markdown";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Suspense } from "react";

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="mx-[3%] px-4 py-8 md:mx-[10%] lg:mx-[15%]">
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <h2 className="mb-4 text-2xl font-bold">標籤</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link href={`/tags/${tag}`} key={tag}>
                <Badge
                  variant="outline"
                  className="text-foreground/90 hover:bg-foreground/10"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </Suspense>
      </main>
    </div>
  );
}
