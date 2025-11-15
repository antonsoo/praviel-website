/* eslint-disable no-undef */
import puppeteer from 'puppeteer';
import fs from 'fs';

const SITE_URL = 'https://praviel.com';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  console.log('\n🔍 COMPREHENSIVE PRODUCTION DIAGNOSTICS\n');

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Capture all console messages
  const consoleMessages = { errors: [], warnings: [], logs: [] };
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') consoleMessages.errors.push(text);
    else if (type === 'warning') consoleMessages.warnings.push(text);
    else consoleMessages.logs.push(text);
  });

  // Capture page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });

  // Load the page
  console.log('📍 Loading praviel.com...');
  const response = await page.goto(SITE_URL, { waitUntil: 'networkidle0', timeout: 30000 });

  console.log(`✅ Status: ${response.status()}`);
  console.log(`✅ URL: ${response.url()}`);

  // Wait for any async rendering
  await delay(3000);

  // Check for React Error #418 specifically
  const hasHydrationError = consoleMessages.errors.some(e =>
    e.includes('418') || e.includes('Minified React error') || e.includes('hydration')
  );

  // Get page title and hero content
  const pageInfo = await page.evaluate(() => {
    return {
      title: document.title,
      heroText: document.querySelector('h1')?.textContent?.trim(),
      hasLoadingSkeletons: !!document.querySelector('.animate-pulse'),
      immersiveControlsVisible: !!document.querySelector('[class*="immersive"]') ||
                                  !!document.querySelector('[class*="Immersive"]'),
      comfortControlsVisible: !!document.querySelector('[class*="comfort"]') ||
                               !!document.querySelector('[class*="Comfort"]'),
      waitlistFormExists: !!document.querySelector('input[type="email"]'),
    };
  });

  // Test horizontal scroll on mobile
  await page.setViewport({ width: 375, height: 667 });
  await page.reload({ waitUntil: 'networkidle0' });
  await delay(2000);

  const scrollTest = await page.evaluate(() => {
    window.scrollTo(50, 0);
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      canScroll: window.scrollX > 0
    };
  });

  // Take screenshots
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(SITE_URL, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: '/tmp/praviel-desktop.png', fullPage: false });

  await page.setViewport({ width: 375, height: 667 });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.screenshot({ path: '/tmp/praviel-mobile.png', fullPage: false });

  // Get HTML snippet
  const htmlSnippet = await page.evaluate(() => {
    return document.body.innerHTML.substring(0, 500);
  });

  // Print comprehensive report
  console.log('\n' + '='.repeat(70));
  console.log('DIAGNOSTIC REPORT');
  console.log('='.repeat(70) + '\n');

  console.log('📄 PAGE INFO:');
  console.log(`   Title: ${pageInfo.title}`);
  console.log(`   Hero Text: ${pageInfo.heroText || 'NOT FOUND'}`);
  console.log(`   Has Loading Skeletons: ${pageInfo.hasLoadingSkeletons ? '❌ YES (BAD)' : '✅ NO (GOOD)'}`);
  console.log(`   Immersive Controls Visible: ${pageInfo.immersiveControlsVisible ? '✅ YES' : '❌ NO'}`);
  console.log(`   Comfort Controls Visible: ${pageInfo.comfortControlsVisible ? '✅ YES' : '❌ NO'}`);
  console.log(`   Waitlist Form Exists: ${pageInfo.waitlistFormExists ? '✅ YES' : '❌ NO'}`);

  console.log('\n🔴 CONSOLE ERRORS:');
  if (consoleMessages.errors.length === 0) {
    console.log('   ✅ No console errors');
  } else {
    consoleMessages.errors.forEach(err => console.log(`   ❌ ${err}`));
  }

  console.log('\n⚠️  CONSOLE WARNINGS:');
  if (consoleMessages.warnings.length === 0) {
    console.log('   ✅ No warnings');
  } else {
    consoleMessages.warnings.slice(0, 5).forEach(warn => console.log(`   ⚠️  ${warn}`));
  }

  console.log('\n💥 PAGE ERRORS:');
  if (pageErrors.length === 0) {
    console.log('   ✅ No page errors');
  } else {
    pageErrors.forEach(err => console.log(`   ❌ ${err}`));
  }

  console.log('\n📱 MOBILE HORIZONTAL SCROLL TEST:');
  console.log(`   ScrollWidth: ${scrollTest.scrollWidth}px`);
  console.log(`   ClientWidth: ${scrollTest.clientWidth}px`);
  console.log(`   Can Scroll Horizontally: ${scrollTest.canScroll ? '❌ YES (BAD)' : '✅ NO (GOOD)'}`);

  console.log('\n🎯 CRITICAL CHECKS:');
  console.log(`   React Hydration Error #418: ${hasHydrationError ? '❌ PRESENT (BAD)' : '✅ ABSENT (GOOD)'}`);
  console.log(`   Content Renders: ${!pageInfo.hasLoadingSkeletons ? '✅ YES' : '❌ NO (stuck on skeletons)'}`);
  console.log(`   Mobile Scroll Fixed: ${!scrollTest.canScroll ? '✅ YES' : '❌ NO'}`);

  console.log('\n📸 SCREENSHOTS:');
  console.log('   Desktop: /tmp/praviel-desktop.png');
  console.log('   Mobile: /tmp/praviel-mobile.png');

  console.log('\n📝 HTML SNIPPET (first 500 chars):');
  console.log(htmlSnippet);

  console.log('\n' + '='.repeat(70));
  console.log('END DIAGNOSTIC REPORT');
  console.log('='.repeat(70) + '\n');

  await browser.close();

  // Exit with error if critical issues found
  const hasCriticalIssues = hasHydrationError || pageInfo.hasLoadingSkeletons || scrollTest.canScroll;
  process.exit(hasCriticalIssues ? 1 : 0);
})();
