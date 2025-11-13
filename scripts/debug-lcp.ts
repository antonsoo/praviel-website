import { chromium, devices } from "playwright";

const url = process.env.LCP_DEBUG_URL ?? "https://praviel-site.antonnsoloviev.workers.dev";
const device = devices[process.env.LCP_DEBUG_DEVICE ?? "Pixel 5"];

async function main() {
  const browser = await chromium.launch({ headless: true, args: ["--disable-dev-shm-usage"] });
  const context = await browser.newContext(device);
  const page = await context.newPage();

  await page.addInitScript(() => {
    (window as unknown as { __lcpEntries?: unknown[] }).__lcpEntries = [];
    const observer = new PerformanceObserver((entryList) => {
      const store = (window as unknown as { __lcpEntries?: unknown[] }).__lcpEntries;
      for (const entry of entryList.getEntries()) {
        store?.push({
          name: entry.name,
          startTime: entry.startTime,
          // @ts-expect-error - extra fields exist on LCP entries
          renderTime: entry.renderTime,
          // @ts-expect-error - extra fields exist on LCP entries
          size: entry.size,
          // @ts-expect-error - element exists
          tagName: entry.element?.tagName ?? null,
          // @ts-expect-error - element exists
          outerHTML: entry.element?.outerHTML?.slice(0, 400) ?? null,
        });
      }
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
  });

  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(6000);

  const entries = await page.evaluate(() => {
    return (window as unknown as { __lcpEntries?: unknown[] }).__lcpEntries ?? [];
  });

  console.log("LCP entries", entries);

  await browser.close();
}

main().catch((error) => {
  console.error("LCP debug failed", error);
  process.exitCode = 1;
});
