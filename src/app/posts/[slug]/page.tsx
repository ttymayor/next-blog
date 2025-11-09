import type { Metadata } from "next";
import { getMarkdownPost, getMDXPost, getStaticParams } from "@/lib/markdown";
import { remark } from "remark";
import html from "remark-html";

// 生成動態元數據
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // 嘗試讀取 .md 文件
  const mdPost = getMarkdownPost(slug);
  if (mdPost) {
    return {
      title: mdPost.metadata.title,
      description: mdPost.metadata.description,
      authors: [{ name: mdPost.metadata.author }],
      openGraph: {
        title: mdPost.metadata.title,
        description: mdPost.metadata.description,
        type: "article",
        publishedTime: mdPost.metadata.date,
        authors: [mdPost.metadata.author],
      },
    };
  }

  // 否則讀取 .mdx 文件
  const mdxPost = await getMDXPost(slug);
  if (mdxPost) {
    return {
      title: mdxPost.metadata.title,
      description: mdxPost.metadata.description,
      authors: [{ name: mdxPost.metadata.author }],
      openGraph: {
        title: mdxPost.metadata.title,
        description: mdxPost.metadata.description,
        type: "article",
        publishedTime: mdxPost.metadata.date,
        authors: [mdxPost.metadata.author],
      },
    };
  }

  // 如果都找不到，返回默認值
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

  // 嘗試讀取 .md 文件
  const mdPost = getMarkdownPost(slug);
  if (mdPost) {
    // 將 Markdown 轉換為 HTML
    const processedContent = await remark().use(html).process(mdPost.content);
    const contentHtml = processedContent.toString();

    return (
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 文章標題和元數據 */}
        <header className="mb-8 border-b pb-6">
          <h1 className="text-5xl font-bold mb-4">{mdPost.metadata.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>作者：{mdPost.metadata.author}</span>
            <span>•</span>
            <time dateTime={mdPost.metadata.date}>{mdPost.metadata.date}</time>
          </div>
          {mdPost.metadata.description && (
            <p className="mt-4 text-lg text-muted-foreground">
              {mdPost.metadata.description}
            </p>
          )}
        </header>

        {/* Markdown 內容 */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    );
  }

  // 否則讀取 .mdx 文件
  const mdxPost = await getMDXPost(slug);
  if (mdxPost) {
    const Post = mdxPost.component;

    return (
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 文章標題和元數據 */}
        <header className="mb-8 border-b pb-6">
          <h1 className="text-5xl font-bold mb-4">{mdxPost.metadata.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>作者：{mdxPost.metadata.author}</span>
            <span>•</span>
            <time dateTime={mdxPost.metadata.date}>
              {mdxPost.metadata.date}
            </time>
          </div>
          {mdxPost.metadata.description && (
            <p className="mt-4 text-lg text-muted-foreground">
              {mdxPost.metadata.description}
            </p>
          )}
        </header>

        {/* MDX 內容 */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <Post />
        </div>
      </article>
    );
  }

  // 如果都找不到，顯示 404
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">文章未找到</h1>
      <p className="text-muted-foreground">抱歉，找不到您要查找的文章。</p>
    </div>
  );
}

// 自動從 src/content/ 目錄掃描所有 .md 和 .mdx 文件
export function generateStaticParams() {
  return getStaticParams();
}

// 設為 true 允許動態路由（如果文件存在但未在 generateStaticParams 中）
export const dynamicParams = true;
