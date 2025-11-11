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
    rehypePlugins: [
      "rehype-code-titles", // 必須在 rehype-prism-plus 之前
      [
        "rehype-prism-plus",
        {
          ignoreMissing: true,
          showLineNumbers: true,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
