import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "src/content");

export type PostMetadata = {
  title: string;
  description?: string;
  pubDate: string;
  tags?: string[];
  categories?: string;
  draft?: boolean;
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
  filePath: string; // 完整的文件路徑
};

// 用於列表頁面的 Post 類型，不包含 content（MDX 組件）
export type PostListItem = {
  slug: string;
  metadata: PostMetadata;
  filePath: string;
};

// 遞歸掃描目錄，支援 content/[year]/[month]/[*.mdx] 結構
function scanDirectory(dir: string, baseDir: string = dir): string[] {
  const results: string[] = [];

  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        // 遞歸掃描子目錄
        results.push(...scanDirectory(fullPath, baseDir));
      } else if (item.isFile() && item.name.endsWith(".mdx")) {
        // 獲取相對於 content 目錄的路徑
        const relativePath = path.relative(baseDir, fullPath);
        results.push(relativePath);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }

  return results;
}

// 獲取所有 .mdx 文件的相對路徑
export function getAllPostPaths(): string[] {
  try {
    return scanDirectory(contentDirectory);
  } catch (error) {
    console.error("Error reading content directory:", error);
    return [];
  }
}

// 獲取所有文章的 slugs（從文件名提取）
export function getAllPostSlugs(): string[] {
  const paths = getAllPostPaths();
  return paths.map((filePath) => {
    // 從路徑中提取文件名作為 slug
    const fileName = path.basename(filePath, path.extname(filePath));
    return fileName;
  });
}

// 為 generateStaticParams 生成參數
export function getStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 根據 slug 查找 .mdx 文件（支援遞歸搜索）
function findPostFile(slug: string): string | null {
  const allPaths = getAllPostPaths();

  // 查找匹配的 .mdx 文件
  for (const relativePath of allPaths) {
    const fileName = path.basename(relativePath, ".mdx");
    if (fileName === slug) {
      return path.join(contentDirectory, relativePath);
    }
  }

  return null;
}

// 獲取 MDX 文件的數據
export async function getMDXPost(slug: string) {
  const filePath = findPostFile(slug);

  if (!filePath || !filePath.endsWith(".mdx")) {
    return null;
  }

  try {
    // 獲取相對於 content 目錄的路徑（用於動態導入）
    const relativePath = path.relative(contentDirectory, filePath);
    const importPath = `@/content/${relativePath.replace(/\\/g, "/")}`;

    const mdxModule = await import(importPath);
    return {
      slug,
      metadata: mdxModule.metadata,
      component: mdxModule.default,
      filePath,
    };
  } catch (error) {
    console.error(`Error loading MDX file for slug ${slug}:`, error);
    return null;
  }
}

// 獲取所有文章（只包括 .mdx），用於列表頁面，不包含 MDX 組件內容
export async function getAllPosts(): Promise<PostListItem[]> {
  const slugs = getAllPostSlugs();
  const posts: PostListItem[] = [];

  for (const slug of slugs) {
    try {
      // 讀取 .mdx 文件
      const mdxPost = await getMDXPost(slug);
      if (mdxPost && mdxPost.metadata) {
        posts.push({
          slug,
          metadata: mdxPost.metadata,
          filePath: mdxPost.filePath,
        });
      }
    } catch (error) {
      console.error(`Error loading post ${slug}:`, error);
    }
  }

  // 過濾掉草稿，並按日期排序
  return posts
    .filter(
      (post) =>
        post.metadata.draft !== true || process.env.NODE_ENV === "development",
    )
    .sort((a, b) => {
      return (
        new Date(b.metadata.pubDate).getTime() -
        new Date(a.metadata.pubDate).getTime()
      );
    });
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const tags = posts
    .map((post) => post.metadata.tags)
    .flat()
    .filter((tag): tag is string => tag !== undefined);
  return Array.from(new Set(tags)).sort();
}

export async function getAllCategories() {
  const posts = await getAllPosts();
  const categories = posts
    .map((post) => post.metadata.categories)
    .flat()
    .filter((category): category is string => category !== undefined);
  return Array.from(new Set(categories)).sort();
}
