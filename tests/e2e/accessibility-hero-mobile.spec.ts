import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Hero accessibility (mobile)", () => {
  test("hero stack + overlays have no critical axe violations on mobile", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-mobile", "Run axe once on mobile to target hero overlays");

    await page.goto("/?openWaitlist=1");
    await page.waitForLoadState("networkidle");

    const waitlistButton = page.getByRole("button", { name: /Join Scholar Waitlist/i });
    if (await waitlistButton.count()) {
      await waitlistButton.first().click();
    }

    const hero = page.locator("#hero-section");
    await expect(hero).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include("#hero-section")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    expect(
      accessibilityScanResults.violations,
      JSON.stringify(accessibilityScanResults.violations, null, 2),
    ).toHaveLength(0);
  });
});
