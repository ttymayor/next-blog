"use client";

import { useMemo } from "react";

interface OvertimeProps {
  pubDate: string;
}

export default function Overtime({ pubDate }: OvertimeProps) {
  // 初始化時就建立 now，無需 useEffect
  const now = useMemo(() => new Date(), []);
  const publishedAt = useMemo(() => new Date(pubDate), [pubDate]);

  const HALF_YEAR_MS = 180 * 24 * 60 * 60 * 1000;
  const diff = now.getTime() - publishedAt.getTime();

  if (diff <= HALF_YEAR_MS) return null;

  return (
    <div className="border-tty-pink w-full rounded-md border p-4">
      <p className="text-tty-pink mb-0">
        該文章已超過半年，可能已經過時。請注意文章內容的正確性。
      </p>
    </div>
  );
}
