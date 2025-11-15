/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

const SITE_URL = 'https://praviel-site.antonnsoloviev.workers.dev';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 375, height: 667 });
  await page.goto(SITE_URL, { waitUntil: 'networkidle2' });
  await delay(2000);

  const scrollInfo = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      viewportWidth: window.innerWidth,
      hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth
    };
  });

  console.log('Mobile horizontal scroll test on workers.dev:');
  console.log(JSON.stringify(scrollInfo, null, 2));
  console.log(scrollInfo.hasHorizontalScroll ? '❌ FAILED: Has horizontal scroll' : '✅ PASSED: No horizontal scroll');

  await browser.close();
  process.exit(scrollInfo.hasHorizontalScroll ? 1 : 0);
})();
