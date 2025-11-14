import { getAllTags } from "@/lib/markdown";
import { Suspense } from "react";
import TagLink from "@/components/TagLink";
import { Badge } from "@/components/ui/badge";

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="mx-[3%] px-4 py-8 md:mx-[10%] lg:mx-[15%]">
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold">
            標籤 <Badge>{tags.length}</Badge>
          </h2>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagLink key={tag} tag={tag} />
            ))}
          </div>
        </Suspense>
      </main>
    </div>
  );
}
