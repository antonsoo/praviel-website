import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const consoleLogs = [];
  const errors = [];
  const warnings = [];

  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text });

    if (msg.type() === 'error') {
      errors.push(text);
    } else if (msg.type() === 'warning') {
      warnings.push(text);
    }
  });

  page.on('pageerror', error => {
    errors.push(error.message);
  });

  console.log('\n🔍 COMPREHENSIVE PRODUCTION TEST\n' + '='.repeat(60));

  const startTime = Date.now();
  await page.goto('https://praviel.com', {
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  const loadTime = Date.now() - startTime;

  console.log('\n📊 PERFORMANCE METRICS:');
  console.log(`  Total load time: ${loadTime}ms`);
  console.log(`  TTFB: ${(await page.evaluate(() => performance.timing.responseStart - performance.timing.requestStart))}ms`);
  console.log(`  DOM Content Loaded: ${(await page.evaluate(() => performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart))}ms`);

  const metrics = await page.metrics();
  console.log(`  JS Heap: ${(metrics.JSHeapUsedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  DOM Nodes: ${metrics.Nodes}`);
  console.log(`  Layouts: ${metrics.LayoutCount}`);
  console.log(`  Style Recalcs: ${metrics.RecalcStyleCount}`);

  const animations = await page.evaluate(() => document.getAnimations().length);
  console.log(`\n🎬 ANIMATIONS: ${animations}`);

  const immersivePref = await page.evaluate(() => document.documentElement.dataset.immersivePref);
  console.log(`\n⚙️  IMMERSIVE PREF: "${immersivePref}"`);

  const hydrationErrors = consoleLogs.filter(log =>
    log.text.includes('418') ||
    log.text.toLowerCase().includes('hydration') ||
    log.text.includes('Minified React error')
  );

  if (hydrationErrors.length > 0) {
    console.log('\n❌ HYDRATION ERRORS:');
    hydrationErrors.forEach(err => console.log(`  - ${err.text}`));
  } else {
    console.log('\n✅ No hydration errors');
  }

  if (errors.length > 0) {
    console.log('\n❌ CONSOLE ERRORS:');
    errors.forEach(err => console.log(`  - ${err}`));
  } else {
    console.log('✅ No console errors');
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  CONSOLE WARNINGS:');
    warnings.slice(0, 5).forEach(warn => console.log(`  - ${warn}`));
    if (warnings.length > 5) {
      console.log(`  ... and ${warnings.length - 5} more`);
    }
  } else {
    console.log('✅ No console warnings');
  }

  const networkRequests = await page.evaluate(() => {
    return performance.getEntriesByType('resource').length;
  });
  console.log(`\n🌐 NETWORK REQUESTS: ${networkRequests}`);

  const largeResources = await page.evaluate(() => {
    return performance.getEntriesByType('resource')
      .filter(r => r.transferSize > 100000)
      .map(r => ({
        name: r.name.split('/').pop(),
        size: Math.round(r.transferSize / 1024) + ' KB',
        type: r.initiatorType
      }))
      .slice(0, 10);
  });

  if (largeResources.length > 0) {
    console.log('\n📦 LARGE RESOURCES (>100KB):');
    largeResources.forEach(r => {
      console.log(`  - ${r.name} (${r.size}, ${r.type})`);
    });
  }

  console.log('\n' + '='.repeat(60));

  await browser.close();
})();
