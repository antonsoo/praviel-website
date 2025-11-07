import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

import { MARKETING_EXCERPTS } from "@/app/test/data/marketing-excerpts";

async function revealSection(page: Page, sectionId: string) {
  // The sections are lazy-loaded via ClientSectionGate + IntersectionObserver
  // We need to ensure the page is fully hydrated before scrolling triggers the observers

  // Wait for page to be fully loaded and hydrated
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000); // Give React time to hydrate client components

  // Scroll in stages to progressively trigger IntersectionObservers
  // (scrolling to bottom immediately might skip intermediate sections)
  const scrollSteps = 8;
  for (let i = 1; i <= scrollSteps; i++) {
    await page.evaluate((step) => {
      const targetY = (document.body.scrollHeight * step) / 8;
      window.scrollTo({ top: targetY, behavior: "instant" });
    }, i);

    // Check if our target section loaded
    const section = page.locator(`section[aria-labelledby="${sectionId}"]`);
    const count = await section.count();
    if (count > 0) {
      await section.scrollIntoViewIfNeeded();
      await section.waitFor({ state: "visible", timeout: 5000 });
      await page.waitForTimeout(500);
      return;
    }

    // Wait a bit for the observer to trigger and component to load
    await page.waitForTimeout(500);
  }

  // If we get here, section never loaded - provide debug info
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  const allSections = await page.locator('section[aria-labelledby]').count();
  const allSectionIds = await page.locator('section[aria-labelledby]').evaluateAll((sections) =>
    sections.map((s) => s.getAttribute('aria-labelledby'))
  );

  throw new Error(
    `Section with aria-labelledby="${sectionId}" never loaded after ${scrollSteps} scroll steps.\n` +
    `Body height: ${bodyHeight}px\n` +
    `Sections found: ${allSections}\n` +
    `Section IDs: ${allSectionIds.join(', ')}`
  );
}

test.describe("Marketing demos", () => {
  test("lessons demo exposes canonical language tabs", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium-desktop",
      "Tab interactions asserted once on desktop Chromium",
    );
    await page.goto("/");

    // Wait for and reveal the section (lazy-loaded by ClientSectionGate)
    await revealSection(page, "lessons-demo-title");

    const section = page.locator(`section[aria-labelledby="lessons-demo-title"]`);
    await expect(section).toBeVisible();

    // Click the "Launch lesson matcher" button to load the interactive demo
    const launchButton = section.getByRole("button", { name: /launch lesson matcher/i });
    await expect(launchButton).toBeVisible();
    await launchButton.click();

    // Wait for the dynamic content to load
    await page.waitForTimeout(2000);

    for (const excerpt of MARKETING_EXCERPTS) {
      const tab = section.getByRole("tab", { name: excerpt.language }).first();
      await expect(tab).toBeVisible();
      await tab.click();
      await expect(tab).toHaveAttribute("aria-selected", "true");
    }
  });

  test("interactive reader exposes morphological tokens", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium-desktop",
      "Interactive reader assertion runs once on desktop Chromium",
    );
    await page.goto("/");

    // Wait for and reveal the section (lazy-loaded by ClientSectionGate)
    await revealSection(page, "demo-title");

    // After loading, the InteractiveDemo component renders with a button to launch the reader
    // First we need to find the island's launch button (before InteractiveDemoCore loads)
    const launchButton = page.getByRole("button", { name: /launch interactive reader/i });
    await expect(launchButton).toBeVisible();
    await launchButton.click();

    // Wait for InteractiveDemoCore to load - it becomes a new section with the same aria-labelledby
    await page.waitForTimeout(2000);

    // Both the island wrapper and the loaded core have aria-labelledby="demo-title"
    // Use .last() to get the actual loaded InteractiveDemoCore
    const section = page.locator(`section[aria-labelledby="demo-title"]`).last();
    await expect(section).toBeVisible();

    for (const excerpt of MARKETING_EXCERPTS) {
      // These are tabs with role="tab", not buttons
      await section.getByRole("tab", { name: excerpt.language }).click();
      await page.waitForTimeout(300); // Wait for content to update

      const firstToken = excerpt.tokens[0];
      await expect(section.getByTestId("demo-morphology")).toContainText(firstToken.definition, {
        timeout: 5000,
      });
    }
  });
});
