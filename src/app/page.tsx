import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

// 獲取最新文章
async function getLatestPosts() {
  const posts = await getAllPosts();
  // 只取前 3 篇
  return posts.slice(0, 3);
}

export default async function Home() {
  const latestPosts = await getLatestPosts();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <main>
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            歡迎來到我的部落格
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            分享技術知識、記錄學習過程、探索 Web 開發的無限可能
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/posts"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              瀏覽所有文章
            </Link>
            <Link
              href="#latest"
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-accent transition-colors font-medium"
            >
              查看最新文章
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16 bg-accent/30 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-4">關於我</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            我是 <strong>市長/tantuyu</strong>，一位熱愛 Web 開發的工程師。
            這個部落格使用 Next.js 16 和 MDX 建立，旨在分享我的學習心得和技術經驗。
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            在這裡，你可以找到關於 React、Next.js、TypeScript 等現代 Web 技術的文章。
          </p>
        </section>

        {/* Latest Posts Section */}
        <section id="latest">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold">最新文章</h2>
            <Link
              href="/posts"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              查看全部 →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map(({ slug, metadata }) => (
              <article
                key={slug}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-card"
              >
                <Link href={`/posts/${slug}`} className="group">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {metadata.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <time dateTime={metadata.date}>{metadata.date}</time>
                  </div>
                  {metadata.description && (
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {metadata.description}
                    </p>
                  )}
                  <span className="text-blue-600 dark:text-blue-400 group-hover:underline">
                    閱讀更多 →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">技術堆疊</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Next.js 16", icon: "⚡" },
              { name: "React 19", icon: "⚛️" },
              { name: "TypeScript", icon: "📘" },
              { name: "Tailwind CSS", icon: "🎨" },
              { name: "MDX", icon: "📝" },
              { name: "next-themes", icon: "🌓" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 p-4 border rounded-lg bg-card hover:bg-accent transition-colors"
              >
                <span className="text-3xl">{tech.icon}</span>
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
