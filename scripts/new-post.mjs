#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 獲取當前日期時間（台北時區）
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return {
    year,
    month,
    day,
    dateTime: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+08:00`,
  };
}

// 生成 slug（將標題轉換為 URL 友好的格式）
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // 移除特殊字符
    .replace(/\s+/g, "-") // 空格轉為連字符
    .replace(/--+/g, "-") // 多個連字符轉為單個
    .trim();
}

async function main() {
  console.log("📝 創建新文章\n");

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "filename",
      message: "文件名（不含副檔名，留空則使用標題生成）：",
    },
    {
      type: "input",
      name: "title",
      message: "文章標題：",
      validate: (input) => input.trim() !== "" || "標題不能為空",
    },
    {
      type: "input",
      name: "description",
      message: "文章描述（可選）：",
    },
    {
      type: "input",
      name: "categories",
      message: "分類（可選）：",
    },
    {
      type: "input",
      name: "tags",
      message: "標籤（用逗號分隔，可選）：",
    },
    {
      type: "select",
      name: "draft",
      message: "設為草稿？",
      choices: [
        { name: "是", value: true },
        { name: "否", value: false },
      ],
      default: true,
    },
  ]);

  const { year, month, dateTime } = getCurrentDateTime();

  // 處理標籤
  const tags = answers.tags
    ? answers.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
    : [];

  // 生成文件名
  const filename = answers.filename.trim() || generateSlug(answers.title);

  // 決定文件路徑
  const contentDir = path.join(process.cwd(), "src", "content");
  let filePath;

  try {
    const yearMonthDir = path.join(contentDir, year.toString(), month);
    if (!fs.existsSync(yearMonthDir)) {
      fs.mkdirSync(yearMonthDir, { recursive: true });
    }
    filePath = path.join(yearMonthDir, `${filename}.mdx`);
  } catch (error) {
    console.error(`\n❌ 錯誤：${error}`);
    process.exit(1);
  }

  // 檢查文件是否已存在
  if (fs.existsSync(filePath)) {
    console.error(`\n❌ 錯誤：文件已存在：${filePath}`);
    process.exit(1);
  }

  // 生成 metadata
  let metadataContent;

  metadataContent = `export const metadata = {
  title: '${answers.title}',`;

  if (answers.description) {
    metadataContent += `\n  description: '${answers.description}',`;
  }

  metadataContent += `\n  pubDate: '${dateTime}',`;

  if (tags.length > 0) {
    metadataContent += `\n  tags: [${tags.map((tag) => `'${tag}'`).join(", ")}],`;
  }

  if (answers.categories) {
    metadataContent += `\n  categories: '${answers.categories}',`;
  }

  if (answers.draft) {
    metadataContent += `\n  draft: true,`;
  }

  metadataContent += `\n}`;

  // 生成完整文件內容
  const fileContent = `${metadataContent}

## 小節標題

您可以使用 Markdown 語法來撰寫文章。

### 程式碼範例

\`\`\`javascript:example.js
function hello() {
  console.log('Hello, World!');
}
\`\`\`

### 列表

- 項目 1
- 項目 2
- 項目 3

### 引用

> 這是一段引用文字。

`;

  // 寫入文件
  fs.writeFileSync(filePath, fileContent, "utf-8");

  console.log(`\n✅ 文章創建成功！`);
  console.log(`📄 文件位置：${filePath}`);
  console.log(`\n您現在可以開始編輯文章了！`);
}

main().catch((error) => {
  console.error("❌ 發生錯誤：", error);
  process.exit(1);
});
