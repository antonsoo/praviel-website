import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

import { MARKETING_EXCERPTS } from "@/app/test/data/marketing-excerpts";

async function revealSection(page: Page, sectionId: string) {
  const viewport = page.viewportSize()?.height ?? 900;

  // Scroll down to trigger ClientSectionGate's IntersectionObserver
  // The sections are lazy-loaded and don't exist until scrolled into viewport
  for (let i = 0; i < 10; i += 1) {
    await page.mouse.wheel(0, viewport * 0.8);
    await page.waitForTimeout(300);

    // Check if the section has loaded yet
    const section = page.locator(`section[aria-labelledby="${sectionId}"]`);
    const count = await section.count();
    if (count > 0) {
      // Section exists now, scroll it fully into view
      await section.scrollIntoViewIfNeeded();
      await section.waitFor({ state: "visible", timeout: 5000 });
      return;
    }
  }

  // If we get here, section never loaded
  throw new Error(`Section with aria-labelledby="${sectionId}" never loaded after scrolling`);
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
