# 嵌套目錄結構支援

## 🎉 現在支援 `content/[year]/[month]/[*.md/*.mdx]` 結構！

系統會遞歸掃描 `src/content/` 目錄及其所有子目錄，自動發現所有文章。

## 📂 支援的目錄結構

### 方式 1：扁平結構（原有方式）

```
src/content/
├── article-1.mdx
├── article-2.md
└── article-3.mdx
```

### 方式 2：按年份/月份組織（推薦）

```
src/content/
├── 2024/
│   ├── 11/
│   │   ├── article-1.mdx
│   │   └── article-2.md
│   ├── 10/
│   │   └── article-3.mdx
│   └── 09/
│       └── article-4.md
└── 2023/
    └── 12/
        └── old-article.mdx
```

### 方式 3：混合結構

```
src/content/
├── important-post.mdx          # 根目錄
├── 2024/
│   ├── 11/
│   │   ├── new-post.mdx       # 按日期組織
│   │   └── another-post.md
│   └── 10/
│       └── october-post.mdx
└── drafts/                      # 草稿目錄
    └── draft-post.mdx
```

### 方式 4：自定義結構

```
src/content/
├── tutorials/
│   ├── beginner/
│   │   └── intro.mdx
│   └── advanced/
│       └── deep-dive.mdx
├── blog/
│   └── 2024/
│       └── 11/
│           └── update.mdx
└── guides/
    └── setup.md
```

## ✨ 工作原理

### 遞歸掃描

系統會自動：
1. 掃描 `src/content/` 目錄
2. 遞歸進入所有子目錄
3. 查找所有 `.md` 和 `.mdx` 文件
4. 提取文件名作為 slug
5. 自動生成路由

### URL 生成

**文件路徑** → **URL**

```
src/content/article.mdx
→ /posts/article

src/content/2024/11/my-post.mdx
→ /posts/my-post

src/content/tutorials/beginner/intro.mdx
→ /posts/intro
```

> **注意：** URL 只使用文件名，不包含目錄路徑。這意味著所有文件名必須唯一。

## 🎯 當前結構示例

您的部落格現在使用混合結構：

```
src/content/
├── 2024/
│   └── 11/
│       ├── testmd.md          → /posts/testmd
│       └── testmdx.mdx        → /posts/testmdx
├── about.mdx                  → /posts/about
├── getting-started-with-nextjs.mdx  → /posts/getting-started-with-nextjs
└── welcome.mdx                → /posts/welcome
```

## 📝 使用方式

### 創建按日期組織的文章

```bash
# 創建目錄
mkdir -p src/content/2024/11

# 創建文章
cat > src/content/2024/11/my-new-post.mdx << 'EOF'
export const metadata = {
  title: "我的新文章",
  author: "市長/tantuyu",
  date: "2024-11-10",
  description: "這是一篇新文章",
}

# 內容...
EOF

# 訪問 http://localhost:3000/posts/my-new-post
# 自動掃描並顯示！
```

### 創建分類組織的文章

```bash
# 創建目錄
mkdir -p src/content/tutorials/nextjs

# 創建文章
cat > src/content/tutorials/nextjs/getting-started.mdx << 'EOF'
export const metadata = {
  title: "Next.js 入門",
  author: "市長/tantuyu",
  date: "2024-11-10",
  description: "學習 Next.js 基礎",
}

# 內容...
EOF

# 訪問 http://localhost:3000/posts/getting-started
```

## 🔧 技術實現

### 遞歸掃描函數

```typescript
// src/lib/markdown.ts

function scanDirectory(dir: string, baseDir: string = dir): string[] {
  const results: string[] = [];
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      // 遞歸掃描子目錄
      results.push(...scanDirectory(fullPath, baseDir));
    } else if (item.isFile() && (item.name.endsWith(".md") || item.name.endsWith(".mdx"))) {
      // 獲取相對路徑
      const relativePath = path.relative(baseDir, fullPath);
      results.push(relativePath);
    }
  }
  
  return results;
}
```

### 文件查找

```typescript
function findPostFile(slug: string): string | null {
  const allPaths = getAllPostPaths();
  
  // 查找匹配的文件
  for (const relativePath of allPaths) {
    const fileName = path.basename(relativePath, path.extname(relativePath));
    if (fileName === slug) {
      return path.join(contentDirectory, relativePath);
    }
  }
  
  return null;
}
```

## 📊 建置結果

