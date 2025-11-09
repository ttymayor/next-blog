# 使用指南

## 🎯 快速開始

### 1. 啟動開發伺服器

```bash
pnpm dev
```

然後在瀏覽器中打開 [http://localhost:3000](http://localhost:3000)

### 2. 查看現有文章

- 首頁：顯示最新的 3 篇文章
- `/posts`：顯示所有文章列表
- `/posts/[slug]`：顯示單篇文章內容

## 📝 新增文章

### 步驟 1：創建 MDX 文件

在 `src/content/` 目錄中創建新的 `.mdx` 文件，例如 `my-new-post.mdx`：

```mdx
export const metadata = {
  title: '我的新文章',
  author: '市長/tantuyu',
  date: '2024-11-10',
  description: '這是一篇關於 Next.js 的文章',
}

# 我的新文章

這是文章的內容...

## 子標題

更多內容...

### 程式碼範例

```javascript
console.log('Hello, World!');
```

### 列表

- 項目 1
- 項目 2
- 項目 3

### 連結

[Next.js 官網](https://nextjs.org)
```

### 步驟 2：更新文章列表

在以下三個文件中添加新文章：

#### 1. `src/app/page.tsx`

找到 `getLatestPosts` 函數，添加新文章：

```typescript
async function getLatestPosts() {
  const posts = [
    { slug: "my-new-post", metadata: (await import("@/content/my-new-post.mdx")).metadata },
    { slug: "getting-started-with-nextjs", metadata: (await import("@/content/getting-started-with-nextjs.mdx")).metadata },
    // ... 其他文章
  ];
  // ...
}
```

#### 2. `src/app/posts/page.tsx`

找到 `getAllPosts` 函數，添加新文章：

```typescript
async function getAllPosts() {
  const posts = [
    { slug: "my-new-post", metadata: (await import("@/content/my-new-post.mdx")).metadata },
    { slug: "getting-started-with-nextjs", metadata: (await import("@/content/getting-started-with-nextjs.mdx")).metadata },
    // ... 其他文章
  ];
  // ...
}
```

#### 3. `src/app/posts/[slug]/page.tsx`

找到 `generateStaticParams` 函數，添加新文章的 slug：

```typescript
export function generateStaticParams() {
  return [
    { slug: "my-new-post" },
    { slug: "getting-started-with-nextjs" },
    // ... 其他文章
  ];
}
```

### 步驟 3：查看結果

保存文件後，開發伺服器會自動重新載入。訪問：

- 首頁：查看新文章是否出現在最新文章列表中
- `/posts`：查看所有文章列表
- `/posts/my-new-post`：查看新文章的完整內容

## 🎨 自定義樣式

### 修改 MDX 組件樣式

編輯 `src/mdx-components.tsx` 來自定義 Markdown 元素的樣式：

```tsx
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-5xl font-bold mb-6 text-blue-600">
      {children}
    </h1>
  ),
  // 自定義其他元素...
};
```

### 修改頁面佈局

- **首頁**：編輯 `src/app/page.tsx`
- **文章列表**：編輯 `src/app/posts/page.tsx`
- **文章詳情**：編輯 `src/app/posts/[slug]/page.tsx`
- **全局佈局**：編輯 `src/app/layout.tsx`

## 🌓 主題切換

部落格支援深色模式和淺色模式。主題切換按鈕位於頁首右側。

要自定義主題，編輯 `src/app/globals.css` 中的 CSS 變數。

## 📦 MDX 功能

### 使用 React 組件

在 MDX 文件中，你可以導入和使用 React 組件：

```mdx
import { Button } from '@/components/ui/button'

# 我的文章

這是一個按鈕：

<Button>點擊我</Button>
```

### 支援的 Markdown 語法

- **粗體**：`**文字**` 或 `__文字__`
- *斜體*：`*文字*` 或 `_文字_`
- `程式碼`：\`程式碼\`
- [連結](url)：`[文字](url)`
- 圖片：`![替代文字](url)`
- 標題：`# H1`、`## H2`、`### H3` 等
- 列表：`-` 或 `1.`
- 引用：`> 引用文字`
- 程式碼區塊：\`\`\`語言\n程式碼\n\`\`\`

## 🚀 部署

### 部署到 Vercel

1. 將專案推送到 GitHub
2. 訪問 [Vercel](https://vercel.com)
3. 點擊 "Import Project"
4. 選擇你的 GitHub 倉庫
5. Vercel 會自動檢測 Next.js 並進行部署

### 環境變數

如果需要環境變數，在 Vercel 的專案設置中添加：

- `NEXT_PUBLIC_SITE_URL`：網站 URL
- 其他需要的環境變數

## 🔧 常見問題

### Q: 如何添加圖片？

A: 將圖片放在 `public/` 目錄中，然後在 MDX 中使用：

```mdx
![圖片描述](/image.jpg)
```

或使用 Next.js 的 Image 組件：

```mdx
import Image from 'next/image'

<Image src="/image.jpg" alt="描述" width={800} height={600} />
```

### Q: 如何修改文章排序？

A: 文章按日期排序（最新的在前）。修改 MDX 文件中的 `date` 欄位即可。

### Q: 如何添加標籤或分類？

A: 在 `metadata` 中添加 `tags` 或 `category` 欄位，然後修改相關頁面來顯示和過濾。

### Q: 如何添加評論功能？

A: 可以整合第三方評論系統，如：
- Disqus
- Giscus（基於 GitHub Discussions）
- Utterances（基於 GitHub Issues）

## 📚 進階功能

### 添加語法高亮

安裝 `rehype-pretty-code`：

```bash
pnpm add rehype-pretty-code
```

在 `next.config.ts` 中配置：

```typescript
const withMDX = createMDX({
  options: {
    rehypePlugins: [
      [rehypePrettyCode, { theme: 'github-dark' }]
    ],
  },
});
```

### 添加閱讀時間估算

創建一個工具函數來計算閱讀時間：

```typescript
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
```

### 添加目錄（Table of Contents）

安裝 `remark-toc`：

```bash
pnpm add remark-toc
```

在 `next.config.ts` 中配置：

```typescript
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkToc],
  },
});
```

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📞 支援

如有問題，請：
1. 查看文檔
2. 搜尋現有 Issues
3. 創建新 Issue

---

祝您使用愉快！🎉

