# 語法高亮配置說明

## 🎨 已配置 Prism.js 語法高亮！

您的部落格現在支援美觀的程式碼語法高亮。

## ✨ 功能特色

- ✅ **多語言支援** - JavaScript, TypeScript, Python, Go, Rust 等
- ✅ **行號顯示** - 自動顯示程式碼行號
- ✅ **深色/淺色主題** - 自動適應系統主題
- ✅ **內聯代碼** - 也有特殊樣式
- ✅ **One Dark 主題** - 流行的 VSCode 主題

## 📝 如何使用

### 在 MDX 文件中

使用三個反引號加語言名稱：

````mdx
export const metadata = {
  title: "程式碼示例",
  author: "市長/tantuyu",
  date: "2024-11-10",
  description: "展示語法高亮",
};

# 程式碼示例

這是一個 JavaScript 範例：

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("World");
```

這是一個 TypeScript 範例：

```typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John",
  age: 30,
};
```

這是一個 Python 範例：

```python
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```
````

### 支援的語言

常見語言：

- `javascript` / `js`
- `typescript` / `ts`
- `jsx` / `tsx`
- `python` / `py`
- `java`
- `go`
- `rust`
- `c` / `cpp`
- `csharp` / `cs`
- `php`
- `ruby`
- `swift`
- `kotlin`
- `html`
- `css`
- `scss` / `sass`
- `json`
- `yaml`
- `markdown` / `md`
- `bash` / `shell`
- `sql`
- `graphql`
- `dockerfile`
- 更多...

### 內聯代碼

使用單個反引號：

```mdx
在文字中使用 `const variable = 'value'` 這樣的內聯代碼。
```

顯示效果：在文字中使用 `const variable = 'value'` 這樣的內聯代碼。

## 🎨 主題樣式

### 深色模式（One Dark）

```
背景色：#282c34
文字色：#abb2bf
關鍵字：#c678dd (紫色)
字串：#98c379 (綠色)
函數：#61afef (藍色)
數字：#d19a66 (橙色)
```

### 淺色模式（One Light）

```
背景色：#fafafa
文字色：#383a42
關鍵字：#a626a4 (紫色)
字串：#50a14f (綠色)
函數：#4078f2 (藍色)
數字：#986801 (橙色)
```

## 🔧 技術實現

### 安裝的套件

```json
{
  "dependencies": {
    "rehype-prism-plus": "^2.0.1",
    "prismjs": "^1.x.x"
  }
}
```

### Next.js 配置

```typescript
// next.config.ts
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    rehypePlugins: [
      [
        "rehype-prism-plus",
        {
          ignoreMissing: true, // 忽略未知語言
          showLineNumbers: true, // 顯示行號
        },
      ],
    ],
  },
});
```

### MDX 組件配置

```typescript
// src/mdx-components.tsx
code: ({ children, className }) => {
  // 內聯代碼
  if (!className) {
    return (
      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400">
        {children}
      </code>
    );
  }
  // 程式碼區塊（由 Prism 處理）
  return <code className={className}>{children}</code>;
},
```

### 樣式文件

- `src/styles/prism.css` - Prism.js 主題樣式
- 已在 `src/app/globals.css` 中引入

## 📋 範例

### JavaScript

```javascript
// 非同步函數範例
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// 使用 Promise
fetchData("https://api.example.com/data")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### TypeScript

```typescript
// 泛型函數
function identity<T>(arg: T): T {
  return arg;
}

// 介面定義
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 使用
const response: ApiResponse<User> = {
  data: { name: "John", age: 30 },
  status: 200,
  message: "Success",
};
```

### React/JSX

```jsx
// React 組件
import { useState, useEffect } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Python

```python
# 類定義
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hello, I'm {self.name} and I'm {self.age} years old."

# 列表推導式
squares = [x**2 for x in range(10)]

# 裝飾器
@property
def full_name(self):
    return f"{self.first_name} {self.last_name}"
```

### CSS

```css
/* 現代 CSS 特性 */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;

  /* CSS 變數 */
  --primary-color: #3b82f6;
  --spacing: 1rem;
}

.card {
  background: var(--primary-color);
  padding: var(--spacing);
  border-radius: 0.5rem;

  /* 漸變背景 */
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.8),
    rgba(147, 51, 234, 0.8)
  );
}
```

### JSON

```json
{
  "name": "my-blog",
  "version": "1.0.0",
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "prismjs": "^1.29.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

### Bash/Shell

```bash
#!/bin/bash

# 函數定義
function deploy() {
  echo "Starting deployment..."

  # 建置專案
  npm run build

  # 檢查建置結果
  if [ $? -eq 0 ]; then
    echo "Build successful!"
    # 部署到伺服器
    rsync -avz ./dist/ user@server:/var/www/
  else
    echo "Build failed!"
    exit 1
  fi
}

# 執行部署
deploy
```

## 🎯 最佳實踐

### 1. 選擇正確的語言標識

`````mdx
✅ 正確

````javascript
```typescript
```python

❌ 錯誤
```js  # 應該使用 javascript
```ts  # 應該使用 typescript
```py  # 應該使用 python
````
`````

````

### 2. 保持程式碼簡潔

- 刪除不必要的空行
- 使用有意義的變數名
- 添加適當的註解

### 3. 提供完整範例

```javascript
// ✅ 好的範例：完整且可執行
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5

// ❌ 不好的範例：不完整
function add(a, b) {
  // ...
}
```

### 4. 使用內聯代碼強調

在文字中使用 `變數名`、`函數名()` 或 `類名` 來強調特定元素。

## 🔍 調試

### 檢查語法高亮是否正常

1. 訪問文章頁面
2. 檢查程式碼區塊是否有顏色
3. 檢查行號是否顯示
4. 切換深色/淺色模式測試

### 常見問題

#### 問題：程式碼沒有高亮

**檢查：**

1. 是否指定了語言？
2. 語言名稱是否正確？
3. 是否重新建置了專案？

#### 問題：樣式不正確

**檢查：**

1. `src/styles/prism.css` 是否存在？
2. `globals.css` 是否引入了 Prism 樣式？
3. 清除瀏覽器快取

#### 問題：行號不顯示

**解決：**
確保 `next.config.ts` 中 `showLineNumbers: true`

## 📚 相關資源

- [Prism.js 官方網站](https://prismjs.com/)
- [rehype-prism-plus 文檔](https://github.com/timlrx/rehype-prism-plus)
- [支援的語言列表](https://prismjs.com/#supported-languages)

---

## 🎉 總結

現在您的部落格文章中的程式碼會：

1. ✅ 自動語法高亮
2. ✅ 顯示行號
3. ✅ 適應深色/淺色主題
4. ✅ 支援多種程式語言
5. ✅ 內聯代碼也有特殊樣式

**寫程式碼 → 自動高亮 → 美觀顯示！** 🚀
````
