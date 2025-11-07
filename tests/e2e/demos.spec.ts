import { expect, test } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

import { MARKETING_EXCERPTS } from "@/app/test/data/marketing-excerpts";

async function revealSection(page: Page, section: Locator) {
  const viewport = page.viewportSize()?.height ?? 900;

  // Scroll section into view
  for (let i = 0; i < 8; i += 1) {
    if ((await section.count()) > 0) {
      await section.scrollIntoViewIfNeeded();
      break;
    }
    await page.mouse.wheel(0, viewport);
    await page.waitForTimeout(150);
  }

  // Wait for section container to be visible
  await section.first().waitFor({ state: "visible", timeout: 20_000 });
  await section.scrollIntoViewIfNeeded();

  // Wait for ClientSectionGate to load the dynamic content (indicated by non-skeleton content)
  // The skeleton has specific classes, so we wait for actual demo content
  await page.waitForTimeout(2000); // Give time for dynamic import

  // Ensure we're scrolled to the section after content loads (layout might shift)
  await section.scrollIntoViewIfNeeded();
}

test.describe("Marketing demos", () => {
  test("lessons demo exposes canonical language tabs", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium-desktop",
      "Tab interactions asserted once on desktop Chromium",
    );
    await page.goto("/");
    const section = page.locator(`section[aria-labelledby="lessons-demo-title"]`);
    await revealSection(page, section);
    await expect(section).toBeVisible();

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
    const section = page.locator(`section[aria-labelledby="demo-title"]`);
    await revealSection(page, section);
    await expect(section).toBeVisible();

    for (const excerpt of MARKETING_EXCERPTS) {
      await page.getByRole("button", { name: excerpt.language }).click();
      const firstToken = excerpt.tokens[0];
      await expect(section.getByTestId("demo-morphology")).toContainText(firstToken.definition, {
        timeout: 5000,
      });
    }
  });
});
