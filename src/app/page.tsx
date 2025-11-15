import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";
import TechStacks from "@/components/TechStacks";
import Slides from "@/components/Slides";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import CategoryLink from "@/components/CategoryLink";
import TagLink from "@/components/TagLink";
import LinkStatus from "@/components/LinkStatus";

// 獲取最新文章
async function getLatestPosts() {
  const posts = await getAllPosts();
  // 只取前 3 篇
  return posts.slice(0, 3);
}

export default async function Home() {
  const latestPosts = await getLatestPosts();

  return (
    <div className="mx-[3%] px-4 py-12 md:mx-[10%] lg:mx-[15%]">
      <main>
        <TechStacks />
        <Slides />
        <Experience />
        <Projects />

        {/* Latest Posts Section */}
        <section id="latest" className="mb-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="mb-0 text-2xl font-bold">最新文章</h2>
            <Link
              href="/posts"
              className="text-primary hover:underline"
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
                <Link
                  href={`/posts/${slug}`}
                  className="group"
                  prefetch={false}
                >
                  <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-2 text-sm">
                    <time dateTime={metadata.pubDate}>
                      {new Date(metadata.pubDate).toLocaleDateString("zh-TW", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    {/* 分類 */}
                    {metadata.categories && (
                      <CategoryLink
                        link={false}
                        category={metadata.categories}
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* 文章標題 */}
                    <h3 className="mb-0 flex items-center gap-2 text-2xl font-bold transition-colors">
                      {metadata.title}
                      <LinkStatus />
                    </h3>

                    {/* 文章標籤 */}
                    {metadata.tags && metadata.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        {metadata.tags.map((tag) => (
                          <TagLink link={false} key={tag} tag={tag} />
                        ))}
                      </div>
                    )}

                    {/* 文章描述 */}
                    {metadata.description && (
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {metadata.description}
                      </p>
                    )}
                  </div>

                  {/* 閱讀更多 */}
                  <span className="text-tty-pink group-hover:underline">
                    閱讀更多 →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
