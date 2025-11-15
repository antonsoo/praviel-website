/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

const SITE_URL = 'https://praviel-site.antonnsoloviev.workers.dev';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 375, height: 667 });
  await page.goto(SITE_URL, { waitUntil: 'networkidle2' });

  const overflowTest = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    const computedHtml = window.getComputedStyle(html);
    const computedBody = window.getComputedStyle(body);

    // Try to scroll horizontally
    window.scrollTo(50, 0);
    const scrolledX = window.scrollX;

    return {
      htmlOverflowX: computedHtml.overflowX,
      bodyOverflowX: computedBody.overflowX,
      scrollWidth: html.scrollWidth,
      clientWidth: html.clientWidth,
      viewportWidth: window.innerWidth,
      canScrollHorizontally: scrolledX > 0,
      actualScrollX: scrolledX
    };
  });

  console.log('\n=== MOBILE HORIZONTAL SCROLL TEST ===\n');
  console.log(`Viewport width: ${overflowTest.viewportWidth}px`);
  console.log(`ScrollWidth: ${overflowTest.scrollWidth}px`);
  console.log(`HTML overflow-x: ${overflowTest.htmlOverflowX}`);
  console.log(`Body overflow-x: ${overflowTest.bodyOverflowX}`);
  console.log(`Can scroll horizontally: ${overflowTest.canScrollHorizontally}`);
  console.log(`Actual scroll X: ${overflowTest.actualScrollX}px`);

  // What matters is actual behavior, not just CSS property
  const passed = !overflowTest.canScrollHorizontally;

  console.log(passed ? '\n✅ PASSED: No horizontal scroll possible' : '\n❌ FAILED: Can scroll horizontally');

  if (passed && overflowTest.htmlOverflowX === 'visible') {
    console.log('⚠️  Note: HTML overflow-x shows as "visible" but scroll is still prevented');
  }

  await browser.close();
  process.exit(passed ? 0 : 1);
})();
