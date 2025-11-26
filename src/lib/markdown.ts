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
async function scanDirectory(
  dir: string,
  baseDir: string = dir,
): Promise<string[]> {
  const results: string[] = [];

  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        // 遞歸掃描子目錄
        results.push(...(await scanDirectory(fullPath, baseDir)));
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
export async function getAllPostPaths(): Promise<string[]> {
  "use cache";

  try {
    return await scanDirectory(contentDirectory);
  } catch (error) {
    console.error("Error reading content directory:", error);
    return [];
  }
}

// 獲取所有文章的 slugs（從文件名提取）
export async function getAllPostSlugs(): Promise<string[]> {
  "use cache";

  const paths = await getAllPostPaths();
  return paths.map((filePath) => {
    // 從路徑中提取文件名作為 slug
    const fileName = path.basename(filePath, path.extname(filePath));
    return fileName;
  });
}

// 為 generateStaticParams 生成參數
export async function getStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 根據 slug 查找 .mdx 文件（支援遞歸搜索）
async function findPostFile(slug: string): Promise<string | null> {
  "use cache";

  const allPaths = await getAllPostPaths();

  // 查找匹配的 .mdx 文件
  for (const relativePath of allPaths) {
    const fileName = path.basename(relativePath, ".mdx");
    if (fileName === slug) {
      return path.join(contentDirectory, relativePath);
    }
  }

  return null;
}

// 標題結構類型
export type Heading = {
  level: number;
  text: string;
  id: string;
};

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

// 從文本生成錨點 ID
function generateId(text: string): string {
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

// 從 MDX 原始內容提取標題
export async function extractHeadings(content: string): Promise<Heading[]> {
  const headings: Heading[] = [];
  const idCounts: Record<string, number> = {}; // 追蹤每個 ID 的使用次數
  // 匹配 h2-h6 標題（跳過 h1，因為那是文章標題）
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    let id = generateId(text);

    // 處理重複的 ID：如果 ID 已存在，添加數字後綴
    if (idCounts[id] !== undefined) {
      idCounts[id]++;
      id = `${id}-${idCounts[id]}`;
    } else {
      idCounts[id] = 0;
    }

    headings.push({ level, text, id });
  }

  return headings;
}

// 獲取 MDX 文件的數據
export async function getMDXPost(slug: string) {
  const filePath = await findPostFile(slug);

  if (!filePath || !filePath.endsWith(".mdx")) {
    return null;
  }

  try {
    // 讀取原始文件內容以提取標題
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const headings = await extractHeadings(rawContent);

    // 獲取相對於 content 目錄的路徑（用於動態導入）
    const relativePath = path.relative(contentDirectory, filePath);
    const importPath = `@/content/${relativePath.replace(/\\/g, "/")}`;

    const mdxModule = await import(importPath);
    return {
      slug,
      metadata: mdxModule.metadata,
      component: mdxModule.default,
      filePath,
      headings,
    };
  } catch (error) {
    console.error(`Error loading MDX file for slug ${slug}:`, error);
    return null;
  }
}

// 獲取所有文章（只包括 .mdx），用於列表頁面，不包含 MDX 組件內容
export async function getAllPosts(): Promise<PostListItem[]> {
  "use cache";

  const slugs = await getAllPostSlugs();
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

  // 過濾掉草稿，並按日期排序，如果是在開發環境，則不過濾草稿
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

// 獲取所有標籤，回傳值為 Tag name, Tag Count
export type Tag = {
  name: string;
  count: number;
};

export async function getAllTags(sorted: boolean = false): Promise<Tag[]> {
  "use cache";

  const posts = await getAllPosts();
  const tags: Tag[] = [];
  for (const post of posts) {
    if (post.metadata.tags) {
      for (const tag of post.metadata.tags) {
        const existingTag = tags.find((t) => t.name === tag);
        if (existingTag) {
          existingTag.count++;
        } else {
          tags.push({ name: tag, count: 1 });
        }
      }
    }
  }
  return sorted ? tags.sort((a, b) => b.count - a.count) : tags;
}

export async function getAllCategories() {
  "use cache";

  const posts = await getAllPosts();
  const categories = posts
    .map((post) => post.metadata.categories)
    .flat()
    .filter((category): category is string => category !== undefined);
  return Array.from(new Set(categories)).sort();
}
