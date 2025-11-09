"use client";

import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">市長/tantuyu</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/about">關於</Link>
            </li>
            <li>
              <Link href="/posts">文章</Link>
            </li>
            <li>
              <Link href="/contact">聯絡</Link>
            </li>
          </ul>
        </nav>

        {/* ThemeToggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
