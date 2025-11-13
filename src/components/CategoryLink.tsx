"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import LinkStatus from "@/components/LinkStatus";

interface CategoryLinkProps {
  category: string;
}

export default function CategoryLink({ category }: CategoryLinkProps) {
  return (
    <Link
      href={`/categories/${encodeURIComponent(category)}`}
      key={category}
      prefetch={false}
    >
      <Badge variant="secondary" className="rounded-none">
        {category}
        <LinkStatus />
      </Badge>
    </Link>
  );
}
