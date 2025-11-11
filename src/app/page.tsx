import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";
import TechStacks from "@/components/TechStacks";

// 獲取最新文章
async function getLatestPosts() {
  const posts = await getAllPosts();
  // 只取前 3 篇
  return posts.slice(0, 3);
}

export default async function Home() {
  const latestPosts = await getLatestPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <main>
        <TechStacks />

        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="flex justify-center gap-4">
            <Link
              href="/posts"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              瀏覽所有文章
            </Link>
            <Link
              href="#latest"
              className="hover:bg-accent rounded-lg border border-gray-300 px-6 py-3 font-medium transition-colors dark:border-gray-700"
            >
              查看最新文章
            </Link>
          </div>
        </section>

        {/* Latest Posts Section */}
        <section id="latest">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-4xl font-bold">最新文章</h2>
            <Link
              href="/posts"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              查看全部 →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map(({ slug, metadata }) => (
              <article
                key={slug}
                className="bg-card rounded-lg border p-6 transition-shadow hover:shadow-lg"
              >
                <Link href={`/posts/${slug}`} className="group">
                  <h3 className="mb-3 text-2xl font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {metadata.title}
                  </h3>
                  <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
                    <time dateTime={metadata.date}>{metadata.date}</time>
                  </div>
                  {metadata.description && (
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {metadata.description}
                    </p>
                  )}
                  <span className="text-blue-600 group-hover:underline dark:text-blue-400">
                    閱讀更多 →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
