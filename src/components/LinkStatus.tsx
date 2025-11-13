"use client";

import { useLinkStatus } from "next/link";
import { Spinner } from "@/components/ui/spinner";

export default function LinkStatus() {
  const { pending } = useLinkStatus();
  return pending ? (
    <Spinner
      aria-hidden
      className={`link-hint ${pending ? "is-pending" : ""}`}
    />
  ) : null;
}
