import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | PRAVIEL — Insights on Ancient Languages & Classical Education",
  description:
    "Explore articles about ancient languages, classical education, language learning technology, and the revival of Latin, Greek, Hebrew, and other classical languages.",
  openGraph: {
    title: "Blog | PRAVIEL",
    description:
      "Insights on ancient languages, classical education, and language learning technology.",
    url: "https://praviel.com/blog",
  },
};

export default async function BlogPage() {
  "use cache";
  cacheLife("hours");

  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.05)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] via-[#E8C55B] to-[#3b82f6] bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Insights on ancient languages, classical education, and the future of learning
          </p>
        </div>

        {/* Blog posts grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-400 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-8 transition-all duration-300 hover:border-[#D4AF37]/30 hover:bg-zinc-900/60 hover:shadow-2xl hover:shadow-[#D4AF37]/10">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#E8C55B] border border-[#D4AF37]/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-zinc-100 group-hover:text-[#E8C55B] transition-colors duration-300">
                      {post.title}
                    </h2>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                      <span>{post.author}</span>
                      <span>•</span>
                      <time dateTime={post.publishDate}>
                        {formatDate(post.publishDate)}
                      </time>
                    </div>

                    {/* Excerpt */}
                    <p className="text-zinc-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read more indicator */}
                    <div className="mt-6 flex items-center text-[#E8C55B] font-medium group-hover:translate-x-1 transition-transform duration-300">
                      Read article
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
