import { expect, test } from "@playwright/test";

test.describe("Mobile experience", () => {
  test("safe-area CSS variables are defined", async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes("mobile"), "Mobile-only coverage");

    await page.goto("/");
    const rootVars = await page.evaluate(() => ({
      bottom: getComputedStyle(document.documentElement).getPropertyValue("--safe-area-bottom"),
      right: getComputedStyle(document.documentElement).getPropertyValue("--safe-area-right"),
    }));

    expect(rootVars.bottom.trim()).not.toEqual("");
    expect(rootVars.right.trim()).not.toEqual("");
  });
});
