import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

// 這個文件允許您提供自定義的 React 組件
// 用於 MDX 文件中。您可以導入和使用任何
// React 組件，包括內聯樣式、
// 來自其他庫的組件等等。

const components: MDXComponents = {
  // 允許自定義內建組件，例如添加樣式
  h1: ({ children }) => (
    <h1 className="text-foreground mt-8 mb-4 text-4xl font-bold">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-foreground mt-6 mb-3 text-3xl font-semibold">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-foreground mt-4 mb-2 text-2xl font-semibold">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-foreground/90 mb-4 leading-7">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-inside list-disc space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-inside list-decimal space-y-2">{children}</ol>
  ),
  li: ({ children }) => <li className="text-foreground/90">{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-blue-600 hover:underline dark:text-blue-400"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  code: ({ children, className }) => {
    // 如果是內聯代碼（沒有 className）
    if (!className) {
      return (
        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-pink-600 dark:bg-gray-800 dark:text-pink-400">
          {children}
        </code>
      );
    }
    // 如果是程式碼區塊，保留 Prism 的 className
    return <code className={className}>{children}</code>;
  },
  pre: ({ children }) => {
    // 為程式碼區塊添加框框和樣式
    return (
      <pre className="my-6 overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
        {children}
      </pre>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="text-foreground/80 my-4 border-l-4 border-gray-300 pl-4 italic dark:border-gray-700">
      {children}
    </blockquote>
  ),
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
