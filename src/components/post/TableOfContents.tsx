"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/markdown";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  headings: Heading[];
}

// 清理標題文本，移除 LaTeX 語法和 Markdown 連結
function cleanHeadingText(text: string): string {
  // 移除 LaTeX 內聯數學公式 $...$
  let cleaned = text.replace(/\$([^$]+)\$/g, (match, content) => {
    // 保留 LaTeX 內容，但移除 $ 符號
    return content;
  });

  // 移除 LaTeX 區塊數學公式 $$...$$
  cleaned = cleaned.replace(/\$\$([^$]+)\$\$/g, (match, content) => {
    return content;
  });

  // 移除 Markdown 連結語法 [text](url)，只保留文字部分
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");

  // 移除多餘的空格
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  return cleaned;
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      },
    );

    // 觀察所有標題元素
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // 偏移量，避免被固定導航欄遮擋
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-10 w-full">
      <h3 className="text-foreground mb-4 text-sm font-semibold">目錄</h3>
      <nav className="space-y-1">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id;
          const indentClass =
            heading.level === 2
              ? "pl-0"
              : heading.level === 3
                ? "pl-4"
                : heading.level === 4
                  ? "pl-8"
                  : heading.level === 5
                    ? "pl-12"
                    : "pl-16";

          return (
            <a
              key={`${heading.id}-${index}`}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(heading.id);
              }}
              className={cn(
                "hover:text-foreground block text-sm transition-colors",
                indentClass,
                isActive
                  ? "text-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              {cleanHeadingText(heading.text)}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
