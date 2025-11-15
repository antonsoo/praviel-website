import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const startTime = Date.now();
  await page.goto('https://praviel.com', {
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  const loadTime = Date.now() - startTime;

  const metrics = await page.metrics();

  console.log('\n📊 PAGE LOAD PERFORMANCE');
  console.log('==================================================');
  console.log(`Total load time: ${loadTime}ms`);
  console.log(`Time to First Byte: ${(await page.evaluate(() => performance.timing.responseStart - performance.timing.requestStart))}ms`);
  console.log(`DOM Content Loaded: ${(await page.evaluate(() => performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart))}ms`);
  console.log(`Page Load Complete: ${(await page.evaluate(() => performance.timing.loadEventEnd - performance.timing.navigationStart))}ms`);
  console.log('\n📈 RESOURCE METRICS');
  console.log(`JS Heap Used: ${(metrics.JSHeapUsedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`DOM Nodes: ${metrics.Nodes}`);
  console.log(`Layout Count: ${metrics.LayoutCount}`);
  console.log(`Style Recalc: ${metrics.RecalcStyleCount}`);

  await browser.close();
})();
