import { Link } from "next-view-transitions";

import { getAllPosts, formatDate } from "@/lib/blog";

export default function BlogSpotlight() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="blog-spotlight-title"
      className="relative px-4 sm:px-6 py-16 sm:py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1222]/35 to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl space-y-10">
        <header className="text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#E8C55B]">
            Field reports
          </p>
          <h2 id="blog-spotlight-title" className="text-3xl sm:text-4xl font-semibold text-white">
            Dispatches from the scriptorium
          </h2>
          <p className="mx-auto max-w-3xl text-sm sm:text-base text-zinc-400">
            Essays on pedagogy, infrastructure, and why ancient language programs are scaling again.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-white/10 bg-black/60 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1 scroll-fade-in"
              style={{ viewTransitionName: `blog-card-${post.slug}` }}
            >
              <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-500 flex items-center gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#E8C55B]" aria-hidden />
                <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
              </div>
              <h3
                className="mt-4 text-xl font-semibold text-white leading-tight"
                style={{ viewTransitionName: `blog-title-${post.slug}` }}
              >
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-zinc-400 line-clamp-3">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                <span>{post.author}</span>
                <span>•</span>
                <span style={{ viewTransitionName: `blog-date-${post.slug}` }}>{post.readingTime}</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                prefetch={false}
                className="mt-6 inline-flex items-center text-[#E8C55B] font-medium group-hover:translate-x-1 transition-transform duration-300"
              >
                Read report
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition-colors duration-300 hover:border-[#E8C55B]/40 hover:text-[#E8C55B]"
          >
            Visit the blog
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
