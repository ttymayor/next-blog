# GEMINI.md: Project Context for Gemini CLI

This document provides essential context about the `next-blog` project, intended for use by the Gemini CLI to understand the project's structure, conventions, and commands.

## Project Overview

This is a modern, feature-rich personal blog built with **Next.js 16** (App Router) and **TypeScript**. The core of the blog is its content system, which uses **MDX** (`.mdx` and `.md` files) for writing posts.

The system is designed for ease of use, automatically scanning the `src/content/` directory recursively to find and display blog posts. This means there's no manual registration of new posts required.

### Key Technologies:

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Content**: MDX with `remark` and `rehype` plugins for extended features like GFM tables, LaTeX math formulas (`remark-math`, `rehype-katex`), and advanced code syntax highlighting (`rehype-prism-plus`).
- **Styling**: Tailwind CSS v4, configured via `postcss.config.mjs`.
- **Linting & Formatting**: ESLint and Prettier (with a Tailwind CSS plugin).
- **Package Manager**: pnpm (inferred from `pnpm-lock.yaml`).

## Building and Running

All commands should be run using `pnpm`.

- **Install Dependencies:**
  ```bash
  pnpm install
  ```

- **Run Development Server:**
  Starts the app on `http://localhost:3000`.
  ```bash
  pnpm dev
  ```

- **Create a Production Build:**
  Bundles the application for production.
  ```bash
  pnpm build
  ```

- **Run Production Server:**
  Starts the production-ready server. Requires a `build` first.
  ```bash
  pnpm start
  ```

- **Lint Code:**
  Checks the codebase for linting errors.
  ```bash
  pnpm lint
  ```

## Development Conventions

### Content Creation

The primary way to add new content is by creating `.mdx` or `.md` files inside the `src/content/` directory.

- **Recommended Method (`.mdx`):**
  Create a file (e.g., `src/content/2024/my-new-post.mdx`) and export metadata directly. The file path determines the URL slug.

  ```mdx
  export const metadata = {
    title: 'Post Title',
    author: 'Your Name',
    date: 'YYYY-MM-DD',
    description: 'A short summary of the post.',
  }

  # Post Title
  Your content here...
  ```

- **New Post Script:**
  A helper script is available to scaffold a new post.
  ```bash
  pnpm new
  ```

### Project Structure

- **`src/app/`**: Contains the main application routes, following the Next.js App Router conventions.
- **`src/components/`**: Houses all reusable React components.
- **`src/content/`**: The source for all blog posts. Files here are automatically processed and rendered.
- **`src/lib/`**: Contains utility functions and shared logic, such as the Markdown processing configuration.
- **`src/mdx-components.tsx`**: Defines custom React components to be used within MDX files, allowing for consistent styling of HTML elements like headings, links, etc.
- **`scripts/`**: Holds Node.js scripts for automating tasks, like `new-post.mjs`.

### Code Style

- **Path Aliases**: The project uses the `@/*` alias, which maps to the `src/` directory (e.g., `import Foo from '@/components/Foo'`).
- **Formatting**: Code is formatted with Prettier. The configuration is in `.prettierrc`.
- **Linting**: ESLint rules are defined in `eslint.config.mjs`.
