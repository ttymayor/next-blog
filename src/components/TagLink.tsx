"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import LinkStatus from "@/components/LinkStatus";

interface TagLinkProps {
  link?: boolean;
  tag: string;
  count?: number;
}

export default function TagLink({ link = true, tag, count }: TagLinkProps) {
  return link ? (
    <Link href={`/tags/${encodeURIComponent(tag)}`} key={tag} prefetch={false}>
      <Badge
        variant="outline"
        className="text-foreground/90 hover:bg-foreground/10 transition-all"
      >
        {tag}
        {count && <span className="text-foreground/90">({count})</span>}
        <LinkStatus />
      </Badge>
    </Link>
  ) : (
    <Badge variant="outline" className="text-foreground/90 no-underline">
      {tag}
      {count && <span className="text-foreground/90">({count})</span>}
    </Badge>
  );
}
