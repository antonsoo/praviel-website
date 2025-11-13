import { expect, test } from "@playwright/test";

test.describe("Blog navigation", () => {
  test("navigating via header never produces 404", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Blog" }).first().click();
    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.getByRole("heading", { level: 1, name: "Blog" })).toBeVisible();
    await expect(page.locator("text=This page could not be found")).toHaveCount(0);

    const firstPostLink = page.locator("a[href^='/blog/']").first();
    await firstPostLink.scrollIntoViewIfNeeded();
    await firstPostLink.click();

    await expect(page).toHaveURL(/\/blog\//);
    await expect(page.getByRole("link", { name: "Back to Blog" }).first()).toBeVisible();
    await expect(page.locator("article h1").first()).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(/\/blog$/);
  });
});
