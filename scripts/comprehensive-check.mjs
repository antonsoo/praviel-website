/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

const SITE_URL = 'https://praviel.com';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  console.log('\n🔍 COMPREHENSIVE SITE CHECK - ALL ISSUES\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-logging',
      '--v=1'
    ]
  });

  const page = await browser.newPage();

  // Capture ALL console messages with full details
  const consoleMessages = {
    errors: [],
    warnings: [],
    logs: [],
    all: []
  };

  page.on('console', msg => {
    const entry = {
      type: msg.type(),
      text: msg.text(),
      location: msg.location(),
      args: msg.args().length
    };

    consoleMessages.all.push(entry);

    if (msg.type() === 'error') {
      consoleMessages.errors.push(entry);
    } else if (msg.type() === 'warning') {
      consoleMessages.warnings.push(entry);
    } else if (msg.type() === 'log' || msg.type() === 'info') {
      consoleMessages.logs.push(entry);
    }
  });

  // Capture page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push({
      message: error.message,
      stack: error.stack
    });
  });

  // Capture network requests
  const networkActivity = {
    failed: [],
    status4xx: [],
    status5xx: [],
    all: []
  };

  page.on('requestfailed', request => {
    networkActivity.failed.push({
      url: request.url(),
      failure: request.failure()?.errorText || 'Unknown'
    });
  });

  page.on('response', response => {
    const status = response.status();
    const url = response.url();

    networkActivity.all.push({ url, status });

    if (status >= 400 && status < 500) {
      networkActivity.status4xx.push({ url, status });
    } else if (status >= 500) {
      networkActivity.status5xx.push({ url, status });
    }
  });

  console.log('📍 Loading praviel.com...');
  const startTime = Date.now();

  try {
    await page.goto(SITE_URL, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
  } catch (err) {
    console.error('❌ Page load failed:', err.message);
    await browser.close();
    process.exit(1);
  }

  const loadTime = Date.now() - startTime;
  console.log(`✅ Page loaded in ${loadTime}ms\n`);

  // Wait for rendering
  await delay(5000);

  // Check for favicon.ico specifically
  console.log('📍 Checking favicon.ico...');
  const faviconIcoStatus = networkActivity.all.find(r => r.url.includes('/favicon.ico'));
  const faviconSvgStatus = networkActivity.all.find(r => r.url.includes('/favicon.svg'));

  // Get page info
  const pageInfo = await page.evaluate(() => {
    return {
      title: document.title,
      heroText: document.querySelector('h1')?.textContent?.trim(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  });

  // Get computed styles to check for CSS issues
  const cssCheck = await page.evaluate(() => {
    const issues = [];

    // Check if CSS @property is supported
    const supportsAtProperty = CSS.supports('initial-value', '0');
    if (!supportsAtProperty) {
      issues.push('Browser does not support CSS @property');
    }

    // Check for any elements with problematic overflow
    const allElements = document.querySelectorAll('*');
    let overflowElements = 0;
    allElements.forEach(el => {
      const computed = window.getComputedStyle(el);
      if (computed.overflowX === 'scroll' || computed.overflowX === 'auto') {
        if (el.scrollWidth > el.clientWidth) {
          overflowElements++;
        }
      }
    });

    return {
      issues,
      overflowElements,
      supportsAtProperty
    };
  });

  // Test mobile viewport
  console.log('📍 Testing mobile viewport...');
  await page.setViewport({ width: 375, height: 667 });
  await page.reload({ waitUntil: 'networkidle2' });
  await delay(2000);

  const mobileTest = await page.evaluate(() => {
    window.scrollTo(50, 0);
    return {
      canScrollHorizontally: window.scrollX > 0,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    };
  });

  // Performance metrics
  const perfMetrics = await page.evaluate(() => {
    const perf = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    const lcp = performance.getEntriesByType('largest-contentful-paint')[0];

    return {
      domContentLoaded: perf?.domContentLoadedEventEnd - perf?.domContentLoadedEventStart,
      loadComplete: perf?.loadEventEnd - perf?.loadEventStart,
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
      largestContentfulPaint: lcp?.renderTime || lcp?.loadTime || 0,
      cumulativeLayoutShift: performance.getEntriesByType('layout-shift')
        .reduce((sum, entry) => sum + entry.value, 0)
    };
  });

  // Print comprehensive report
  console.log('\n' + '='.repeat(80));
  console.log('COMPREHENSIVE DIAGNOSTIC REPORT');
  console.log('='.repeat(80) + '\n');

  console.log('📄 PAGE INFO:');
  console.log(`   Title: ${pageInfo.title}`);
  console.log(`   Hero: ${pageInfo.heroText || 'NOT FOUND'}`);
  console.log(`   URL: ${pageInfo.url}`);
  console.log(`   Viewport: ${pageInfo.viewport.width}x${pageInfo.viewport.height}`);

  console.log('\n🖼️  FAVICON STATUS:');
  if (faviconIcoStatus) {
    console.log(`   favicon.ico: ${faviconIcoStatus.status} ${faviconIcoStatus.status === 200 ? '✅' : '❌'}`);
  } else {
    console.log('   favicon.ico: Not requested');
  }
  if (faviconSvgStatus) {
    console.log(`   favicon.svg: ${faviconSvgStatus.status} ${faviconSvgStatus.status === 200 ? '✅' : '❌'}`);
  }

  console.log('\n⚡ PERFORMANCE:');
  console.log(`   Page Load: ${loadTime}ms ${loadTime > 3000 ? '❌ SLOW' : '✅ GOOD'}`);
  console.log(`   First Contentful Paint: ${perfMetrics.firstContentfulPaint?.toFixed(0)}ms`);
  console.log(`   Largest Contentful Paint: ${perfMetrics.largestContentfulPaint?.toFixed(0)}ms ${perfMetrics.largestContentfulPaint > 2500 ? '❌ SLOW' : '✅ GOOD'}`);
  console.log(`   Cumulative Layout Shift: ${perfMetrics.cumulativeLayoutShift?.toFixed(3)} ${perfMetrics.cumulativeLayoutShift > 0.1 ? '❌ HIGH' : '✅ LOW'}`);

  console.log('\n🎨 CSS CHECKS:');
  console.log(`   @property support: ${cssCheck.supportsAtProperty ? '✅ YES' : '❌ NO'}`);
  console.log(`   CSS issues found: ${cssCheck.issues.length}`);
  cssCheck.issues.forEach(issue => console.log(`      - ${issue}`));
  console.log(`   Elements with horizontal overflow: ${cssCheck.overflowElements}`);

  console.log('\n📱 MOBILE:');
  console.log(`   Can scroll horizontally: ${mobileTest.canScrollHorizontally ? '❌ YES (BAD)' : '✅ NO (GOOD)'}`);
  console.log(`   ScrollWidth: ${mobileTest.scrollWidth}px vs ClientWidth: ${mobileTest.clientWidth}px`);

  console.log('\n🔴 CONSOLE ERRORS:');
  if (consoleMessages.errors.length === 0) {
    console.log('   ✅ No console errors');
  } else {
    consoleMessages.errors.forEach((err, i) => {
      console.log(`   ${i + 1}. ❌ ${err.text}`);
      if (err.location?.url) {
        console.log(`      ${err.location.url}:${err.location.lineNumber}`);
      }
    });
  }

  console.log('\n⚠️  CONSOLE WARNINGS:');
  if (consoleMessages.warnings.length === 0) {
    console.log('   ✅ No console warnings');
  } else {
    consoleMessages.warnings.forEach((warn, i) => {
      console.log(`   ${i + 1}. ⚠️  ${warn.text}`);
      if (warn.location?.url) {
        console.log(`      ${warn.location.url}:${warn.location.lineNumber}`);
      }
    });
  }

  console.log('\n💥 PAGE ERRORS (JavaScript):');
  if (pageErrors.length === 0) {
    console.log('   ✅ No page errors');
  } else {
    pageErrors.forEach((err, i) => {
      console.log(`   ${i + 1}. ❌ ${err.message}`);
    });
  }

  console.log('\n📡 NETWORK ERRORS:');
  if (networkActivity.failed.length === 0 && networkActivity.status4xx.length === 0) {
    console.log('   ✅ No network errors');
  } else {
    networkActivity.failed.forEach(req => {
      console.log(`   ❌ FAILED: ${req.url}`);
      console.log(`      ${req.failure}`);
    });
    networkActivity.status4xx.forEach(req => {
      console.log(`   ❌ ${req.status}: ${req.url}`);
    });
  }

  console.log('\n📊 SUMMARY:');
  console.log(`   Console Errors: ${consoleMessages.errors.length}`);
  console.log(`   Console Warnings: ${consoleMessages.warnings.length}`);
  console.log(`   Page Errors: ${pageErrors.length}`);
  console.log(`   Network 4xx: ${networkActivity.status4xx.length}`);
  console.log(`   Failed Requests: ${networkActivity.failed.length}`);
  console.log(`   Load Time: ${loadTime}ms ${loadTime > 3000 ? '❌' : '✅'}`);
  console.log(`   Mobile Horizontal Scroll: ${mobileTest.canScrollHorizontally ? '❌' : '✅'}`);

  console.log('\n' + '='.repeat(80));

  await browser.close();

  const hasCriticalIssues =
    consoleMessages.errors.length > 0 ||
    pageErrors.length > 0 ||
    networkActivity.status4xx.length > 0 ||
    mobileTest.canScrollHorizontally ||
    loadTime > 5000;

  process.exit(hasCriticalIssues ? 1 : 0);
})();
