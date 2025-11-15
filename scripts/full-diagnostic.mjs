/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

const SITE_URL = 'https://praviel.com';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  console.log('\n🔍 FULL DIAGNOSTIC - CHECKING FOR LAG, ERRORS, WARNINGS\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Capture ALL console messages (not just errors)
  const allConsoleMessages = [];
  page.on('console', msg => {
    allConsoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location()
    });
  });

  // Capture network requests to check for 404s
  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push({
      url: request.url(),
      failure: request.failure()
    });
  });

  const responseErrors = [];
  page.on('response', response => {
    if (response.status() >= 400) {
      responseErrors.push({
        url: response.url(),
        status: response.status()
      });
    }
  });

  // Enable performance metrics
  await page.evaluateOnNewDocument(() => {
    window.performanceMetrics = {
      navigationStart: 0,
      interactions: []
    };

    // Track interactions
    ['click', 'input', 'scroll'].forEach(eventType => {
      window.addEventListener(eventType, (e) => {
        const start = performance.now();
        requestAnimationFrame(() => {
          const duration = performance.now() - start;
          window.performanceMetrics.interactions.push({
            type: eventType,
            duration: duration
          });
        });
      }, { passive: true });
    });
  });

  console.log('📍 Loading praviel.com with full monitoring...');
  const startTime = Date.now();
  await page.goto(SITE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
  const loadTime = Date.now() - startTime;

  // Wait for page to fully render
  await delay(5000);

  // Simulate user interactions to test for lag
  console.log('📍 Testing interactions for lag...');

  // Scroll the page
  await page.evaluate(() => {
    window.scrollTo(0, 500);
  });
  await delay(500);

  // Try to interact with elements
  try {
    const emailInput = await page.$('input[type="email"]');
    if (emailInput) {
      await emailInput.click();
      await delay(200);
    }
  } catch (e) {
    // Ignore if element not found
  }

  // Get performance metrics
  const perfMetrics = await page.evaluate(() => {
    const perf = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');

    return {
      domContentLoaded: perf?.domContentLoadedEventEnd - perf?.domContentLoadedEventStart,
      loadComplete: perf?.loadEventEnd - perf?.loadEventStart,
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
      interactions: window.performanceMetrics.interactions
    };
  });

  // Get Core Web Vitals approximation
  const webVitals = await page.evaluate(() => {
    return {
      largestContentfulPaint: performance.getEntriesByType('largest-contentful-paint')[0]?.renderTime || 0,
      cumulativeLayoutShift: performance.getEntriesByType('layout-shift').reduce((sum, entry) => sum + entry.value, 0)
    };
  });

  // Categorize console messages
  const errors = allConsoleMessages.filter(m => m.type === 'error');
  const warnings = allConsoleMessages.filter(m => m.type === 'warning');
  const logs = allConsoleMessages.filter(m => m.type === 'log' || m.type === 'info');

  // Print comprehensive report
  console.log('\n' + '='.repeat(80));
  console.log('COMPREHENSIVE DIAGNOSTIC REPORT');
  console.log('='.repeat(80) + '\n');

  console.log('⚡ PERFORMANCE / LAG:');
  console.log(`   Page Load Time: ${loadTime}ms ${loadTime > 3000 ? '❌ SLOW' : '✅ ACCEPTABLE'}`);
  console.log(`   DOM Content Loaded: ${perfMetrics.domContentLoaded?.toFixed(0) || 'N/A'}ms`);
  console.log(`   First Contentful Paint: ${perfMetrics.firstContentfulPaint?.toFixed(0) || 'N/A'}ms`);
  console.log(`   Largest Contentful Paint: ${webVitals.largestContentfulPaint?.toFixed(0) || 'N/A'}ms ${webVitals.largestContentfulPaint > 2500 ? '❌ SLOW' : '✅ GOOD'}`);
  console.log(`   Cumulative Layout Shift: ${webVitals.cumulativeLayoutShift?.toFixed(3) || 'N/A'} ${webVitals.cumulativeLayoutShift > 0.1 ? '❌ HIGH' : '✅ LOW'}`);

  if (perfMetrics.interactions.length > 0) {
    const avgInteractionTime = perfMetrics.interactions.reduce((sum, i) => sum + i.duration, 0) / perfMetrics.interactions.length;
    console.log(`   Average Interaction Response: ${avgInteractionTime.toFixed(0)}ms ${avgInteractionTime > 200 ? '❌ LAGGY' : '✅ RESPONSIVE'}`);
  }

  console.log('\n🔴 CONSOLE ERRORS:');
  if (errors.length === 0) {
    console.log('   ✅ No console errors detected');
  } else {
    errors.forEach((err, i) => {
      console.log(`   ${i + 1}. ❌ ${err.text}`);
      if (err.location.url) {
        console.log(`      Location: ${err.location.url}:${err.location.lineNumber}`);
      }
    });
  }

  console.log('\n⚠️  CONSOLE WARNINGS:');
  if (warnings.length === 0) {
    console.log('   ✅ No console warnings detected');
  } else {
    warnings.forEach((warn, i) => {
      console.log(`   ${i + 1}. ⚠️  ${warn.text}`);
    });
  }

  console.log('\n📡 NETWORK ERRORS (404s, etc):');
  if (failedRequests.length === 0 && responseErrors.length === 0) {
    console.log('   ✅ No failed requests');
  } else {
    failedRequests.forEach(req => {
      console.log(`   ❌ FAILED: ${req.url}`);
      console.log(`      Reason: ${req.failure.errorText}`);
    });
    responseErrors.forEach(req => {
      console.log(`   ❌ ${req.status}: ${req.url}`);
    });
  }

  console.log('\n📝 RECENT CONSOLE LOGS (last 10):');
  logs.slice(-10).forEach((log, i) => {
    console.log(`   ${i + 1}. ${log.text}`);
  });

  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Console Messages: ${allConsoleMessages.length}`);
  console.log(`  Errors: ${errors.length}`);
  console.log(`  Warnings: ${warnings.length}`);
  console.log(`  Logs: ${logs.length}`);
  console.log(`Network Issues: ${failedRequests.length + responseErrors.length}`);
  console.log(`Load Performance: ${loadTime}ms ${loadTime > 3000 ? '❌' : '✅'}`);
  console.log('='.repeat(80) + '\n');

  await browser.close();

  const hasCriticalIssues = errors.length > 0 || loadTime > 5000 || responseErrors.length > 0;
  process.exit(hasCriticalIssues ? 1 : 0);
})();
