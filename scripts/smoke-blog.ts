import blogData from "../lib/generated/blog-data.json" assert { type: "json" };

const DEFAULT_BASE = "http://127.0.0.1:3000";
const baseUrl = process.env.BLOG_SMOKE_BASE ?? process.env.BASE_URL ?? DEFAULT_BASE;

if (!baseUrl.startsWith("http")) {
  throw new Error(`BLOG_SMOKE_BASE must include protocol (received: ${baseUrl})`);
}

const time = (label: string) => {
  const start = performance.now();
  return {
    end(success: boolean) {
      const duration = (performance.now() - start).toFixed(1);
      console.log(`${label}: ${success ? "ok" : "fail"} (${duration} ms)`);
    },
  };
};

async function assertOk(path: string) {
  const timer = time(`GET ${path}`);
  const response = await fetch(new URL(path, baseUrl));
  timer.end(response.ok);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${path} responded ${response.status}: ${body.slice(0, 200)}`);
  }
  return response.text();
}

async function main() {
  console.log(`[blog-smoke] base = ${baseUrl}`);
  const posts = Array.isArray(blogData.posts) ? blogData.posts : [];
  if (posts.length === 0) {
    console.warn("[blog-smoke] No posts found in generated data; skipping detail checks");
    return;
  }

  const listingHtml = await assertOk("/blog");
  const latest = posts[0];
  if (!listingHtml.includes(latest.slug) && !listingHtml.includes(latest.title)) {
    throw new Error(`/blog listing missing latest slug (${latest.slug})`);
  }

  const slugPath = `/blog/${latest.slug}`;
  const detailHtml = await assertOk(slugPath);
  if (!detailHtml.includes(latest.title)) {
    throw new Error(`Detail page for ${latest.slug} missing expected title text`);
  }

  console.log(`[blog-smoke] Verified listing + ${slugPath}`);
}

main().catch((error) => {
  console.error("[blog-smoke] Failure", error);
  process.exitCode = 1;
});
