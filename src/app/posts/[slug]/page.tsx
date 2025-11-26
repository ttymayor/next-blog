"use cache";

import { Noto_Serif_TC } from "next/font/google";
import type { Metadata } from "next";
import { getMDXPost, getStaticParams, getAllPosts } from "@/lib/markdown";
import Overtime from "@/components/post/Overtime";
import { Suspense } from "react";
import TagLink from "@/components/TagLink";
import CategoryLink from "@/components/CategoryLink";
import { Separator } from "@/components/ui/separator";
import TableOfContents from "@/components/post/TableOfContents";
import PostNavigation from "@/components/post/PostNavigation";

const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
});

// 生成動態元數據
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // 讀取 .mdx 文件
  const mdxPost = await getMDXPost(slug);
  if (mdxPost) {
    return {
      title: mdxPost.metadata.title,
      description: mdxPost.metadata.description,
      keywords: mdxPost.metadata.tags,
      category: mdxPost.metadata.categories,
      openGraph: {
        title: mdxPost.metadata.title,
        description: mdxPost.metadata.description,
        type: "article",
        publishedTime: mdxPost.metadata.pubDate,
        tags: mdxPost.metadata.tags,
      },
    };
  }

  // 如果找不到，返回默認值
  return {
    title: "文章未找到",
    description: "無法找到該文章",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 讀取 .mdx 文件
  const mdxPost = await getMDXPost(slug);
  if (mdxPost) {
    const Post = mdxPost.component;
    const headings = mdxPost.headings || [];

    // 獲取所有文章並找到當前文章的索引
    const allPosts = await getAllPosts();
    const currentIndex = allPosts.findIndex((post) => post.slug === slug);

    // 獲取前一篇文章（索引 - 1，較新的）和後一篇文章（索引 + 1，較舊的）
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost =
      currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return (
      <div className="mx-[3%] px-4 py-8 md:mx-[10%] lg:mx-[15%]">
        <div className="lg:flex lg:gap-8">
          <article className="w-full">
            {/* 文章標題和元數據 */}
            <header>
              {/* 文章標題 */}
              <h1
                className={`${notoSerifTC.className} mb-4 text-5xl font-bold`}
              >
                {mdxPost.metadata.title}
              </h1>

              {/* 文章日期和分類 */}
              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <time dateTime={mdxPost.metadata.pubDate}>
                  {new Date(mdxPost.metadata.pubDate).toLocaleDateString(
                    "zh-TW",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </time>
                {mdxPost.metadata.categories && (
                  <CategoryLink
                    key={mdxPost.metadata.categories}
                    category={mdxPost.metadata.categories}
                  />
                )}
              </div>

              {/* 文章描述 */}
              <p
                className={`${notoSerifTC.className} text-muted-foreground mt-4 text-lg`}
              >
                {mdxPost.metadata.description || "作者很懶，沒有寫描述"}
              </p>

              {/* 文章標籤 */}
              {mdxPost.metadata.tags && mdxPost.metadata.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {mdxPost.metadata.tags.map((tag: string) => (
                    <TagLink key={tag} tag={tag} />
                  ))}
                </div>
              )}
              {/* 判斷是否超過半年 */}
              <Suspense fallback={null}>
                <Overtime pubDate={mdxPost.metadata.pubDate} />
              </Suspense>
            </header>

            <Separator className="my-8" />

            {/* MDX 內容 */}
            <div>
              <Post />
            </div>

            {/* 前一篇/後一篇文章導航 */}
            <PostNavigation prevPost={prevPost} nextPost={nextPost} />
          </article>
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>
    );
  }

  // 如果找不到，顯示 404
  return (
    <div className="mx-[3%] px-4 py-8 md:mx-[10%] lg:mx-[15%]">
      <h1 className="mb-4 text-4xl font-bold">文章未找到</h1>
      <p className="text-muted-foreground">抱歉，找不到您要查找的文章。</p>
    </div>
  );
}

// 自動從 src/content/ 目錄掃描所有 .mdx 文件
export async function generateStaticParams() {
  return getStaticParams();
}
