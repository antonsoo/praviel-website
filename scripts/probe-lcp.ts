import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3000";

async function probeLcp() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 360, height: 720 },
    deviceScaleFactor: 2,
    isMobile: true,
    userAgent:
      "Mozilla/5.0 (Linux; Android 13; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
  });
  const page = await context.newPage();

  await page.addInitScript(() => {
    (window as unknown as { __lcpEntries?: Array<Record<string, unknown>> }).__lcpEntries = [];
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries() as LargestContentfulPaint[];
      const collector = (window as unknown as { __lcpEntries: Array<Record<string, unknown>> }).__lcpEntries;
      entries.forEach((entry) => {
        collector.push({
          size: entry.size,
          startTime: entry.startTime,
          id: entry.id,
          url: entry.url,
          tag: entry.element?.tagName,
          text: entry.element?.textContent?.trim().slice(0, 80),
        });
      });
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const entries = await page.evaluate(() => {
    return (window as unknown as { __lcpEntries?: Array<Record<string, unknown>> }).__lcpEntries ?? [];
  });

  const crestMetrics = await page.evaluate(() => {
    const element = document.querySelector('[data-lcp-target="hero-crest"]') as HTMLElement | null;
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height, area: rect.width * rect.height };
  });

  console.log("LCP entries:", entries);
  console.log("Crest metrics:", crestMetrics);

  await context.close();
  await browser.close();
}

probeLcp().catch((error) => {
  console.error("[probe-lcp]", error);
  process.exit(1);
});
