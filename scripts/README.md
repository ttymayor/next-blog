# 文章管理腳本

## 創建新文章

使用以下指令創建新文章：

```bash
pnpm new
```

### 互動式問題

腳本會詢問以下問題：

1. **文章標題**（必填）
   - 文章的主標題

2. **文章描述**（可選）
   - 文章的簡短描述，用於 SEO 和文章列表

3. **分類**（可選）
   - 文章的分類，例如：「資訊安全」、「Web 開發」等

4. **標籤**（可選）
   - 用逗號分隔的標籤，例如：`Next.js, React, TypeScript`

5. **設為草稿？**
   - 選擇 `Yes` 則文章不會顯示在文章列表中
   - 選擇 `No` 則文章會立即發布

6. **選擇 metadata 格式**
   - **YAML frontmatter**（推薦）：使用 `---` 包裹的 YAML 格式
   - **JavaScript export**：使用 `export const metadata = {...}` 格式

7. **選擇文件結構**
   - **按年月分類**：文件會保存在 `src/content/YYYY/MM/filename.mdx`
   - **根目錄**：文件會保存在 `src/content/filename.mdx`

8. **文件名**（可選）
   - 留空則自動從標題生成 URL 友好的文件名

### 範例

#### 範例 1：完整配置

```
文章標題：如何使用 Next.js 建立部落格
文章描述：詳細介紹如何使用 Next.js 和 MDX 建立現代化的部落格系統
分類：Web 開發
標籤：Next.js, React, MDX, 部落格
設為草稿？No
選擇 metadata 格式：YAML frontmatter (推薦)
選擇文件結構：按年月分類
文件名：（留空，自動生成）
```

生成的文件：`src/content/2025/11/how-to-build-blog-with-nextjs.mdx`

內容：
```yaml
---
title: '如何使用 Next.js 建立部落格'
description: '詳細介紹如何使用 Next.js 和 MDX 建立現代化的部落格系統'
pubDate: '2025-11-11T14:30:00+08:00'
tags: ['Next.js', 'React', 'MDX', '部落格']
categories: 'Web 開發'
---

# 如何使用 Next.js 建立部落格

在這裡開始撰寫您的文章內容...
```

#### 範例 2：最小配置

```
文章標題：我的第一篇文章
文章描述：（留空）
分類：（留空）
標籤：（留空）
設為草稿？No
選擇 metadata 格式：YAML frontmatter (推薦)
選擇文件結構：按年月分類
文件名：（留空）
```

生成的文件：`src/content/2025/11/my-first-article.mdx`

內容：
```yaml
---
title: '我的第一篇文章'
pubDate: '2025-11-11T14:30:00+08:00'
---

# 我的第一篇文章

在這裡開始撰寫您的文章內容...
```

### 功能特點

- ✅ 自動生成當前時間（台北時區 +08:00）
- ✅ 自動從標題生成 URL 友好的文件名
- ✅ 支援 YAML frontmatter 和 JavaScript export 兩種格式
- ✅ 支援按年月分類或放在根目錄
- ✅ 自動創建不存在的目錄
- ✅ 檢查文件是否已存在，避免覆蓋
- ✅ 包含基本的 Markdown 模板

### 注意事項

- 所有欄位除了「文章標題」和「發布日期」外都是可選的
- 文件名會自動轉換為小寫並移除特殊字符
- 如果文件已存在，腳本會報錯並退出，不會覆蓋現有文件
- 草稿文章（`draft: true`）不會顯示在文章列表中

