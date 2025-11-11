"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mx-0 p-4 lg:mx-[10%]">
      <div className="mx-auto flex items-center justify-between">
        <h1 className="mb-0 text-2xl font-bold">
          <Link href="/">市長/tantuyu</Link>
        </h1>

        <nav className="hidden space-x-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/about">關於</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/posts">文章</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact">聯絡</Link>
          </Button>
        </nav>

        {/* ThemeToggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <div className="flex flex-col space-y-2">
      <Button variant="ghost" asChild>
        <Link href="/about">關於</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/posts">文章</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/contact">聯絡</Link>
      </Button>
    </div>
  );
}
