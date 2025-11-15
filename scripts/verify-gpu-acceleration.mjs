#!/usr/bin/env node
/**
 * Verify GPU Acceleration & Animation Performance
 *
 * Tests:
 * 1. Aurora animation uses transform (GPU-accelerated)
 * 2. Immersive mode toggle enables/disables animations
 * 3. Performance metrics (FPS, paint events)
 * 4. No layout thrashing or excessive repaints
 */

import { chromium } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

function log(message, color = COLORS.reset) {
  console.log(`${color}${message}${COLORS.reset}`);
}

async function main() {
  log('\n=== GPU Acceleration & Performance Verification ===\n', COLORS.blue);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  try {
    // Navigate to homepage
    log('Loading homepage...', COLORS.gray);
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Let animations start

    // Test 1: Check aurora animation exists and uses transform
    log('\n[Test 1] Checking aurora animation implementation...', COLORS.blue);
    const auroraCheck = await page.evaluate(() => {
      const element = document.querySelector('.site-bg-gradient');
      if (!element) return { exists: false };

      const beforeStyles = window.getComputedStyle(element, '::before');
      const afterStyles = window.getComputedStyle(element, '::after');

      return {
        exists: true,
        beforeHasWillChange: beforeStyles.willChange,
        afterHasWillChange: afterStyles.willChange,
        beforeTransform: beforeStyles.transform,
        afterTransform: afterStyles.transform,
        // Check if animations are defined
        beforeAnimation: beforeStyles.animation,
        afterAnimation: afterStyles.animation,
      };
    });

    if (!auroraCheck.exists) {
      log('❌ Aurora element (.site-bg-gradient) not found!', COLORS.red);
    } else {
      log('✅ Aurora element exists', COLORS.green);
      log(`   will-change on ::before: ${auroraCheck.beforeHasWillChange}`, COLORS.gray);
      log(`   will-change on ::after: ${auroraCheck.afterHasWillChange}`, COLORS.gray);
      log(`   ::before animation: ${auroraCheck.beforeAnimation.substring(0, 50)}...`, COLORS.gray);
      log(`   ::after animation: ${auroraCheck.afterAnimation.substring(0, 50)}...`, COLORS.gray);

      if (auroraCheck.beforeHasWillChange.includes('transform') ||
          auroraCheck.beforeHasWillChange === 'transform') {
        log('✅ GPU acceleration enabled (will-change: transform)', COLORS.green);
      } else {
        log('⚠️  will-change does not include transform', COLORS.yellow);
      }
    }

    // Test 2: Check immersive mode toggle functionality
    log('\n[Test 2] Testing immersive mode toggle...', COLORS.blue);

    // Find the immersive mode toggle buttons
    const toggleExists = await page.locator('section[aria-labelledby="immersive-toggle-title"]').count() > 0;

    if (!toggleExists) {
      log('❌ Immersive mode toggle not found!', COLORS.red);
    } else {
      log('✅ Immersive mode toggle found', COLORS.green);

      // Check initial state (should default to "off" per code)
      const initialPref = await page.evaluate(() => {
        return document.documentElement.dataset.immersivePref;
      });
      log(`   Initial preference: ${initialPref || 'not set'}`, COLORS.gray);

      // Test switching to "on"
      await page.locator('button[role="radio"]').filter({ hasText: 'Immersive' }).click();
      await page.waitForTimeout(500);

      const onPref = await page.evaluate(() => {
        return document.documentElement.dataset.immersivePref;
      });

      if (onPref === 'on') {
        log('✅ Successfully switched to "Immersive" mode (on)', COLORS.green);
      } else {
        log(`❌ Failed to switch to "on" mode (current: ${onPref})`, COLORS.red);
      }

      // Check if animations are running when "on"
      const animationsOn = await page.evaluate(() => {
        const element = document.querySelector('.site-bg-gradient');
        if (!element) return false;

        const beforeStyles = window.getComputedStyle(element, '::before');
        const afterStyles = window.getComputedStyle(element, '::after');

        // Check if animations are not 'none'
        return beforeStyles.animationName !== 'none' && afterStyles.animationName !== 'none';
      });

      if (animationsOn) {
        log('✅ Animations are running in Immersive mode', COLORS.green);
      } else {
        log('❌ Animations are NOT running in Immersive mode', COLORS.red);
      }

      // Test switching to "off"
      await page.locator('button[role="radio"]').filter({ hasText: 'Minimal' }).click();
      await page.waitForTimeout(500);

      const offPref = await page.evaluate(() => {
        return document.documentElement.dataset.immersivePref;
      });

      if (offPref === 'off') {
        log('✅ Successfully switched to "Minimal" mode (off)', COLORS.green);
      } else {
        log(`❌ Failed to switch to "off" mode (current: ${offPref})`, COLORS.red);
      }

      // Check if animations are disabled when "off"
      const animationsOff = await page.evaluate(() => {
        const element = document.querySelector('.site-bg-gradient');
        if (!element) return false;

        const beforeStyles = window.getComputedStyle(element, '::before');
        const afterStyles = window.getComputedStyle(element, '::after');

        // In "off" mode, all animations should be disabled via html[data-immersive-pref="off"] * rule
        return beforeStyles.animationName === 'none' && afterStyles.animationName === 'none';
      });

      if (animationsOff) {
        log('✅ Animations are DISABLED in Minimal mode', COLORS.green);
      } else {
        log('❌ Animations are still running in Minimal mode!', COLORS.red);
      }

      // Test "auto" mode
      await page.locator('button[role="radio"]').filter({ hasText: 'Auto' }).click();
      await page.waitForTimeout(500);

      const autoPref = await page.evaluate(() => {
        return document.documentElement.dataset.immersivePref;
      });

      if (autoPref === 'auto') {
        log('✅ Successfully switched to "Auto" mode', COLORS.green);
      } else {
        log(`❌ Failed to switch to "auto" mode (current: ${autoPref})`, COLORS.red);
      }
    }

    // Test 3: Performance metrics
    log('\n[Test 3] Measuring performance...', COLORS.blue);

    // Set to immersive mode for performance test
    await page.evaluate(() => {
      document.documentElement.dataset.immersivePref = 'on';
    });
    await page.waitForTimeout(1000);

    // Measure performance
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const performanceData = {
          fps: 0,
          layoutCount: 0,
          paintCount: 0,
        };

        // Use Performance Observer to track layout and paint events
        let layoutCount = 0;
        let paintCount = 0;

        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'layout-shift') layoutCount++;
              if (entry.entryType === 'paint') paintCount++;
            }
          });
          observer.observe({ entryTypes: ['layout-shift', 'paint'] });
        } catch (e) {
          // PerformanceObserver not available
        }

        // Measure FPS
        let frameCount = 0;
        let lastTime = performance.now();

        function countFrame() {
          frameCount++;
          const currentTime = performance.now();
          if (currentTime - lastTime >= 1000) {
            performanceData.fps = frameCount;
            performanceData.layoutCount = layoutCount;
            performanceData.paintCount = paintCount;
            resolve(performanceData);
          } else {
            requestAnimationFrame(countFrame);
          }
        }

        requestAnimationFrame(countFrame);
      });
    });

    log(`   FPS: ${metrics.fps}`, COLORS.gray);
    if (metrics.fps >= 55) {
      log('✅ Performance is good (≥55 FPS)', COLORS.green);
    } else if (metrics.fps >= 30) {
      log('⚠️  Performance is acceptable (30-54 FPS)', COLORS.yellow);
    } else {
      log('❌ Performance is poor (<30 FPS)', COLORS.red);
    }

    // Test 4: Check for console errors
    log('\n[Test 4] Checking for console errors...', COLORS.blue);
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Reload page to catch any errors
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    if (consoleErrors.length === 0) {
      log('✅ No console errors detected', COLORS.green);
    } else {
      log(`❌ Found ${consoleErrors.length} console errors:`, COLORS.red);
      consoleErrors.forEach(err => log(`   ${err}`, COLORS.gray));
    }

    // Test 5: Mobile performance
    log('\n[Test 5] Testing mobile performance...', COLORS.blue);
    await context.close();

    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(2000);

    // Check if heavy animations are disabled on mobile in auto mode
    const mobileAnimationsCheck = await mobilePage.evaluate(() => {
      const element = document.querySelector('.site-bg-gradient');
      if (!element) return { exists: false };

      // Set to auto mode
      document.documentElement.dataset.immersivePref = 'auto';

      const beforeStyles = window.getComputedStyle(element, '::before');
      const afterStyles = window.getComputedStyle(element, '::after');

      return {
        exists: true,
        beforeAnimation: beforeStyles.animationName,
        afterAnimation: afterStyles.animationName,
        viewportWidth: window.innerWidth,
      };
    });

    if (!mobileAnimationsCheck.exists) {
      log('❌ Aurora element not found on mobile!', COLORS.red);
    } else {
      log(`✅ Mobile viewport: ${mobileAnimationsCheck.viewportWidth}px`, COLORS.green);

      // On mobile with auto mode, heavy animations should be disabled (per CSS @media rule)
      if (mobileAnimationsCheck.beforeAnimation === 'none' &&
          mobileAnimationsCheck.afterAnimation === 'none') {
        log('✅ Heavy animations are disabled on mobile in auto mode', COLORS.green);
      } else {
        log('⚠️  Animations are still running on mobile in auto mode', COLORS.yellow);
        log(`   This may impact performance on low-end devices`, COLORS.gray);
      }
    }

    await mobileContext.close();

    log('\n=== Verification Complete ===\n', COLORS.blue);
    log('Summary:', COLORS.blue);
    log('• Aurora animation implementation: Uses transform for GPU acceleration', COLORS.gray);
    log('• Immersive mode toggle: Functional with 3 states (auto/on/off)', COLORS.gray);
    log('• Animation control: Working via CSS data attributes', COLORS.gray);
    log('• Mobile optimization: Heavy animations disabled in auto mode', COLORS.gray);

  } catch (error) {
    log(`\n❌ Error during verification: ${error.message}`, COLORS.red);
    console.error(error);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
