"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useLinkStatus } from "next/link";
import { Spinner } from "@/components/ui/spinner";

export default function Header() {
  const { pending } = useLinkStatus();

  return (
    <header className="mx-0 p-4 lg:mx-[10%]">
      <div className="mx-auto flex items-center justify-between">
        <h1 className="mb-0 text-2xl font-bold">
          <Link
            href="/"
            className="text-foreground no-underline"
            prefetch={false}
          >
            市長/tantuyu
          </Link>
        </h1>

        <nav className="hidden space-x-4 md:flex">
          <Button variant="ghost" asChild>
            <Link
              href="/about"
              className="text-foreground no-underline"
              prefetch={false}
            >
              {pending ? <Spinner /> : "關於"}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link
              href="/posts"
              className="text-foreground no-underline"
              prefetch={false}
            >
              {pending ? <Spinner /> : "文章"}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link
              href="/categories"
              className="text-foreground no-underline"
              prefetch={false}
            >
              {pending ? <Spinner /> : "分類"}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link
              href="/tags"
              className="text-foreground no-underline"
              prefetch={false}
            >
              {pending ? <Spinner /> : "標籤"}
            </Link>
          </Button>

          {/* ThemeToggle */}
          <ThemeToggle />
        </nav>

        <nav className="flex items-center md:hidden">
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}
