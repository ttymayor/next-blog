import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["tsx", "jsx", "mdx", "md", "ts", "js"],
  reactCompiler: true,
  experimental: {
    useCache: true,
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
