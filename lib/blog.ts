import blogData from "./generated/blog-data.json" assert { type: "json" };

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  publishDate: string;
  excerpt: string;
  tags: string[];
  content: string;
  readingTime: string;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  author: string;
  date: string;
  publishDate: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
}

interface BlogDataFile {
  generatedAt: string;
  posts: BlogPost[];
}

const BLOG_DATA = blogData as BlogDataFile;

function sortByPublishDateDesc<T extends { publishDate?: string }>(posts: T[]): T[] {
  return [...posts].sort((a, b) => {
    const aTime = Date.parse(a.publishDate ?? "");
    const bTime = Date.parse(b.publishDate ?? "");
    if (Number.isNaN(aTime) && Number.isNaN(bTime)) return 0;
    if (Number.isNaN(aTime)) return 1;
    if (Number.isNaN(bTime)) return -1;
    return bTime - aTime;
  });
}

const BLOG_POSTS: BlogPost[] = sortByPublishDateDesc(BLOG_DATA.posts ?? []);

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

/**
 * Get all blog posts metadata (for listing page)
 */
export function getAllPosts(): BlogPostMetadata[] {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
    title: post.title,
    author: post.author,
    date: post.date,
    publishDate: post.publishDate,
    excerpt: post.excerpt,
    tags: post.tags,
    readingTime: post.readingTime,
  }));
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = BLOG_POSTS.find((entry) => entry.slug === slug);
  return post ?? null;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
