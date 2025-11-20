import Link from "next/link";
import CategoryLink from "@/components/CategoryLink";
import TagLink from "@/components/TagLink";
import LinkStatus from "@/components/LinkStatus";
import { getAllPosts } from "@/lib/markdown";
import { Noto_Serif_TC } from "next/font/google";

const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
});

async function getLatestPosts() {
  const latestPosts = await getAllPosts();
  return latestPosts.slice(0, 3);
}

export async function LatestPost() {
  const latestPosts = await getLatestPosts();

  return (
    <section id="latest-post" className="mb-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className={`${notoSerifTC.className} mb-0 text-2xl font-bold`}>
          最新文章
        </h2>
        <Link
          href="/posts"
          className={`${notoSerifTC.className} text-primary hover:underline`}
          prefetch={false}
        >
          查看全部 →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map(({ slug, metadata }) => (
          <div
            key={slug}
            className="bg-card rounded-lg border p-6 transition-shadow hover:shadow-lg"
          >
            <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-2 text-sm group-hover:no-underline">
              <time dateTime={metadata.pubDate}>
                {new Date(metadata.pubDate).toLocaleDateString("zh-TW", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {/* 分類 */}
              {metadata.categories && (
                <CategoryLink category={metadata.categories} />
              )}
            </div>

            <div className="flex flex-col gap-2">
              {/* 文章標題 */}
              <Link href={`/posts/${slug}`} prefetch={false}>
                <h3
                  className={`${notoSerifTC.className} mb-0 flex items-center gap-2 text-2xl font-bold transition-colors`}
                >
                  {metadata.title}
                  <LinkStatus />
                </h3>
              </Link>

              {/* 文章標籤 */}
              {metadata.tags && metadata.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {metadata.tags.map((tag) => (
                    <TagLink key={tag} tag={tag} />
                  ))}
                </div>
              )}

              {/* 文章描述 */}
              <p
                className={`${notoSerifTC.className} text-muted-foreground mb-4 line-clamp-3`}
              >
                {metadata.description || "作者很懶，沒有寫描述"}
              </p>
            </div>

            {/* 閱讀更多 */}
            <Link href={`/posts/${slug}`} prefetch={false}>
              <span
                className={`${notoSerifTC.className} text-tty-pink hover:underline`}
              >
                閱讀更多 →
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
