"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="cursor-pointer"
      >
        <MenuIcon className="h-4 w-4" />
      </Button>
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-full backdrop-blur",
          isOpen ? "block" : "hidden",
        )}
        onClick={toggleMenu}
      ></div>
      <div
        className={cn(
          "bg-background fixed top-0 right-0 z-50 h-full w-3/4 max-w-sm transform p-4 shadow-lg transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <h2 className="mb-0 text-lg font-semibold">目錄</h2>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="cursor-pointer"
            >
              <XIcon className="size-4" />
            </Button>
          </div>
        </div>
        <nav className="mt-8 flex flex-col space-y-2">
          <Button variant="ghost" size="lg" onClick={toggleMenu} asChild>
            <Link href="/" className="text-foreground text-lg no-underline">
              首頁
            </Link>
          </Button>
          <Button variant="ghost" size="lg" onClick={toggleMenu} asChild>
            <Link
              href="/about"
              className="text-foreground text-lg no-underline"
            >
              關於
            </Link>
          </Button>
          <Button variant="ghost" size="lg" onClick={toggleMenu} asChild>
            <Link
              href="/posts"
              className="text-foreground text-lg no-underline"
            >
              文章
            </Link>
          </Button>
          <Button variant="ghost" size="lg" onClick={toggleMenu} asChild>
            <Link
              href="/categories"
              className="text-foreground text-lg no-underline"
            >
              分類
            </Link>
          </Button>
          <Button variant="ghost" size="lg" onClick={toggleMenu} asChild>
            <Link href="/tags" className="text-foreground text-lg no-underline">
              標籤
            </Link>
          </Button>
        </nav>
      </div>
    </>
  );
}
