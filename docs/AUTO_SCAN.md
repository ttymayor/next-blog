# 自動掃描文章功能

## 🎉 現在不需要手動註冊文章了！

系統會自動掃描 `src/content/` 目錄中的所有 `.md` 和 `.mdx` 文件。

## ✨ 工作原理

### 之前（手動註冊）

您需要在 `src/app/posts/[slug]/page.tsx` 中手動添加每個文章：

```typescript
export function generateStaticParams() {
  return [
    { slug: "article-1" },
    { slug: "article-2" },
    { slug: "article-3" },
    // 每次新增文章都要手動添加...
  ];
}
```

### 現在（自動掃描）✅

系統會自動掃描 `src/content/` 目錄：

```typescript
export function generateStaticParams() {
  return getStaticParams(); // 自動掃描所有文件！
}
```

## 📝 如何使用

### 步驟 1：創建文章

只需在 `src/content/` 目錄中創建文件：

**選項 A：創建 `.mdx` 文件**

```mdx
// src/content/my-new-article.mdx
export const metadata = {
title: "我的新文章",
author: "市長/tantuyu",
date: "2024-11-10",
description: "文章描述",
}

# 內容...
```

**選項 B：創建 `.md` 文件**

```markdown
## <!-- src/content/my-new-article.md -->

title: "我的新文章"
author: "市長/tantuyu"
date: "2024-11-10"
description: "文章描述"

---

# 內容...
```

### 步驟 2：就這樣！

沒有步驟 2！文章會自動出現在：

- ✅ 首頁（如果是最新的 3 篇之一）
- ✅ `/posts` 文章列表頁面
- ✅ `/posts/my-new-article` 文章詳情頁面

## 🔍 自動掃描的內容

系統會掃描並自動處理：

1. **文件名** → 轉換為 slug

   - `my-article.mdx` → slug: `my-article`
   - `getting-started.md` → slug: `getting-started`

2. **文件類型** → 自動檢測

   - `.mdx` 文件 → 使用 MDX 處理器
   - `.md` 文件 → 使用 Markdown 處理器

3. **元數據** → 自動提取

   - MDX: 從 `export const metadata` 提取
   - MD: 從 YAML frontmatter 提取

4. **排序** → 按日期自動排序
   - 最新的文章顯示在前面

## 📂 當前掃描到的文章

根據建置輸出，系統自動掃描到：

```
Route (app)
└ ● /posts/[slug]
  ├ /posts/about
  ├ /posts/getting-started-with-nextjs
  ├ /posts/testmd
  ├ /posts/testmdx
  └ /posts/welcome
```

共 5 篇文章，全部自動掃描！

## 🎯 優點

### ✅ 簡化工作流程

- 創建文件 → 立即可用
- 不需要修改任何配置文件
- 不需要手動註冊 slug

### ✅ 減少錯誤

- 不會忘記註冊新文章
- 不會有拼寫錯誤
- 文件名即是 slug

### ✅ 更靈活

- 重命名文件會自動更新 slug
- 刪除文件會自動從列表移除
- 支援 `.md` 和 `.mdx` 混用

### ✅ 開發友好

- 專注於內容創作
- 減少重複工作
- 更快的開發速度

## 🔧 技術實現

### 掃描函數

```typescript
// src/lib/markdown.ts

export function getAllPostSlugs(): string[] {
  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.(md|mdx)$/, ""));
}

export function getStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

### 在頁面中使用

```typescript
// src/app/posts/[slug]/page.tsx

import { getStaticParams } from "@/lib/markdown";

export function generateStaticParams() {
  return getStaticParams(); // 自動掃描！
}
```

## 📋 文件命名規則

### ✅ 好的文件名

- `my-article.mdx` → `/posts/my-article`
- `getting-started.md` → `/posts/getting-started`
- `2024-review.mdx` → `/posts/2024-review`
- `hello-world.md` → `/posts/hello-world`

### ❌ 避免的文件名

- `My Article.mdx` → 包含空格
- `我的文章.md` → 使用非 ASCII 字符（雖然可以工作，但不推薦）
- `article#1.mdx` → 包含特殊字符

### 💡 建議

- 使用小寫字母
- 使用連字符 `-` 分隔單詞
- 避免空格和特殊字符
- 保持簡短且有意義

## 🚀 工作流程示例

### 創建新文章

```bash
# 1. 創建文件
echo 'export const metadata = { ... }' > src/content/my-new-post.mdx

# 2. 開發伺服器會自動重新載入
# 訪問 http://localhost:3000/posts/my-new-post

# 3. 完成！
```

### 重命名文章

```bash
# 1. 重命名文件
mv src/content/old-name.mdx src/content/new-name.mdx

# 2. URL 自動更新
# 從 /posts/old-name 變為 /posts/new-name

# 3. 完成！
```

### 刪除文章

```bash
# 1. 刪除文件
rm src/content/unwanted-post.mdx

# 2. 文章自動從列表中移除

# 3. 完成！
```

## 🔄 動態路由

設置了 `dynamicParams = true`，這意味著：

- ✅ 建置時會預渲染所有掃描到的文章
- ✅ 如果有新文章（未在建置時掃描到），也能正常訪問
- ✅ 適合開發環境的熱重載

如果您想要嚴格模式（只允許預渲染的路由）：

```typescript
export const dynamicParams = false; // 404 for unknown slugs
```

## 📊 統計信息

根據最新建置：

- 📁 掃描目錄：`src/content/`
- 📄 找到文件：5 個
- 📝 `.mdx` 文件：4 個
- 📝 `.md` 文件：1 個
- 🌐 生成路由：5 個

## 🎓 最佳實踐

### 1. 保持目錄整潔

只在 `src/content/` 中放置文章文件。

### 2. 使用有意義的文件名

文件名會成為 URL 的一部分。

### 3. 統一元數據格式

確保所有文章都有完整的元數據。

### 4. 定期檢查

使用 `pnpm build` 檢查所有文章是否正確掃描。

## 🐛 故障排除

### 問題：文章沒有出現

**檢查：**

1. 文件是否在 `src/content/` 目錄中？
2. 文件擴展名是 `.md` 或 `.mdx` 嗎？
3. 元數據格式是否正確？

### 問題：404 錯誤

**檢查：**

1. 文件名和 URL 是否匹配？
2. 是否需要重新啟動開發伺服器？
3. 是否需要重新建置？

### 問題：元數據未顯示

**檢查：**

1. MDX 文件：是否使用 `export const metadata = {...}`？
2. MD 文件：是否使用 YAML frontmatter `---`？
3. 元數據欄位是否完整？

## 📚 相關文檔

- **Markdown 支援** → `MARKDOWN_SUPPORT.md`
- **使用指南** → `USAGE.md`
- **快速開始** → `QUICK_START.md`

---

## 🎉 總結

現在您只需要：

1. ✅ 在 `src/content/` 創建 `.md` 或 `.mdx` 文件
2. ✅ 添加元數據
3. ✅ 撰寫內容
4. ✅ 完成！

**不需要手動註冊，不需要修改配置，一切都是自動的！** 🚀
