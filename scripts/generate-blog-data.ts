import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import readingTime from "reading-time";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content/blog");
const OUTPUT_PATH = path.join(process.cwd(), "lib/generated/blog-data.json");

interface BlogFrontmatter {
  title?: string;
  author?: string;
  date?: string;
  publishDate?: string;
  excerpt?: string;
  tags?: string[];
}

async function ensureDir(filePath: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function loadMarkdownFile(fileName: string) {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(BLOG_CONTENT_DIR, fileName);
  const raw = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;

  const stats = readingTime(content);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  const publishDate = fm.publishDate ?? fm.date ?? new Date().toISOString();

  return {
    slug,
    title: fm.title ?? slug,
    author: fm.author ?? "PRAVIEL",
    date: fm.date ?? publishDate,
    publishDate,
    excerpt: fm.excerpt ?? "",
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    content: processed.toString(),
    readingTime: stats.text,
  };
}

async function generate() {
  let files: string[] = [];
  try {
    files = await fs.readdir(BLOG_CONTENT_DIR);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.warn(`[blog] Content directory missing: ${BLOG_CONTENT_DIR}`);
    } else {
      console.error("[blog] Unable to read blog directory", error);
    }
  }

  const markdownFiles = files.filter((file) => file.endsWith(".md"));
  const posts = await Promise.all(markdownFiles.map(loadMarkdownFile));

  posts.sort((a, b) => {
    const aDate = Date.parse(a.publishDate);
    const bDate = Date.parse(b.publishDate);
    if (Number.isNaN(aDate) || Number.isNaN(bDate)) {
      return 0;
    }
    return bDate - aDate;
  });

  const payload = {
    generatedAt: new Date().toISOString(),
    posts,
  };

  await ensureDir(OUTPUT_PATH);

  const existing = await fs
    .readFile(OUTPUT_PATH, "utf8")
    .then((value) => value)
    .catch(() => null);

  const nextData = JSON.stringify(payload, null, 2) + "\n";

  if (existing === nextData) {
    console.info("[blog] Blog data already up to date");
    return;
  }

  await fs.writeFile(OUTPUT_PATH, nextData, "utf8");
  console.info(
    `[blog] Generated ${posts.length} post${posts.length === 1 ? "" : "s"} into ${path.relative(
      process.cwd(),
      OUTPUT_PATH,
    )}`,
  );
}

generate().catch((error) => {
  console.error("[blog] Failed to generate blog data", error);
  process.exit(1);
});
