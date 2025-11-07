import { expect, test } from "@playwright/test";

const FLUTTER_APP_URL = "https://8ead70d5.app-praviel.pages.dev";

test.describe("Spacing Consistency Audit", () => {
  test("captures spacing on all major pages for manual inspection", async ({ page }) => {
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

    // Pages to audit for spacing
    const pages = [
      { name: "home", navX: 94, navY: 640 },
      { name: "lessons", navX: 187, navY: 640 },
      { name: "profile", navX: 280, navY: 640 },
      { name: "reading", navX: 187, navY: 250 }, // Click on a lesson card
    ];

    // Take full-page screenshots of each page
    for (const pageDef of pages) {
      await page.mouse.click(pageDef.navX, pageDef.navY);
      await page.waitForTimeout(1500); // Wait for navigation

      await page.screenshot({
        path: `test-results/spacing-${pageDef.name}-desktop.png`,
        fullPage: true,
      });
    }

    console.log("✅ Desktop spacing screenshots captured");

    // Reset to home
    await page.mouse.click(94, 640);
    await page.waitForTimeout(1000);

    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    // Take mobile screenshots
    for (const pageDef of pages) {
      await page.mouse.click(pageDef.navX, pageDef.navY);
      await page.waitForTimeout(1500);

      await page.screenshot({
        path: `test-results/spacing-${pageDef.name}-mobile.png`,
        fullPage: true,
      });
    }

    console.log("✅ Mobile spacing screenshots captured");
    console.log("\n📐 Spacing Guidelines (for manual verification):");
    console.log("  - Card padding: 16dp");
    console.log("  - Section margins: 24dp");
    console.log("  - Button spacing: 12dp minimum");
    console.log("  - List item spacing: 8dp");
    console.log("  - Text line height: 1.5x font size");
    console.log("\n📸 Screenshots saved to test-results/spacing-*");
  });

  test("no horizontal overflow on mobile viewport", async ({ page }) => {
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

    // Check for horizontal scrolling
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalScroll, "Page should not have horizontal overflow").toBe(false);

    // Navigate through pages and check each one
    const pages = [
      { name: "lessons", navX: 187, navY: 640 },
      { name: "profile", navX: 280, navY: 640 },
    ];

    for (const pageDef of pages) {
      await page.mouse.click(pageDef.navX, pageDef.navY);
      await page.waitForTimeout(1000);

      const hasOverflow = await page.evaluate(() => {
        return document.body.scrollWidth > window.innerWidth;
      });

      expect(hasOverflow, `${pageDef.name} should not have horizontal overflow`).toBe(false);
    }

    console.log("✅ No horizontal overflow detected on mobile");
  });

  test("consistent spacing at different viewport sizes", async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: "mobile" },
      { width: 768, height: 1024, name: "tablet" },
      { width: 1440, height: 900, name: "desktop" },
    ];

    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(1000); // Allow reflow

      const flutterSurface = await page
        .waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 60000 })
        .catch(() => null);
      if (!flutterSurface) {
        test.skip(true, "Flutter app not reachable");
        return;
      }

      // Take screenshot at this viewport
      await page.screenshot({
        path: `test-results/spacing-responsive-${viewport.name}.png`,
        fullPage: false, // Just the viewport
      });

      // Verify no horizontal scrolling
      const hasOverflow = await page.evaluate(() => {
        return document.body.scrollWidth > window.innerWidth;
      });

      expect(hasOverflow, `${viewport.name} should not overflow`).toBe(false);
    }

    console.log("✅ Responsive spacing screenshots captured");
    console.log("📸 Compare spacing at different viewports:");
    console.log("  - test-results/spacing-responsive-mobile.png (375px)");
    console.log("  - test-results/spacing-responsive-tablet.png (768px)");
    console.log("  - test-results/spacing-responsive-desktop.png (1440px)");
  });

  test("text has proper line height and spacing", async ({ page }) => {
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

    // Navigate to a text-heavy page (Reading page)
    await page.mouse.click(187, 250); // Click on a lesson
    await page.waitForTimeout(2000); // Wait for reading page to load

    // Take screenshot for manual inspection of text spacing
    await page.screenshot({
      path: "test-results/spacing-text-reading-page.png",
      fullPage: true,
    });

    console.log("✅ Text spacing screenshot captured");
    console.log("📖 Manual verification needed:");
    console.log("  - Line height should be 1.5x font size minimum");
    console.log("  - Paragraph spacing should be 1.5-2x line height");
    console.log("  - Text should not feel cramped or too loose");
  });

  test("button spacing meets minimum touch target requirements", async ({ page }) => {
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

    // Take screenshot of bottom navigation (has multiple buttons)
    await page.screenshot({
      path: "test-results/spacing-buttons-mobile.png",
      fullPage: false,
    });

    // Navigate to profile page (likely has action buttons)
    await page.mouse.click(280, 640);
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: "test-results/spacing-buttons-profile.png",
      fullPage: true,
    });

    console.log("✅ Button spacing screenshots captured");
    console.log("🎯 Touch target requirements:");
    console.log("  - Minimum 48x48dp touch target (WCAG 2.2)");
    console.log("  - Minimum 12dp spacing between buttons");
    console.log("  - Verify no overlapping tap areas");
  });

  test("card spacing is consistent across pages", async ({ page }) => {
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

    // Navigate to Lessons page (has cards)
    await page.mouse.click(187, 640);
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: "test-results/spacing-cards-lessons.png",
      fullPage: true,
    });

    // Navigate to Home page (also has cards)
    await page.mouse.click(94, 640);
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: "test-results/spacing-cards-home.png",
      fullPage: true,
    });

    console.log("✅ Card spacing screenshots captured");
    console.log("📦 Card spacing guidelines:");
    console.log("  - Card padding: 16dp");
    console.log("  - Card margin: 8-12dp between cards");
    console.log("  - Section margins: 24dp");
    console.log("  - Verify consistent spacing across all pages");
  });
});
