"use client";

import { PostListItem } from "@/lib/markdown";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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
          <Link
            href={`/posts/${slug}`}
            className="no-underline group-hover:underline"
            prefetch={false}
          >
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
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-tty-pink text-tty-pink-foreground hover:bg-tty-pink/80"
                  >
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
        </Card>
      ))}
    </div>
  );
}
