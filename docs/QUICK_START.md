# 快速開始指南 🚀

## 📍 當前狀態

✅ MDX 部落格已經完全配置完成並可以使用！

## 🌐 訪問部落格

開發伺服器已啟動，請訪問：

**🔗 http://localhost:3000**

## 📄 可用頁面

1. **首頁** - `/`
   - 顯示歡迎信息
   - 展示最新 3 篇文章
   - 技術堆疊介紹

2. **文章列表** - `/posts`
   - 顯示所有文章
   - 按日期排序
   - 美觀的卡片佈局

3. **文章詳情** - `/posts/[slug]`
   - `/posts/welcome` - 歡迎文章
   - `/posts/about` - 關於部落格
   - `/posts/getting-started-with-nextjs` - Next.js 入門指南

## 🎨 功能特色

### ✨ 已實現的功能

- ✅ **MDX 支援** - 在 Markdown 中使用 React 組件
- ✅ **深色模式** - 點擊右上角切換主題
- ✅ **響應式設計** - 支援所有設備尺寸
- ✅ **靜態生成** - 超快的頁面載入速度
- ✅ **SEO 優化** - 完整的元數據
- ✅ **美觀的 UI** - 現代化設計
- ✅ **程式碼高亮** - 支援多種語言
- ✅ **自定義樣式** - 所有 Markdown 元素都有自定義樣式

## 📝 添加新文章（超簡單！）

### 步驟 1：創建文件

在 `src/content/` 創建新文件：

**選項 A：使用 `.mdx` 格式（推薦）**
```mdx
// src/content/my-article.mdx
export const metadata = {
  title: '我的文章標題',
  author: '市長/tantuyu',
  date: '2024-11-10',
  description: '文章簡短描述',
}

# 我的文章標題

這裡是文章內容...
```

**選項 B：使用 `.md` 格式**
```markdown
<!-- src/content/my-article.md -->
---
title: "我的文章標題"
author: "市長/tantuyu"
date: "2024-11-10"
description: "文章簡短描述"
---

# 我的文章標題

這裡是文章內容...
```

### 步驟 2：就這樣！🎉

沒有步驟 2！系統會自動掃描並添加您的文章。

文章會自動出現在：
- ✅ 首頁（如果是最新的 3 篇之一）
- ✅ `/posts` 文章列表頁面
- ✅ `/posts/my-article` 文章詳情頁面

> **提示：** 文件名會成為 URL（例如：`my-article.mdx` → `/posts/my-article`）

### 查看結果

保存後自動重新載入，訪問：
- 首頁查看是否出現在最新文章中
- `/posts` 查看文章列表
- `/posts/my-article` 查看完整文章

## 🛠️ 常用命令

```bash
# 啟動開發伺服器
pnpm dev

# 建置生產版本
pnpm build

# 啟動生產伺服器
pnpm start

# 執行 Linter
pnpm lint
```

## 📚 Markdown 語法範例

### 標題
```markdown
# H1 標題
## H2 標題
### H3 標題
```

### 文字格式
```markdown
**粗體文字**
*斜體文字*
`行內程式碼`
```

### 列表
```markdown
- 無序列表項目 1
- 無序列表項目 2

1. 有序列表項目 1
2. 有序列表項目 2
```

### 連結和圖片
```markdown
[連結文字](https://example.com)
![圖片替代文字](/image.jpg)
```

### 程式碼區塊
````markdown
```javascript
function hello() {
  console.log('Hello, World!');
}
```
````

### 引用
```markdown
> 這是一段引用文字
```

## 🎨 自定義樣式

編輯 `src/mdx-components.tsx` 來修改 Markdown 元素的樣式。

例如，修改 h1 標題：

```tsx
h1: ({ children }) => (
  <h1 className="text-6xl font-bold text-blue-600">
    {children}
  </h1>
),
```

## 🌓 切換主題

點擊頁首右上角的主題切換按鈕，可以在淺色和深色模式之間切換。

## 📱 響應式測試

在瀏覽器中按 F12 打開開發者工具，點擊設備工具欄圖標測試不同設備尺寸。

## 🚀 部署到 Vercel

1. 將專案推送到 GitHub
2. 訪問 [vercel.com](https://vercel.com)
3. 點擊 "Import Project"
4. 選擇你的 GitHub 倉庫
5. 點擊 "Deploy"

就這麼簡單！

## 📖 更多資訊

- **完整文檔**：查看 `README.md`
- **使用指南**：查看 `USAGE.md`
- **實作說明**：查看 `IMPLEMENTATION.md`

## 🎯 下一步

1. ✅ 瀏覽現有文章
2. ✅ 嘗試切換深色模式
3. ✅ 創建你的第一篇文章
4. ✅ 自定義樣式和佈局
5. ✅ 部署到 Vercel

## 💡 提示

- 開發伺服器支援熱重載，保存文件後會自動刷新
- 所有頁面都是靜態生成的，載入速度非常快
- MDX 支援在 Markdown 中使用任何 React 組件
- 使用 TypeScript 可以獲得更好的開發體驗

## 🆘 需要幫助？

- 查看文檔文件
- 訪問 [Next.js 文檔](https://nextjs.org/docs)
- 訪問 [MDX 文檔](https://mdxjs.com/)

---

**🎉 開始你的部落格之旅吧！**

