"use cache";

import { getAllTags } from "@/lib/markdown";
import TagLink from "@/components/TagLink";
import { Badge } from "@/components/ui/badge";

export default async function TagsPage() {
  const tags = await getAllTags(true);

  return (
    <>
      <main>
        <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold">
          標籤 <Badge>{tags.length}</Badge>
        </h2>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagLink key={tag.name} tag={tag.name} count={tag.count} />
          ))}
        </div>
      </main>
    </>
  );
}
