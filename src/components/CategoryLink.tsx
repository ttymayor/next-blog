"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import LinkStatus from "@/components/LinkStatus";

interface CategoryLinkProps {
  category: string;
  link?: boolean;
}

export default function CategoryLink({
  category,
  link = true,
}: CategoryLinkProps) {
  return link ? (
    <Link
      href={`/categories/${encodeURIComponent(category)}`}
      key={category}
      prefetch={false}
    >
      <Badge variant="secondary" className="hover:text-primary rounded-none">
        {category}
        <LinkStatus />
      </Badge>
    </Link>
  ) : (
    <Badge variant="secondary" className="rounded-none no-underline">
      {category}
    </Badge>
  );
}
