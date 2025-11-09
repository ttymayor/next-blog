# Markdown 和 MDX 支援說明

## ✅ 是的，您可以同時使用 `.md` 和 `.mdx` 文件！

這個部落格現在支援兩種格式：

### 📝 `.md` 格式（傳統 Markdown）

使用 YAML frontmatter：

```markdown
---
title: "文章標題"
author: "作者名稱"
date: "2024-11-10"
description: "文章描述"
---

# 文章內容

這是一篇使用傳統 Markdown 格式的文章。
```

**優點：**
- ✅ 熟悉的 YAML frontmatter 語法
- ✅ 與其他 Markdown 編輯器相容
- ✅ 簡單直接

**限制：**
- ❌ 不能使用 React 組件
- ❌ 不能導入其他模組

### 🚀 `.mdx` 格式（推薦）

使用 JavaScript exports：

```mdx
export const metadata = {
  title: "文章標題",
  author: "作者名稱",
  date: "2024-11-10",
  description: "文章描述",
}

# 文章內容

這是一篇使用 MDX 格式的文章。

import { Button } from '@/components/ui/button'

<Button>這是一個 React 組件！</Button>
```

**優點：**
- ✅ 可以使用 React 組件
- ✅ 可以導入任何模組
- ✅ 更強大和靈活
- ✅ 支援 JSX 語法

**限制：**
- ⚠️ 需要學習新的元數據語法

## 📂 如何使用

### 創建 `.md` 文件

1. 在 `src/content/` 目錄創建文件，例如 `my-post.md`
2. 使用 YAML frontmatter 添加元數據
3. 撰寫 Markdown 內容

```markdown
---
title: "我的 Markdown 文章"
author: "市長/tantuyu"
date: "2024-11-10"
description: "這是一篇純 Markdown 文章"
---

# 標題

內容...
```

### 創建 `.mdx` 文件

1. 在 `src/content/` 目錄創建文件，例如 `my-post.mdx`
2. 使用 JavaScript exports 添加元數據
3. 撰寫 MDX 內容（可以包含 React 組件）

```mdx
export const metadata = {
  title: "我的 MDX 文章",
  author: "市長/tantuyu",
  date: "2024-11-10",
  description: "這是一篇 MDX 文章",
}

# 標題

內容...

<CustomComponent />
```

### 添加到網站

無論使用 `.md` 還是 `.mdx`，都需要在 `src/app/posts/[slug]/page.tsx` 的 `generateStaticParams` 中添加 slug：

```typescript
export function generateStaticParams() {
  return [
    { slug: "my-post" },  // 會自動檢測是 .md 還是 .mdx
    // ... 其他文章
  ];
}
```

## 🔄 自動檢測機制

系統會自動檢測文件類型：

1. 首先嘗試讀取 `.md` 文件
2. 如果找不到，則讀取 `.mdx` 文件
3. 兩種格式都能正確顯示

## 📊 當前文章列表

您的部落格現在包含：

- ✅ `test.md` - Markdown 格式（YAML frontmatter）
- ✅ `getting-started-with-nextjs.mdx` - MDX 格式
- ✅ `welcome.mdx` - MDX 格式
- ✅ `about.mdx` - MDX 格式

## 🎨 樣式支援

兩種格式都支援相同的樣式：

- 標題（H1-H6）
- 段落
- 列表（有序和無序）
- 連結
- 圖片
- 程式碼區塊
- 引用
- 粗體和斜體

所有樣式都在 `src/mdx-components.tsx` 中定義。

## 🔧 技術實作

### `.md` 文件處理

使用 `gray-matter` 解析 YAML frontmatter：

```typescript
import matter from "gray-matter";

const fileContents = fs.readFileSync(mdPath, "utf8");
const { data, content } = matter(fileContents);
```

使用 `remark` 和 `remark-html` 轉換為 HTML：

```typescript
import { remark } from "remark";
import html from "remark-html";

const processedContent = await remark()
  .use(html)
  .process(content);
```

### `.mdx` 文件處理

使用動態導入：

```typescript
const { default: Post, metadata } = await import(`@/content/${slug}.mdx`);
```

## 📝 建議

### 什麼時候使用 `.md`？

- 簡單的文字內容
- 不需要互動功能
- 從其他平台遷移的文章
- 想要使用熟悉的 YAML frontmatter

### 什麼時候使用 `.mdx`？

- 需要嵌入 React 組件
- 需要互動功能
- 想要更強大的功能
- 新創建的文章（推薦）

## 🚀 範例

### 簡單文章 → 使用 `.md`

```markdown
---
title: "關於我"
author: "市長/tantuyu"
date: "2024-11-10"
description: "個人介紹"
---

# 關於我

我是一位開發者...
```

### 互動文章 → 使用 `.mdx`

```mdx
export const metadata = {
  title: "互動式教學",
  author: "市長/tantuyu",
  date: "2024-11-10",
  description: "包含互動元素的教學",
}

import { Counter } from '@/components/Counter'

# 互動式教學

試試這個計數器：

<Counter />
```

## 🎯 總結

- ✅ **支援 `.md`** - 使用 YAML frontmatter
- ✅ **支援 `.mdx`** - 使用 JavaScript exports
- ✅ **自動檢測** - 系統會自動判斷文件類型
- ✅ **相同樣式** - 兩種格式使用相同的樣式
- ✅ **靈活選擇** - 根據需求選擇合適的格式

**推薦：** 新文章使用 `.mdx` 格式以獲得更多功能！

---

如有問題，請參考 `USAGE.md` 或 `README.md`。

