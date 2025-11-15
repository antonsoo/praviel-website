/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

const SITE_URL = 'https://praviel.com';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function testSite() {
  console.log('\n🧪 Testing praviel.com production site...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = { passed: [], failed: [], warnings: [] };
  const consoleErrors = [];
  const consoleWarnings = [];

  try {
    // Desktop test
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Capture console messages
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') {
        consoleErrors.push(text);
      } else if (type === 'warning') {
        consoleWarnings.push(text);
      }
    });

    // Test 1: Page loads
    console.log('📍 Test 1: Homepage loads');
    try {
      const response = await page.goto(SITE_URL, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      if (response.ok()) {
        results.passed.push('Homepage loads (200 OK)');
      } else {
        results.failed.push(`Homepage returned ${response.status()}`);
      }
    } catch (err) {
      results.failed.push(`Homepage failed to load: ${err.message}`);
    }

    await delay(3000);

    // Test 2: Check for React hydration errors
    console.log('📍 Test 2: React hydration errors');
    const hydrationErrors = consoleErrors.filter(err =>
      err.includes('Hydration') ||
      err.includes('#418') ||
      err.includes('did not match') ||
      err.includes('Warning: Text content did not match') ||
      err.includes('Warning: Prop')
    );

    if (hydrationErrors.length > 0) {
      results.failed.push(`${hydrationErrors.length} hydration errors found`);
      hydrationErrors.slice(0, 5).forEach(err => {
        console.error(`  ❌ ${err.substring(0, 200)}`);
      });
    } else {
      results.passed.push('No React hydration errors');
    }

    // Test 3: Check console errors
    console.log('📍 Test 3: Console errors');
    if (consoleErrors.length > 0) {
      results.warnings.push(`${consoleErrors.length} console errors`);
      consoleErrors.slice(0, 3).forEach(err => {
        console.warn(`  ⚠️  ${err.substring(0, 150)}`);
      });
    } else {
      results.passed.push('No console errors');
    }

    // Test 4: Hero title visible
    console.log('📍 Test 4: Hero content');
    const heroTitle = await page.$('h1');
    if (heroTitle) {
      const titleText = await page.evaluate(el => el.textContent, heroTitle);
      if (titleText && titleText.includes('Read the originals')) {
        results.passed.push('Hero title correct');
      } else {
        results.failed.push(`Hero title incorrect: "${titleText}"`);
      }
    } else {
      results.failed.push('Hero title not found');
    }

    // Test 5: Immersive/Comfort controls visible
    console.log('📍 Test 5: Immersive/Comfort controls');
    const immersiveText = await page.evaluate(() => {
      const elem = document.querySelector('#immersive-toggle-title');
      return elem ? elem.textContent : null;
    });

    const comfortText = await page.evaluate(() => {
      const elem = document.querySelector('#comfort-controls-title');
      return elem ? elem.textContent : null;
    });

    if (immersiveText && comfortText) {
      results.passed.push('Immersive & Comfort controls visible');

      // Check their position relative to viewport
      const immersivePos = await page.evaluate(() => {
        const elem = document.querySelector('#immersive-toggle-title');
        return elem ? elem.getBoundingClientRect().top : null;
      });

      if (immersivePos && immersivePos < 2000) {
        results.passed.push('Controls appear reasonably high on page');
      } else {
        results.warnings.push(`Controls at ${Math.round(immersivePos)}px (might be too low)`);
      }
    } else {
      results.failed.push('Immersive/Comfort controls not found');
    }

    // Test 6: Check for broken images
    console.log('📍 Test 6: Images');
    const brokenImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter(img => !img.complete || img.naturalWidth === 0)
        .map(img => img.src);
    });

    if (brokenImages.length > 0) {
      results.warnings.push(`${brokenImages.length} broken/unloaded images`);
      brokenImages.slice(0, 3).forEach(src => {
        console.warn(`  ⚠️  ${src}`);
      });
    } else {
      results.passed.push('All images loaded');
    }

    // Test 7: Mobile responsiveness
    console.log('📍 Test 7: Mobile viewport');
    await page.setViewport({ width: 375, height: 667 });
    await page.reload({ waitUntil: 'networkidle2' });
    await delay(2000);

    const canScrollHorizontally = await page.evaluate(() => {
      // Try to scroll horizontally and check if it actually moved
      window.scrollTo(50, 0);
      return window.scrollX > 0;
    });

    if (canScrollHorizontally) {
      results.failed.push('Mobile has horizontal scroll');
    } else {
      results.passed.push('No horizontal scroll on mobile');
    }

    // Test 8: Mobile menu button
    console.log('📍 Test 8: Mobile menu');
    const mobileMenuBtn = await page.$('[aria-label*="menu"], [aria-label*="Menu"], button.mobile-menu-toggle');
    if (mobileMenuBtn) {
      results.passed.push('Mobile menu button exists');

      // Try to click it
      try {
        await mobileMenuBtn.click();
        await delay(500);
        results.passed.push('Mobile menu clickable');
      } catch (_err) {
        results.warnings.push('Mobile menu click failed');
      }
    } else {
      results.warnings.push('Mobile menu button not found');
    }

    // Test 9: Waitlist section
    console.log('📍 Test 9: Waitlist form');
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${SITE_URL}#waitlist`, { waitUntil: 'networkidle2' });
    await delay(1000);

    const emailInput = await page.$('input[type="email"]');
    if (emailInput) {
      results.passed.push('Waitlist email input exists');
    } else {
      results.warnings.push('Waitlist email input not found');
    }

    // Test 10: Check key pages load
    console.log('📍 Test 10: Other pages');
    const testPages = ['/blog', '/fund', '/privacy'];
    for (const testPage of testPages) {
      try {
        const response = await page.goto(`${SITE_URL}${testPage}`, { timeout: 10000 });
        if (response.ok()) {
          results.passed.push(`${testPage} loads`);
        } else {
          results.failed.push(`${testPage} returned ${response.status()}`);
        }
      } catch (err) {
        results.failed.push(`${testPage} failed: ${err.message}`);
      }
    }

    // Test 11: Analytics script
    console.log('📍 Test 11: Analytics');
    await page.goto(SITE_URL, { waitUntil: 'networkidle2' });
    const analyticsScript = await page.evaluate(() => {
      return document.querySelector('script[data-domain="praviel.com"]') !== null;
    });

    if (analyticsScript) {
      results.passed.push('Plausible analytics script loaded');
    } else {
      results.warnings.push('Plausible analytics script not found');
    }

  } catch (error) {
    results.failed.push(`Test suite error: ${error.message}`);
    console.error('❌ Test error:', error);
  } finally {
    await browser.close();
  }

  // Print results
  console.log('\n' + '='.repeat(70));
  console.log('TEST RESULTS');
  console.log('='.repeat(70));

  console.log(`\n✅ PASSED (${results.passed.length}):`);
  results.passed.forEach(test => console.log(`  ✅ ${test}`));

  if (results.warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${results.warnings.length}):`);
    results.warnings.forEach(test => console.log(`  ⚠️  ${test}`));
  }

  if (results.failed.length > 0) {
    console.log(`\n❌ FAILED (${results.failed.length}):`);
    results.failed.forEach(test => console.log(`  ❌ ${test}`));
  }

  console.log('\n' + '='.repeat(70));
  console.log(`\nTotal Console Messages:`);
  console.log(`  Errors: ${consoleErrors.length}`);
  console.log(`  Warnings: ${consoleWarnings.length}`);

  const exitCode = results.failed.length > 0 ? 1 : 0;
  process.exit(exitCode);
}

testSite();
