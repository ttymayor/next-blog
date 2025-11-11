import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <main>
        <h1 className="mb-8 text-3xl font-bold">文章</h1>

        <div className="flex flex-col gap-4">
          {posts.map(({ slug, metadata }) => (
            <article
              key={slug}
              className="hover:bg-accent/50 rounded-lg p-4 transition-colors"
            >
              <Link href={`/posts/${slug}`} className="group">
                <h2 className="mb-2 text-2xl font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {metadata.title}
                </h2>
                <div className="text-muted-foreground mb-3 flex items-center gap-4 text-sm">
                  <time dateTime={metadata.pubDate}>
                    {new Date(metadata.pubDate).toLocaleDateString("zh-TW", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {metadata.categories && (
                    <>
                      <span className="select-none">•</span>
                      <span>{metadata.categories}</span>
                    </>
                  )}
                </div>
                {metadata.tags && metadata.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {metadata.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {metadata.description}
                  </p>
                )}
                <span className="mt-4 inline-block text-blue-600 group-hover:underline dark:text-blue-400">
                  閱讀更多 →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