```
Route (app)
└ ● /posts/[slug]
  ├ /posts/testmd          (from 2024/11/testmd.md)
  ├ /posts/testmdx         (from 2024/11/testmdx.mdx)
  ├ /posts/about           (from about.mdx)
  ├ /posts/getting-started-with-nextjs
  └ /posts/welcome
```

所有文章都被正確掃描，無論它們在哪個目錄！

## 🎯 優點

### ✅ 更好的組織

- 按年份/月份組織文章
- 按類別分組
- 保持根目錄整潔

### ✅ 更容易管理

- 快速找到特定時期的文章
- 分類管理不同類型的內容
- 支援草稿目錄

### ✅ 向後兼容

- 扁平結構仍然有效
- 可以混合使用兩種方式
- 逐步遷移到新結構

### ✅ 自動化

- 無需手動配置
- 自動掃描所有目錄
- 自動生成路由

## 💡 最佳實踐

### 1. 使用有意義的目錄結構

**推薦：**
```
src/content/
├── 2024/11/     # 按日期
├── 2024/10/
└── tutorials/   # 按類別
```

**避免：**
```
src/content/
├── temp/
├── test/
└── random/
```

### 2. 保持文件名唯一

由於 URL 只使用文件名，確保所有文件名不重複：

**好的：**
```
src/content/
├── 2024/11/nextjs-tutorial.mdx
└── 2024/10/react-tutorial.mdx
```

**避免：**
```
src/content/
├── 2024/11/tutorial.mdx     # ❌ 重複
└── 2024/10/tutorial.mdx     # ❌ 重複
```

### 3. 使用清晰的命名

**推薦：**
- `getting-started-with-nextjs.mdx`
- `2024-year-in-review.mdx`
- `how-to-use-react-hooks.mdx`

**避免：**
- `post1.mdx`
- `article.mdx`
- `temp.mdx`

### 4. 統一日期格式

如果使用日期目錄：
```
YYYY/MM/article-name.mdx
2024/11/my-post.mdx
```

## 🚀 遷移現有文章

### 從扁平結構遷移到日期結構

```bash
# 1. 創建目錄結構
mkdir -p src/content/2024/{01..12}
mkdir -p src/content/2023/{01..12}

# 2. 移動文章到對應月份
# 根據文章的日期元數據移動

# 3. 重新建置
pnpm build

# 4. 測試所有文章是否正常
```

### 腳本示例

```bash
#!/bin/bash
# migrate-posts.sh

# 讀取所有 .mdx 文件
for file in src/content/*.mdx; do
  # 提取日期（假設在元數據中）
  date=$(grep "date:" "$file" | cut -d'"' -f2)
  year=$(echo $date | cut -d'-' -f1)
  month=$(echo $date | cut -d'-' -f2)
  
  # 創建目錄
  mkdir -p "src/content/$year/$month"
  
  # 移動文件
  mv "$file" "src/content/$year/$month/"
done
```

## 🔍 調試和故障排除

### 檢查掃描到的文件

添加調試日誌：

```typescript
export function getAllPostPaths(): string[] {
  const paths = scanDirectory(contentDirectory);
  console.log('Found posts:', paths);
  return paths;
}
```

### 檢查文件是否被找到

```bash
# 建置時查看輸出
pnpm build

# 應該看到所有文章被掃描
```

### 常見問題

#### 問題：文章沒有被掃描到

**檢查：**
1. 文件擴展名是 `.md` 或 `.mdx` 嗎？
2. 文件在 `src/content/` 目錄或其子目錄中嗎？
3. 文件權限是否正確？

#### 問題：重複的 slug

**解決：**
確保所有文件名唯一，即使在不同目錄中。

#### 問題：404 錯誤

**檢查：**
1. 文件名和 URL 是否匹配？
2. 是否需要重新建置？
3. 元數據是否正確？

## 📚 相關文檔

- **自動掃描** → `AUTO_SCAN.md`
- **Markdown 支援** → `MARKDOWN_SUPPORT.md`
- **快速開始** → `QUICK_START.md`

---

## 🎉 總結

現在您可以：

1. ✅ 使用任意目錄結構組織文章
2. ✅ 按年份/月份分類
3. ✅ 按主題/類別分類
4. ✅ 混合使用多種結構
5. ✅ 自動掃描所有子目錄

**創建文章 → 放在任何子目錄 → 自動掃描！** 🚀

### 示例工作流程

```bash
# 1. 創建今天的文章
mkdir -p src/content/2024/11
echo 'export const metadata = {...}' > src/content/2024/11/my-post.mdx

# 2. 訪問
# http://localhost:3000/posts/my-post

# 3. 完成！
```

**完全自動化，完全靈活！** ✨

