import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { getPostBySlug, getAllPostSlugs, formatDate } from "@/lib/blog";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Static generation handled by generateStaticParams + cacheComponents in next.config.ts
// cacheComponents ensures blog posts are cached and don't cause hydration mismatches
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | PRAVIEL Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://praviel.com/blog/${slug}`,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: "https://praviel.com/og.png",
          width: 1200,
          height: 630,
          alt: "PRAVIEL - Ancient Languages & Classical Education",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["https://praviel.com/og.png"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Schema.org Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            author: {
              "@type": "Person",
              name: post.author,
            },
            datePublished: post.publishDate,
            dateModified: post.publishDate,
            description: post.excerpt,
            publisher: {
              "@type": "Organization",
              name: "PRAVIEL",
              logo: {
                "@type": "ImageObject",
                url: "https://praviel.com/og.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://praviel.com/blog/${slug}`,
            },
          }),
        }}
      />

      <div className="relative min-h-screen bg-black">
        {/* Background effects */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.04)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

        <article className="relative max-w-4xl mx-auto px-6 py-24">
          {/* Back to blog link */}
          <Link
            href="/blog"
            prefetch={false}
            className="inline-flex items-center text-[#E8C55B] hover:text-[#D4AF37] transition-colors duration-200 mb-12 group"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Article header */}
          <header className="mb-12 pb-8 border-b border-zinc-800">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
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
            <h1
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] via-[#E8C55B] to-zinc-100 bg-clip-text text-transparent leading-tight"
              style={{ viewTransitionName: `blog-title-${slug}` }}
            >
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-zinc-400">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#D4AF37]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="font-medium">{post.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#D4AF37]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time
                  dateTime={post.publishDate}
                  style={{ viewTransitionName: `blog-date-${slug}` }}
                >
                  {formatDate(post.publishDate)}
                </time>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#D4AF37]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </header>

          {/* Article content with prose styling
              Note: Safe use of dangerouslySetInnerHTML because:
              - Content is author-controlled (repository markdown files)
              - Processed server-side by remark (trusted markdown processor)
              - Not user-submitted content
          */}
          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article footer */}
          <footer className="mt-16 pt-8 border-t border-zinc-800">
            <Link
              href="/blog"
              prefetch={false}
              className="inline-flex items-center text-[#E8C55B] hover:text-[#D4AF37] transition-colors duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </footer>
        </article>
      </div>
    </>
  );
}
