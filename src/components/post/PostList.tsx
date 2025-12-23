"use client";

import { PostListItem } from "@/lib/markdown";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import LinkStatus from "@/components/LinkStatus";
import TagLink from "@/components/TagLink";
import CategoryLink from "@/components/CategoryLink";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { Noto_Serif_TC } from "next/font/google";

const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
});

type PostListProps = {
  posts: PostListItem[];
};

export default function PostList({ posts }: PostListProps) {
  const [search, setSearch] = useState("");

  const filteredPosts = () => {
    return posts.filter((post) => {
      return (
        post.metadata.title.toLowerCase().includes(search.toLowerCase()) ||
        post.metadata.description
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        post.metadata.tags?.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase()),
        ) ||
        post.metadata.categories?.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <InputGroup className="rounded-xl">
        <InputGroupInput
          placeholder="搜尋文章"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="search"
          name="search"
          autoComplete="off"
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {filteredPosts().length} 篇文章
        </InputGroupAddon>
      </InputGroup>
      {filteredPosts().map(({ slug, metadata }) => (
        <Card
          key={slug}
          className="group rounded-3xl border-none p-6 shadow-none"
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
                <CategoryLink
                  key={metadata.categories}
                  category={metadata.categories}
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              {/* 文章標題 */}
              <Link
                href={`/posts/${slug}`}
                prefetch={false}
                className="flex items-center gap-2"
              >
                <h2
                  className={`${notoSerifTC.className} mb-0 text-2xl font-bold group-hover:underline`}
                >
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
                    <TagLink key={tag} tag={tag} />
                  ))}
                </div>
              )}

              {/* 文章描述 */}
              <p
                className={`${notoSerifTC.className} text-muted-foreground leading-relaxed`}
              >
                {metadata.description
                  ? metadata.description
                  : "作者很懶，沒有寫描述"}
              </p>
            </div>

            <Link href={`/posts/${slug}`} prefetch={false}>
              {/* 閱讀更多 */}
              <span
                className={`${notoSerifTC.className} text-tty-pink inline-block group-hover:underline`}
              >
                閱讀更多 →
              </span>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
