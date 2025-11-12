import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";
import { Badge } from "@/components/ui/badge";

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-[3%] px-4 py-8 md:mx-[10%] lg:mx-[15%]">
      <main>
        <div className="flex flex-col gap-4">
          {posts.map(({ slug, metadata }) => (
            <div
              key={slug}
              className="bg-card rounded-lg border p-6 transition-shadow hover:shadow-lg"
            >
              <Link href={`/posts/${slug}`} className="group no-underline">
                <div className="mb-3 flex items-center gap-4 text-sm">
                  {/* 文章日期 */}
                  <time
                    dateTime={metadata.pubDate}
                    className="text-muted-foreground"
                  >
                    {new Date(metadata.pubDate).toLocaleDateString("zh-TW", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {/* 文章分類 */}
                  {metadata.categories && (
                    <Badge variant="secondary" className="rounded-none">
                      {metadata.categories}
                    </Badge>
                  )}
                </div>

                {/* 文章標題 */}
                <h2 className="mb-2 text-2xl font-bold">{metadata.title}</h2>

                {/* 文章標籤 */}
                {metadata.tags && metadata.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {metadata.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* 文章描述 */}
                {metadata.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {metadata.description}
                  </p>
                )}

                {/* 閱讀更多 */}
                <span className="text-tty-pink inline-block group-hover:underline">
                  閱讀更多 →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
