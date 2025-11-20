"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useVercount } from "vercount-react";
import { icons } from "@/lib/icon";

export default function Footer() {
  const { sitePv, pagePv, siteUv } = useVercount();

  return (
    <footer className="py-4">
      <Separator className="my-4" />
      <div className="container mx-auto text-center">
        <p className="mb-0">
          &copy; 2025{" "}
          <Tooltip>
            <TooltipTrigger className="underline">市長/tantuyu</TooltipTrigger>
            <TooltipContent>
              {sitePv} 總訪問，{pagePv} 頁面訪問，{siteUv} 獨立訪客
            </TooltipContent>
          </Tooltip>
          . All rights reserved.
        </p>
        <p className="mb-0">
          Built using{" "}
          {icons["Next.js"]({ className: "mr-1 inline-block size-6" })}
          <Tooltip>
            <TooltipTrigger>
              <Link
                href="https://nextjs.org"
                prefetch={false}
                className="underline"
              >
                Next.js
              </Link>
            </TooltipTrigger>
            <TooltipContent>我超愛 Next.js</TooltipContent>
          </Tooltip>
          {". "}
          Deployed on {icons.Vercel({ className: "mr-1 inline-block size-6" })}
          <Link
            href="https://vercel.com"
            prefetch={false}
            className="underline"
          >
            Vercel
          </Link>
          .
        </p>
        <p className="mb-0">
          Follow me on {icons.GitHub({ className: "mr-1 inline-block size-6" })}
          <Link
            href="https://github.com/ttymayor"
            prefetch={false}
            className="underline"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
