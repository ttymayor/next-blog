import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

// 這個文件允許您提供自定義的 React 組件
// 用於 MDX 文件中。您可以導入和使用任何
// React 組件，包括內聯樣式、
// 來自其他庫的組件等等。

const components: MDXComponents = {
  // 允許自定義內建組件，例如添加樣式
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold mt-6 mb-3 text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold mt-4 mb-2 text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-7 text-foreground/90">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
  ),
  li: ({ children }) => <li className="text-foreground/90">{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4 text-foreground/80">
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
