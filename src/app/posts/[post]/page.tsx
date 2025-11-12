import type { Metadata } from "next";
import { getMDXPost, getStaticParams } from "@/lib/markdown";
import { Badge } from "@/components/ui/badge";

// 生成動態元數據
export async function generateMetadata({
  params,
}: {
  params: Promise<{ post: string }>;
}): Promise<Metadata> {
  const { post } = await params;

  // 讀取 .mdx 文件
  const mdxPost = await getMDXPost(post);
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
  params: Promise<{ post: string }>;
}) {
  const { post } = await params;

  // 讀取 .mdx 文件
  const mdxPost = await getMDXPost(post);
  if (mdxPost) {
    const Post = mdxPost.component;

    return (
      <article className="mx-[3%] px-4 py-8 md:mx-[10%] lg:mx-[15%]">
        {/* 文章標題和元數據 */}
        <header className="mb-8 border-b pb-6">
          <h1 className="mb-4 text-5xl font-bold">{mdxPost.metadata.title}</h1>
          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <time dateTime={mdxPost.metadata.pubDate}>
              {new Date(mdxPost.metadata.pubDate).toLocaleDateString("zh-TW", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {mdxPost.metadata.categories && (
              <>
                <span className="select-none">•</span>
                <span>{mdxPost.metadata.categories}</span>
              </>
            )}
          </div>
          {mdxPost.metadata.description && (
            <p className="text-muted-foreground mt-4 text-lg">
              {mdxPost.metadata.description}
            </p>
          )}
          {mdxPost.metadata.tags && mdxPost.metadata.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {mdxPost.metadata.tags.map((tag: string) => (
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
        </header>

        {/* MDX 內容 */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <Post />
        </div>
      </article>
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
export function generateStaticParams() {
  return getStaticParams();
}
