# 程式碼區塊標題功能

## 🎯 已添加 rehype-code-titles！

現在您可以為程式碼區塊添加標題，讓讀者更容易理解程式碼的來源和用途。

## 📝 如何使用

### 基本語法

在程式碼區塊的語言標識後添加 `:title=檔案名`：

````mdx
```javascript:title=src/app.js
function hello() {
  console.log('Hello, World!');
}
```
````

### 效果展示

上面的程式碼會產生一個帶標題的程式碼區塊：

```
┌─ src/app.js ─────────────┐
│                          │
│ function hello() {       │
│   console.log('Hi');     │
│ }                        │
│                          │
└──────────────────────────┘
```

## 🎨 範例

### JavaScript 文件

````mdx
```javascript:title=components/Button.jsx
export function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}
```
````

### TypeScript 文件

````mdx
```typescript:title=types/user.ts
interface User {
  id: number;
  name: string;
  email: string;
}

export type { User };
```
````

### CSS 文件

````mdx
```css:title=styles/button.css
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: #3b82f6;
  color: white;
}

.btn:hover {
  background: #2563eb;
}
```
````

### 配置文件

````mdx
```json:title=package.json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}
```
````

### Shell 腳本

````mdx
```bash:title=scripts/deploy.sh
#!/bin/bash

echo "Building application..."
npm run build

echo "Deploying to production..."
rsync -avz ./dist/ user@server:/var/www/
```
````

### Python 文件

````mdx
```python:title=utils/helper.py
def calculate_sum(numbers):
    """計算數字列表的總和"""
    return sum(numbers)

def calculate_average(numbers):
    """計算數字列表的平均值"""
    return sum(numbers) / len(numbers)
```
````

## 🎯 使用場景

### 1. 顯示文件路徑

````mdx
```typescript:title=src/lib/api.ts
export async function fetchData(url: string) {
  const response = await fetch(url);
  return response.json();
}
```
````

### 2. 區分不同文件

````mdx
前端組件：

```jsx:title=components/UserCard.jsx
export function UserCard({ user }) {
  return <div>{user.name}</div>;
}
```

後端 API：

```javascript:title=api/users.js
export async function getUser(id) {
  return await db.users.findById(id);
}
```
````

### 3. 顯示命令提示符

````mdx
```bash:title=Terminal
npm install react react-dom
npm run dev
```
````

### 4. 多步驟教學

````mdx
步驟 1：創建組件

```jsx:title=components/Header.jsx
export function Header() {
  return <header>My App</header>;
}
```

步驟 2：使用組件

```jsx:title=app/page.jsx
import { Header } from '@/components/Header';

export default function Page() {
  return (
    <>
      <Header />
      <main>Content</main>
    </>
  );
}
```
````

## 🎨 標題樣式

### 當前樣式

標題使用深色背景，與程式碼區塊無縫連接：

```css
.rehype-code-title {
  margin-top: 1.5rem;
  margin-bottom: -0.5rem;
  padding: 0.5rem 1rem;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 0.875rem;
  font-weight: 600;
  color: #abb2bf;
  background: #21252b;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border: 1px solid #3e4451;
  border-bottom: none;
}
```

### 視覺效果

```
┌─────────────────────────┐  ← 標題欄（深色背景）
│ src/components/App.jsx  │
├─────────────────────────┤  ← 無縫連接
│                         │
│ function App() {        │  ← 程式碼區塊
│   return <div>Hi</div>; │
│ }                       │
│                         │
└─────────────────────────┘
```

## 💡 最佳實踐

### 1. 使用清晰的文件路徑

✅ **好的：**

````mdx
```typescript:title=src/lib/utils/formatDate.ts
export function formatDate(date: Date) {
  return date.toISOString();
}
```
````

❌ **不好的：**

````mdx
```typescript:title=file.ts
export function formatDate(date: Date) {
  return date.toISOString();
}
```
````

### 2. 標題簡潔明瞭

✅ **好的：**

````mdx
````javascript:title=config.js
```bash:title=Terminal
```json:title=package.json
````
````

❌ **避免過長：**

````mdx
```javascript:title=src/app/components/features/user/profile/settings/config.js

```
````

### 3. 配合說明文字

````mdx
創建主組件：

```jsx:title=App.jsx
export default function App() {
  return <div>Hello</div>;
}
```

添加樣式：

```css:title=App.css
div {
  color: blue;
}
```
````

### 4. 多文件對比

````mdx
**開發環境配置：**

```javascript:title=.env.development
API_URL=http://localhost:3000
DEBUG=true
```

**生產環境配置：**

```javascript:title=.env.production
API_URL=https://api.example.com
DEBUG=false
```
````

## 🔧 技術實現

### 安裝

```bash
pnpm add rehype-code-titles
```

### Next.js 配置

```typescript
// next.config.ts
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
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
```

> **重要：** `rehype-code-titles` 必須在 `rehype-prism-plus` 之前！

### CSS 樣式

在 `src/styles/prism.css` 中添加：

```css
/* 程式碼標題樣式 */
.rehype-code-title {
  margin-top: 1.5rem;
  margin-bottom: -0.5rem;
  padding: 0.5rem 1rem;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 0.875rem;
  font-weight: 600;
  color: #abb2bf;
  background: #21252b;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border: 1px solid #3e4451;
  border-bottom: none;
}

/* 有標題的程式碼區塊需要移除上圓角 */
.rehype-code-title + pre {
  margin-top: 0 !important;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
```

## 📊 完整範例

### 在實際文章中使用

````mdx
export const metadata = {
  title: "React Hooks 教學",
  author: "市長/tantuyu",
  date: "2024-11-10",
  description: "學習 React Hooks",
};

# React Hooks 教學

## useState 範例

首先，我們創建一個計數器組件：

```jsx:title=components/Counter.jsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

然後在主頁面中使用：

```jsx:title=app/page.jsx
import { Counter } from '@/components/Counter';

export default function Page() {
  return (
    <main>
      <h1>我的應用</h1>
      <Counter />
    </main>
  );
}
```

## 樣式設置

為計數器添加樣式：

```css:title=components/Counter.module.css
.counter {
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.button:hover {
  background: #2563eb;
}
```
````

## 🎉 總結

現在您可以：

1. ✅ 為程式碼區塊添加標題
2. ✅ 顯示文件路徑
3. ✅ 區分不同來源的程式碼
4. ✅ 提升文章的可讀性
5. ✅ 創建更專業的技術文章

### 語法回顧

````
```語言:title=標題
程式碼內容
````

`````

### 範例

````mdx
```javascript:title=app.js
console.log('Hello, World!');
`````

```typescript:title=types.ts
interface User {
  name: string;
}
```

```bash:title=Terminal
npm install
```

```

**讓您的程式碼區塊更具說明性！** 🚀

```
