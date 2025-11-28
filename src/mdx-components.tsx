import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import BetterSpoiler from "@/components/post/Spoiler";
import CodeTab from "@/components/post/CodeTab";
import { Noto_Serif_TC } from "next/font/google";
import { Highlighter } from "@/components/ui/highlighter";
import { Kbd } from "@/components/ui/kbd";
import type { ReactNode } from "react";

const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
});

// 簡單的哈希函數，用於生成唯一 ID
function simpleHash(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 轉換為 32 位整數
  }
  return Math.abs(hash);
}

// 從文本生成錨點 ID（與 markdown.ts 中的函數保持一致）
function generateId(children: ReactNode): string {
  let text = "";

  if (typeof children === "string") {
    text = children;
  } else if (Array.isArray(children)) {
    text = children
      .map((child: ReactNode) => {
        if (typeof child === "string") return child;
        if (typeof child === "object" && child !== null && "props" in child) {
          const props = child.props as { children?: ReactNode };
          return props.children ? generateId(props.children) : "";
        }
        return "";
      })
      .join("");
  } else if (
    typeof children === "object" &&
    children !== null &&
    "props" in children
  ) {
    const props = children.props as { children?: ReactNode };
    return props.children ? generateId(props.children) : "";
  }

  // 檢查是否包含中文字符
  const hasChinese = /[\u4e00-\u9fff]/.test(text);

  // 如果包含中文，直接使用哈希值生成 ID
  if (hasChinese) {
    return `heading-${simpleHash(text)}`;
  }

  // 先嘗試生成可讀的 ID（英文和數字）
  let id = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // 移除特殊字符
    .replace(/\s+/g, "-") // 空格替換為連字符
    .replace(/-+/g, "-") // 多個連字符合併為一個
    .trim();

  // 如果 ID 為空或只包含連字符，使用文本的哈希值
  if (!id || id === "-") {
    id = `heading-${simpleHash(text)}`;
  }

  return id;
}

// 這個文件允許您提供自定義的 React 組件
// 用於 MDX 文件中。您可以導入和使用任何
// React 組件，包括內聯樣式、
// 來自其他庫的組件等等。

const components: MDXComponents = {
  // 允許自定義內建組件，例如添加樣式
  h1: ({ children }) => (
    <h1
      className={`${notoSerifTC.className} text-foreground group mt-12 mb-4 text-4xl font-bold`}
    >
      {children}
      <span className="text-muted-foreground text-base opacity-0 transition-opacity select-none group-hover:opacity-100">
        {" "}
        h1
      </span>
    </h1>
  ),
  h2: ({ children }) => {
    const id = generateId(children);
    return (
      <h2
        id={id}
        className={`${notoSerifTC.className} text-foreground group mt-12 mb-4 scroll-mt-24 text-3xl font-semibold`}
      >
        {children}
        <span className="text-muted-foreground text-base opacity-0 transition-opacity select-none group-hover:opacity-100">
          {" "}
          h2
        </span>
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = generateId(children);
    return (
      <h3
        id={id}
        className={`${notoSerifTC.className} text-foreground group mt-8 mb-3 scroll-mt-24 text-2xl font-semibold`}
      >
        {children}
        <span className="text-muted-foreground text-base opacity-0 transition-opacity select-none group-hover:opacity-100">
          {" "}
          h3
        </span>
      </h3>
    );
  },
  h4: ({ children }) => {
    const id = generateId(children);
    return (
      <h4
        id={id}
        className={`${notoSerifTC.className} text-foreground mt-8 mb-3 scroll-mt-24 text-xl font-semibold`}
      >
        {children}
      </h4>
    );
  },
  h5: ({ children }) => {
    const id = generateId(children);
    return (
      <h5
        id={id}
        className={`${notoSerifTC.className} text-foreground mt-8 mb-3 scroll-mt-24 text-lg font-semibold`}
      >
        {children}
      </h5>
    );
  },
  h6: ({ children }) => {
    const id = generateId(children);
    return (
      <h6
        id={id}
        className={`${notoSerifTC.className} text-foreground mt-6 mb-3 scroll-mt-24 text-base font-semibold`}
      >
        {children}
      </h6>
    );
  },
  p: ({ children }) => (
    <p className="text-foreground/90 mt-4 leading-7">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-2 list-inside list-disc space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 list-inside list-decimal space-y-2">{children}</ol>
  ),
  li: ({ children }) => <li className="text-foreground/90">{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-tty-primary hover:text-tty-secondary transition-colors"
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
  img: (props) => {
    const imageProps = props as ImageProps;
    return (
      <>
        <span className="flex flex-col items-center">
          <Image
            {...imageProps}
            width={10000}
            height={10000}
            className="mx-auto max-h-[540px] w-auto max-w-full rounded-lg shadow-lg"
            alt={imageProps.alt ?? ""}
          />
          <span className="text-muted-foreground dark:text-muted-foreground mt-2 text-center text-sm">
            {imageProps.alt ?? ""}
          </span>
        </span>
      </>
    );
  },
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
      <table className="w-full overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">{children}</tr>
  ),
  th: ({ children, align, ...props }) => {
    const alignClass =
      align === "center"
        ? "text-center"
        : align === "right"
          ? "text-right"
          : "text-left";
    return (
      <th
        className={`text-foreground border-r border-b border-gray-300 px-4 py-2 font-semibold first:border-l last:border-r dark:border-gray-700 ${alignClass}`}
        {...props}
      >
        {children}
      </th>
    );
  },
  td: ({ children, align, ...props }) => {
    const alignClass =
      align === "center"
        ? "text-center"
        : align === "right"
          ? "text-right"
          : "text-left";
    return (
      <td
        className={`text-foreground/90 border-r border-b border-gray-300 px-4 py-2 first:border-l last:border-r dark:border-gray-700 ${alignClass}`}
        {...props}
      >
        {children}
      </td>
    );
  },
  Spoiler: ({ children }) => <BetterSpoiler>{children}</BetterSpoiler>,
  CodeTab: ({ codes }) => <CodeTab codes={codes} />,
  Highlighter: ({ children, action = "underline", color = "#FF9800" }) => (
    <Highlighter action={action} color={color}>
      {children}
    </Highlighter>
  ),
  Kbd: ({ children }) => <Kbd>{children}</Kbd>,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
