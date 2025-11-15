import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["tsx", "jsx", "mdx", "ts", "js"],
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    useCache: true,
  },
};

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [
      "remark-gfm", // 支援 GitHub Flavored Markdown，包括表格
      "remark-math", // 支援 LaTeX 數學公式
    ],
    rehypePlugins: [
      "rehype-code-titles", // 必須在 rehype-prism-plus 之前
      [
        "rehype-prism-plus",
        {
          ignoreMissing: true,
          showLineNumbers: true,
        },
      ],
      "rehype-katex", // 渲染 LaTeX 數學公式
    ],
  },
});

export default withMDX(nextConfig);
