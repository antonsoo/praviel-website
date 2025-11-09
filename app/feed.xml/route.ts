import { Feed } from "feed";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const siteUrl = "https://praviel.com";
  const posts = getAllPosts();

  const feed = new Feed({
    title: "PRAVIEL Blog",
    description:
      "Insights on ancient languages, classical education, and the future of learning",
    id: `${siteUrl}/blog`,
    link: `${siteUrl}/blog`,
    language: "en",
    image: `${siteUrl}/og.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, PRAVIEL`,
    updated: posts.length > 0 ? new Date(posts[0].publishDate) : new Date(),
    feedLinks: {
      rss: `${siteUrl}/feed.xml`,
      json: `${siteUrl}/feed.json`,
      atom: `${siteUrl}/atom.xml`,
    },
    author: {
      name: "PRAVIEL",
      email: "contact@praviel.com",
      link: siteUrl,
    },
  });

  // Add each blog post to the feed
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.excerpt,
      author: [
        {
          name: post.author,
          email: "contact@praviel.com",
          link: siteUrl,
        },
      ],
      date: new Date(post.publishDate),
      category: post.tags.map((tag) => ({ name: tag })),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
