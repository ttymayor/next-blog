"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="py-4">
      <Separator className="my-4" />
      <div className="container mx-auto text-center">
        <p className="mb-0">&copy; 2025 市長/tantuyu. All rights reserved.</p>
        <p className="mb-0">
          Built using{" "}
          <Tooltip>
            <TooltipTrigger>
              <Link href="https://nextjs.org" prefetch={false}>
                Next.js
              </Link>
            </TooltipTrigger>
            <TooltipContent>我超愛 Next.js</TooltipContent>
          </Tooltip>
          {". "}
          Deployed on{" "}
          <Link href="https://vercel.com" prefetch={false}>
            Vercel
          </Link>
          .
        </p>
        <p className="mb-0">
          Follow me on{" "}
          <Link href="https://github.com/ttymayor" prefetch={false}>
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
