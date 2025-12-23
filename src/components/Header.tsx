"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { Noto_Serif_TC } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
});

const menuItems = [
  { label: "關於", href: "/about", name: "about" },
  { label: "文章", href: "/posts", name: "posts" },
  { label: "分類", href: "/categories", name: "categories" },
  { label: "標籤", href: "/tags", name: "tags" },
];

export default function Header() {
  const pathname = usePathname().split("/")[1].trim();

  const isActive = (name: string) => pathname == name;

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
            className="border-primary rounded-full border hover:animate-spin"
          />
          <Link href="/" className="text-foreground tracking-wide no-underline">
            tantuyu
          </Link>
        </h1>

        <nav className="hidden space-x-4 md:flex">
          {menuItems.map((item) => (
            <Button key={item.name} variant="ghost" asChild>
              <Link
                href={item.href}
                className={cn("text-foreground no-underline")}
              >
                <div className="relative">
                  {item.label}
                  {isActive(item.name) && (
                    <div className="bg-primary absolute -right-1 -bottom-2 -left-1 h-0.5 rounded-full" />
                  )}
                </div>
              </Link>
            </Button>
          ))}

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
