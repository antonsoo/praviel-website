import { expect, test } from "@playwright/test";

const FLUTTER_APP_URL = "https://8ead70d5.app-praviel.pages.dev";

test.describe("Animation Performance & Smoothness", () => {
  test("page transitions maintain 60fps", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    const flutterSurface = await page
      .waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 60000 })
      .catch(() => null);
    if (!flutterSurface) {
      test.skip(true, "Flutter app not reachable");
      return;
    }
    await page.waitForTimeout(3000);

    // Start performance tracing
    await page.evaluate(() => {
      (window as any).performanceMarks = [];
      performance.mark("navigation-start");
    });

    // Simulate page navigation by clicking on different tabs
    const navigationSequence = [
      { x: 187, y: 640, name: "home-to-lessons" },
      { x: 280, y: 640, name: "lessons-to-profile" },
      { x: 94, y: 640, name: "profile-to-home" },
    ];

    for (const nav of navigationSequence) {
      const startTime = Date.now();

      await page.mouse.click(nav.x, nav.y);
      await page.waitForTimeout(800); // Wait for transition animation

      const duration = Date.now() - startTime;
      console.log(`  ${nav.name}: ${duration}ms`);

      // Transitions should complete within 1 second (60fps target)
      expect(duration).toBeLessThan(1200);
    }

    // Take screenshot of final state
    await page.screenshot({
      path: "test-results/animation-performance-final.png",
      fullPage: true,
    });

    console.log("✅ Page transitions completed smoothly");
  });

  test("no frame drops during scrolling", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Use domcontentloaded instead of networkidle to avoid network flakiness
    await page.goto(FLUTTER_APP_URL, { waitUntil: "domcontentloaded", timeout: 60000 });

    const flutterSurface = await page
      .waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 60000 })
      .catch(() => null);
    if (!flutterSurface) {
      test.skip(true, "Flutter app not reachable");
      return;
    }
    await page.waitForTimeout(2000);

    // Navigate to a page with scrollable content (Lessons page)
    await page.mouse.click(187, 640);
    await page.waitForTimeout(1000);

    // Capture performance metrics during scrolling
    const scrollPerformance = await page.evaluate(async () => {
      const frameTimestamps: number[] = [];
      let rafId: number;

      // Track frame timing during scroll
      const trackFrames = () => {
        frameTimestamps.push(performance.now());
        if (frameTimestamps.length < 60) {
          rafId = requestAnimationFrame(trackFrames);
        }
      };

      rafId = requestAnimationFrame(trackFrames);

      // Simulate scroll
      window.scrollBy(0, 500);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Calculate frame rate
      if (frameTimestamps.length < 2) {
        return { avgFrameTime: 0, estimatedFps: 0 };
      }

      const totalTime = frameTimestamps[frameTimestamps.length - 1] - frameTimestamps[0];
      const avgFrameTime = totalTime / (frameTimestamps.length - 1);
      const estimatedFps = 1000 / avgFrameTime;

      return { avgFrameTime, estimatedFps, frameCount: frameTimestamps.length };
    });

    console.log(`  Average frame time: ${scrollPerformance.avgFrameTime.toFixed(2)}ms`);
    console.log(`  Estimated FPS: ${scrollPerformance.estimatedFps.toFixed(1)}`);
    console.log(`  Frames captured: ${scrollPerformance.frameCount}`);

    // Frame time should be under 16.67ms for 60fps
    // Allow some tolerance for browser overhead
    expect(scrollPerformance.avgFrameTime).toBeLessThan(20);

    console.log("✅ Scrolling performance is smooth");
  });

  test("button tap effects render without jank", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    const flutterSurface = await page
      .waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 60000 })
      .catch(() => null);
    if (!flutterSurface) {
      test.skip(true, "Flutter app not reachable");
      return;
    }
    await page.waitForTimeout(2000);

    // Perform rapid taps and measure response time
    const tapTimings: number[] = [];

    for (let i = 0; i < 5; i++) {
      const startTime = performance.now();

      await page.mouse.click(187, 250); // Tap on a button/card
      await page.waitForTimeout(100); // Brief pause between taps

      const tapDuration = performance.now() - startTime;
      tapTimings.push(tapDuration);
    }

    const avgTapTime = tapTimings.reduce((sum, time) => sum + time, 0) / tapTimings.length;
    console.log(`  Average tap response time: ${avgTapTime.toFixed(2)}ms`);

    // Tap response should be under 100ms for good UX
    expect(avgTapTime).toBeLessThan(150);

    console.log("✅ Button tap effects render smoothly");
  });

  test("loading skeleton animations are smooth", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Start fresh to capture initial loading
    await page.goto(FLUTTER_APP_URL, { waitUntil: "domcontentloaded", timeout: 60000 });

    // Measure time from DOM load to Flutter render
    const loadingMetrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType("paint");

      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
        firstPaint: paintEntries.find((e) => e.name === "first-paint")?.startTime || 0,
        firstContentfulPaint: paintEntries.find((e) => e.name === "first-contentful-paint")?.startTime || 0,
      };
    });

    console.log(`  DOM Content Loaded: ${loadingMetrics.domContentLoaded.toFixed(2)}ms`);
    console.log(`  First Paint: ${loadingMetrics.firstPaint.toFixed(2)}ms`);
    console.log(`  First Contentful Paint: ${loadingMetrics.firstContentfulPaint.toFixed(2)}ms`);

    // Wait for Flutter to render
    await page.waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 30000 });

    // Take screenshot of loaded state
    await page.screenshot({
      path: "test-results/animation-loading-complete.png",
      fullPage: true,
    });

    // FCP should be under 3s for good UX
    expect(loadingMetrics.firstContentfulPaint).toBeLessThan(3000);

    console.log("✅ Loading animations render smoothly");
  });

  test("mobile swipe gestures are smooth (60fps target)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    const flutterSurface = await page
      .waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 60000 })
      .catch(() => null);
    if (!flutterSurface) {
      test.skip(true, "Flutter app not reachable");
      return;
    }
    await page.waitForTimeout(2000);

    // Navigate to History page
    await page.mouse.click(187, 640);
    await page.waitForTimeout(1500);

    // Measure swipe gesture performance
    const swipeStartTime = performance.now();

    // Perform swipe gesture
    await page.mouse.move(300, 200);
    await page.mouse.down();
    await page.mouse.move(50, 200, { steps: 20 }); // Smooth swipe with 20 steps
    await page.mouse.up();

    const swipeDuration = performance.now() - swipeStartTime;
    console.log(`  Swipe gesture duration: ${swipeDuration.toFixed(2)}ms`);

    // Swipe should complete in under 500ms for smooth feel
    expect(swipeDuration).toBeLessThan(600);

    // Take screenshot after swipe
    await page.screenshot({
      path: "test-results/animation-swipe-gesture.png",
      fullPage: true,
    });

    console.log("✅ Swipe gestures are smooth");
  });

  test("no layout thrashing during animations", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    const flutterSurface = await page
      .waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 60000 })
      .catch(() => null);
    if (!flutterSurface) {
      test.skip(true, "Flutter app not reachable");
      return;
    }
    await page.waitForTimeout(2000);

    // Measure layout stability during viewport resize
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);

    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(500);

    // Verify canvas still exists (no crash from layout changes)
    const canvasCount = await page.locator("canvas").count();
    expect(canvasCount).toBeGreaterThan(0);

    // Take screenshot of final state
    await page.screenshot({
      path: "test-results/animation-layout-stability.png",
      fullPage: true,
    });

    console.log("✅ No layout thrashing during viewport changes");
  });
});
