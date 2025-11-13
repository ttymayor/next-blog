"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import LinkStatus from "@/components/LinkStatus";

interface TagLinkProps {
  tag: string;
}

export default function TagLink({ tag }: TagLinkProps) {
  return (
    <Link href={`/tags/${encodeURIComponent(tag)}`} key={tag} prefetch={false}>
      <Badge
        variant="outline"
        className="text-foreground/90 hover:bg-foreground/10"
      >
        {tag}
        <LinkStatus />
      </Badge>
    </Link>
  );
}
