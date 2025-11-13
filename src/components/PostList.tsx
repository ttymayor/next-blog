"use client";

import { PostListItem } from "@/lib/markdown";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import LinkStatus from "@/components/LinkStatus";

type PostListProps = {
  posts: PostListItem[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="flex flex-col gap-6">
      {posts.map(({ slug, metadata }) => (
        <Card
          key={slug}
          className="group p-6 transition-shadow hover:shadow-lg"
        >
          <CardContent className="px-0">
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
                <Link
                  href={`/categories/${metadata.categories.toLowerCase()}`}
                  prefetch={false}
                >
                  <Badge variant="secondary" className="rounded-none">
                    {metadata.categories}
                  </Badge>
                </Link>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {/* 文章標題 */}
              <Link
                href={`/posts/${slug}`}
                prefetch={false}
                className="flex items-center gap-2"
              >
                <h2 className="mb-0 text-2xl font-bold group-hover:underline">
                  {metadata.title}
                  {process.env.NODE_ENV === "development" &&
                    metadata.draft &&
                    "（草稿）"}
                </h2>
                <LinkStatus />
              </Link>

              {/* 文章標籤 */}
              {metadata.tags && metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {metadata.tags.map((tag: string) => (
                    <Link href={`/tags/${tag}`} prefetch={false} key={tag}>
                      <Badge
                        variant="secondary"
                        className="bg-tty-pink text-tty-pink-foreground hover:bg-tty-pink/80 transition-colors"
                      >
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}

              {/* 文章描述 */}
              {metadata.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {metadata.description}
                </p>
              )}
            </div>

            <Link href={`/posts/${slug}`} prefetch={false}>
              {/* 閱讀更多 */}
              <span className="text-tty-pink inline-block group-hover:underline">
                閱讀更多 →
              </span>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
