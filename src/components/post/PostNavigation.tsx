import Link from "next/link";
import { PostListItem } from "@/lib/markdown";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Noto_Serif_TC } from "next/font/google";
import { cn } from "@/lib/utils";

const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
});

type PostNavigationProps = {
  prevPost: PostListItem | null;
  nextPost: PostListItem | null;
};

export default function PostNavigation({
  prevPost,
  nextPost,
}: PostNavigationProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {/* 前一篇文章（較新的） */}
      {prevPost ? (
        <Link href={`/posts/${prevPost.slug}`} prefetch={false}>
          <Card className="group h-full transition-shadow hover:shadow-lg">
            <CardContent className="flex h-full items-center gap-4">
              <ChevronLeft className="text-muted-foreground size-5 shrink-0 transition-transform group-hover:-translate-x-1" />
              <div className="flex-1 overflow-hidden">
                <div className="text-muted-foreground mb-2 text-xs">
                  上一篇文章
                </div>
                <h3
                  className={`${notoSerifTC.className} mb-2 line-clamp-2 text-lg font-semibold group-hover:underline`}
                >
                  {prevPost.metadata.title}
                </h3>
                {/* 描述 */}
                <p
                  className={`${notoSerifTC.className} text-muted-foreground mb-0 text-sm`}
                >
                  {prevPost.metadata.description
                    ? prevPost.metadata.description
                    : "作者很懶，沒有寫描述"}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <PostNavigationEmpty direction="prev" />
      )}

      {/* 後一篇文章（較舊的） */}
      {nextPost ? (
        <Link href={`/posts/${nextPost.slug}`} prefetch={false}>
          <Card className="group h-full transition-shadow hover:shadow-lg">
            <CardContent className="flex h-full items-center gap-4">
              <div className="flex-1 overflow-hidden text-right">
                <div className="text-muted-foreground mb-2 text-xs">
                  下一篇文章
                </div>
                <h3
                  className={`${notoSerifTC.className} mb-2 line-clamp-2 text-lg font-semibold group-hover:underline`}
                >
                  {nextPost.metadata.title}
                </h3>
                {/* 描述 */}
                <p
                  className={`${notoSerifTC.className} text-muted-foreground mb-0 text-sm`}
                >
                  {nextPost.metadata.description
                    ? nextPost.metadata.description
                    : "作者很懶，沒有寫描述"}
                </p>
              </div>
              <ChevronRight className="text-muted-foreground size-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </CardContent>
          </Card>
        </Link>
      ) : (
        <PostNavigationEmpty direction="next" />
      )}
    </div>
  );
}

interface PostNavigationEmptyProps {
  direction: "prev" | "next";
}

function PostNavigationEmpty({ direction }: PostNavigationEmptyProps) {
  return (
    <Card className="bg-card/50 h-full">
      <CardContent className="flex h-full items-center gap-4">
        {direction === "prev" && (
          <ChevronLeft className="text-muted-foreground size-5 shrink-0 transition-transform group-hover:-translate-x-1" />
        )}
        <div
          className={cn(
            "flex-1 overflow-hidden",
            direction === "prev" ? "" : "text-right",
          )}
        >
          <div className="text-muted-foreground mb-2 text-xs">
            {direction === "prev" ? "上一篇文章" : "下一篇文章"}
          </div>
          <h3 className={`${notoSerifTC.className} mb-2 text-lg font-semibold`}>
            沒文章了
          </h3>
          <p
            className={`${notoSerifTC.className} text-muted-foreground mb-0 text-sm`}
          >
            {direction === "prev" ? "還在努力寫文章中..." : "._. 沒文章了"}
          </p>
        </div>
        {direction === "next" && (
          <ChevronRight className="text-muted-foreground size-5 shrink-0 transition-transform group-hover:translate-x-1" />
        )}
      </CardContent>
    </Card>
  );
}
