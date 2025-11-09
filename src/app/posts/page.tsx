import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <main>
        <h1 className="text-5xl font-bold mb-8">部落格文章</h1>

        <div className="space-y-8">
          {posts.map(({ slug, metadata }) => (
            <article
              key={slug}
              className="border-b pb-8 last:border-b-0 hover:bg-accent/50 transition-colors rounded-lg p-4 -mx-4"
            >
              <Link href={`/posts/${slug}`} className="group">
                <h2 className="text-3xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {metadata.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>{metadata.author}</span>
                  <span>•</span>
                  <time dateTime={metadata.date}>{metadata.date}</time>
                </div>
                {metadata.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {metadata.description}
                  </p>
                )}
                <span className="inline-block mt-4 text-blue-600 dark:text-blue-400 group-hover:underline">
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
