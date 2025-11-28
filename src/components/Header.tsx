"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useLinkStatus } from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { Noto_Serif_TC } from "next/font/google";
import Image from "next/image";

const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
});

export default function Header() {
  const { pending } = useLinkStatus();

  return (
    <header className="mx-0 p-4 lg:mx-[10%]">
      <div className="mx-auto flex items-center justify-between">
        <h1
          className={`${notoSerifTC.className} mb-0 flex flex-row items-center gap-2 text-2xl font-bold`}
        >
          <Image
            src="/images/tantuyu.jpg"
            alt="logo"
            width={32}
            height={32}
            className="border-primary rounded-full border"
          />
          <Link href="/" className="text-foreground tracking-wide no-underline">
            tantuyu
          </Link>
        </h1>

        <nav className="hidden space-x-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/about" className="text-foreground no-underline">
              {pending ? <Spinner /> : "關於"}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/posts" className="text-foreground no-underline">
              {pending ? <Spinner /> : "文章"}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/categories" className="text-foreground no-underline">
              {pending ? <Spinner /> : "分類"}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/tags" className="text-foreground no-underline">
              {pending ? <Spinner /> : "標籤"}
            </Link>
          </Button>

          {/* ThemeToggle */}
          {/* <ThemeToggle /> */}
        </nav>

        <nav className="flex items-center md:hidden">
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}
