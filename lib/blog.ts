import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/blog");

// Validate that blog directory exists at module load time (build time)
if (typeof window === 'undefined' && !fs.existsSync(postsDirectory)) {
  console.error(`[blog] Content directory not found: ${postsDirectory}`);
  console.error('[blog] Blog functionality will be limited. Please ensure content/blog/ exists.');
}

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

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn('[blog] Content directory does not exist, returning empty list');
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => fileName.replace(/\.md$/, ""));
  } catch (error) {
    console.error('[blog] Error reading post slugs:', error);
    return [];
  }
}

/**
 * Get all blog posts metadata (for listing page)
 */
export function getAllPosts(): BlogPostMetadata[] {
  try {
    const slugs = getAllPostSlugs();
    const posts = slugs
      .map((slug) => {
        try {
          const fullPath = path.join(postsDirectory, `${slug}.md`);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          // Calculate reading time from markdown content
          const stats = readingTime(content);

          return {
            slug,
            title: data.title || "",
            author: data.author || "",
            date: data.date || "",
            publishDate: data.publishDate || data.date || "",
            excerpt: data.excerpt || "",
            tags: data.tags || [],
            readingTime: stats.text,
          } as BlogPostMetadata;
        } catch (error) {
          console.error(`[blog] Error reading post ${slug}:`, error);
          return null;
        }
      })
      .filter((post): post is BlogPostMetadata => post !== null)
      .sort((a, b) => {
        // Sort by publishDate descending (newest first)
        return a.publishDate < b.publishDate ? 1 : -1;
      });

    return posts;
  } catch (error) {
    console.error('[blog] Error getting all posts:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Calculate reading time from markdown content
    const stats = readingTime(content);

    // Process markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || "",
      author: data.author || "",
      date: data.date || "",
      publishDate: data.publishDate || data.date || "",
      excerpt: data.excerpt || "",
      tags: data.tags || [],
      content: contentHtml,
      readingTime: stats.text,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
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
