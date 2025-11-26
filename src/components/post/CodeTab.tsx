"use client";

import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";

export default function CodeTab({ codes }: { codes: Record<string, string> }) {
  return <CodeTabs codes={codes} />;
}
