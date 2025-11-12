import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";
import TechStacks from "@/components/TechStacks";
import Slides from "@/components/Slides";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

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
            <Link href="/posts" className="text-primary hover:underline">
              查看全部 →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map(({ slug, metadata }) => (
              <div
                key={slug}
                className="bg-card rounded-lg border p-6 transition-shadow hover:shadow-lg"
              >
                <Link href={`/posts/${slug}`} className="group">
                  <h3 className="mb-3 text-2xl font-bold transition-colors">
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
