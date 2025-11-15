import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  const warnings = [];
  const results = {};

  // Capture console messages
  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error') errors.push(text);
    else if (msg.type() === 'warning') warnings.push(text);
  });

  page.on('pageerror', error => errors.push(error.message));

  console.log('\n🔬 COMPREHENSIVE PRODUCTION TEST');
  console.log('='.repeat(70));

  // Test 1: Page loads
  console.log('\n📊 TEST 1: Page Load & Performance');
  const startTime = Date.now();
  await page.goto('https://praviel.com', { waitUntil: 'networkidle0', timeout: 30000 });
  const loadTime = Date.now() - startTime;
  results.loadTime = loadTime;
  console.log(`  ✅ Page loaded in ${loadTime}ms`);

  // Get performance metrics
  const metrics = await page.metrics();
  results.jsHeap = (metrics.JSHeapUsedSize / 1024 / 1024).toFixed(2);
  results.domNodes = metrics.Nodes;
  console.log(`  📈 JS Heap: ${results.jsHeap} MB, DOM Nodes: ${results.domNodes}`);

  // Test 2: Check initial immersive state
  console.log('\n🎬 TEST 2: Immersive Mode Initial State');
  const initialPref = await page.evaluate(() => document.documentElement.dataset.immersivePref);
  const initialAnimations = await page.evaluate(() => document.getAnimations().length);
  results.initialPref = initialPref;
  results.initialAnimations = initialAnimations;
  console.log(`  Initial Pref: "${initialPref}"`);
  console.log(`  Initial Animations: ${initialAnimations}`);
  console.log(initialAnimations === 0 ? '  ✅ Animations disabled by default' : '  ⚠️  Animations are running');

  // Test 3: Find immersive toggle
  console.log('\n🔍 TEST 3: Finding Immersive Mode Toggle');
  const toggleButtons = await page.evaluate(() => {
    // Look for buttons with "Auto", "Immersive", "Minimal" text
    const buttons = Array.from(document.querySelectorAll('button[role="radio"]'));
    return buttons.map(btn => ({
      text: btn.textContent?.trim().split('\n')[0],
      ariaChecked: btn.getAttribute('aria-checked'),
      exists: true
    }));
  });

  if (toggleButtons.length > 0) {
    console.log(`  ✅ Found ${toggleButtons.length} toggle buttons:`);
    toggleButtons.forEach(btn => {
      console.log(`     - "${btn.text}" (checked: ${btn.ariaChecked})`);
    });
  } else {
    console.log('  ❌ No toggle buttons found');
  }
  results.toggleFound = toggleButtons.length > 0;

  // Test 4: Toggle to "Immersive" and measure animations
  if (toggleButtons.length > 0) {
    console.log('\n🎭 TEST 4: Toggle to Immersive Mode');
    const clicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button[role="radio"]'));
      const immersiveBtn = buttons.find(btn => btn.textContent?.includes('Immersive'));
      if (immersiveBtn) {
        immersiveBtn.click();
        return true;
      }
      return false;
    });

    if (clicked) {
      // Wait for state to update
      await new Promise(resolve => setTimeout(resolve(500);

      const afterPref = await page.evaluate(() => document.documentElement.dataset.immersivePref);
      const afterAnimations = await page.evaluate(() => document.getAnimations().length);
      results.afterPref = afterPref;
      results.afterAnimations = afterAnimations;

      console.log(`  After Pref: "${afterPref}"`);
      console.log(`  After Animations: ${afterAnimations}`);

      if (afterAnimations > initialAnimations) {
        console.log(`  ✅ Animations enabled (${initialAnimations} → ${afterAnimations}, +${afterAnimations - initialAnimations})`);
      } else {
        console.log(`  ❌ Animations NOT enabled (still ${afterAnimations})`);
      }
    } else {
      console.log('  ❌ Could not click Immersive button');
    }
  }

  // Test 5: Mobile viewport test
  console.log('\n📱 TEST 5: Mobile Viewport');
  await page.setViewport({ width: 375, height: 667 });
  await new Promise(resolve => setTimeout(resolve(500);

  const horizontalScroll = await page.evaluate(() => {
    window.scrollTo(100, 0);
    return window.scrollX;
  });

  if (horizontalScroll === 0) {
    console.log('  ✅ Horizontal scroll prevented');
  } else {
    console.log(`  ❌ Horizontal scroll detected (scrollX: ${horizontalScroll})`);
  }
  results.horizontalScrollPrevented = horizontalScroll === 0;

  // Test 6: Check for VoiceTour and JourneyTimeline removal
  console.log('\n🗑️  TEST 6: Component Removal Verification');
  const removedComponents = await page.evaluate(() => {
    const voiceTour = !!document.querySelector('[class*="VoiceTour"]');
    const journeyTimeline = !!document.querySelector('[class*="JourneyTimeline"]');
    return { voiceTour, journeyTimeline };
  });

  console.log(`  VoiceTour present: ${removedComponents.voiceTour ? '❌ STILL EXISTS' : '✅ Removed'}`);
  console.log(`  JourneyTimeline present: ${removedComponents.journeyTimeline ? '❌ STILL EXISTS' : '✅ Removed'}`);
  results.voiceTourRemoved = !removedComponents.voiceTour;
  results.journeyTimelineRemoved = !removedComponents.journeyTimeline;

  // Test 7: Waitlist form exists
  console.log('\n📝 TEST 7: Waitlist Form');
  const formExists = await page.evaluate(() => {
    const emailInput = document.querySelector('input[type="email"]');
    const submitBtn = document.querySelector('button[type="submit"]');
    return { emailInput: !!emailInput, submitBtn: !!submitBtn };
  });

  console.log(`  Email input: ${formExists.emailInput ? '✅ Found' : '❌ Not found'}`);
  console.log(`  Submit button: ${formExists.submitBtn ? '✅ Found' : '❌ Not found'}`);
  results.waitlistFormExists = formExists.emailInput && formExists.submitBtn;

  // Test 8: Console errors/warnings
  console.log('\n🐛 TEST 8: Console Output');
  console.log(`  Errors: ${errors.length === 0 ? '✅ None' : `❌ ${errors.length}`}`);
  if (errors.length > 0) {
    errors.slice(0, 3).forEach(err => console.log(`     - ${err}`));
  }
  console.log(`  Warnings: ${warnings.length === 0 ? '✅ None' : `⚠️  ${warnings.length}`}`);
  results.consoleErrors = errors.length;
  results.consoleWarnings = warnings.length;

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 SUMMARY');
  console.log('='.repeat(70));

  const passed = [
    results.loadTime < 10000,
    results.initialAnimations === 0,
    results.toggleFound,
    results.horizontalScrollPrevented,
    results.voiceTourRemoved,
    results.journeyTimelineRemoved,
    results.waitlistFormExists,
    results.consoleErrors === 0
  ].filter(Boolean).length;

  console.log(`\nTests Passed: ${passed}/8`);
  console.log(`Load Time: ${results.loadTime}ms`);
  console.log(`Initial Animations: ${results.initialAnimations} (should be 0)`);
  console.log(`Immersive Toggle: ${results.toggleFound ? '✅' : '❌'}`);
  console.log(`Mobile Scroll Fix: ${results.horizontalScrollPrevented ? '✅' : '❌'}`);
  console.log(`Components Removed: ${results.voiceTourRemoved && results.journeyTimelineRemoved ? '✅' : '❌'}`);
  console.log(`Waitlist Form: ${results.waitlistFormExists ? '✅' : '❌'}`);
  console.log(`Console Clean: ${results.consoleErrors === 0 ? '✅' : '❌'}`);

  if (results.afterAnimations !== undefined) {
    console.log(`\nImmersive Mode Works: ${results.afterAnimations > results.initialAnimations ? '✅' : '❌'}`);
    console.log(`  ${results.initialAnimations} → ${results.afterAnimations} animations`);
  }

  console.log('\n' + '='.repeat(70));

  await browser.close();
})();
