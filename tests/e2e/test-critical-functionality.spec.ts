import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3003';

test.describe('Critical Functionality Tests', () => {

  test('homepage loads without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    expect(errors.length).toBe(0);
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);

    // Find mobile menu button
    const menuButton = page.locator('.site-header-summary');
    await expect(menuButton).toBeVisible();

    // Check initial state - menu should be closed
    const menuPanel = page.locator('.site-header-menu-panel');
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Click to open menu
    await menuButton.click();
    await page.waitForTimeout(500);

    // Verify menu opened
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Menu should have max-height and opacity changed
    const panelStyles = await menuPanel.evaluate(el => ({
      maxHeight: getComputedStyle(el).maxHeight,
      opacity: getComputedStyle(el).opacity
    }));

    expect(parseFloat(panelStyles.opacity)).toBeGreaterThan(0.5);

    // Click again to close
    await menuButton.click();
    await page.waitForTimeout(500);
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('waitlist form exists and has proper structure', async ({ page }) => {
    await page.goto(BASE_URL);

    // Scroll to waitlist section
    await page.evaluate(() => {
      document.querySelector('#waitlist')?.scrollIntoView();
    });

    // Find form
    const form = page.locator('form#waitlist').first();
    await expect(form).toBeVisible();

    // Check for email input
    const emailInput = form.locator('input[name="email"]');
    await expect(emailInput).toBeVisible();

    // Check for submit button
    const submitButton = form.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
  });

  test('ancient theme backgrounds render', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check for background layers
    const egyptLayer = page.locator('.civilization-layer--egypt');
    const greeceLayer = page.locator('.civilization-layer--greece');
    const romeLayer = page.locator('.civilization-layer--rome');

    await expect(egyptLayer).toHaveCount(1);
    await expect(greeceLayer).toHaveCount(1);
    await expect(romeLayer).toHaveCount(1);

    // Verify they have proper CSS
    const egyptStyles = await egyptLayer.evaluate(el => getComputedStyle(el).zIndex);
    expect(egyptStyles).toBe('-38');
  });

  test('no horizontal scroll on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });

  test('all navigation links work', async ({ page }) => {
    await page.goto(BASE_URL);

    // Test desktop nav links
    const blogLink = page.locator('nav a[href="/blog"]').first();
    await expect(blogLink).toBeVisible();

    const fundLink = page.locator('nav a[href="/fund"]').first();
    await expect(fundLink).toBeVisible();
  });

  test('skip to content link works', async ({ page }) => {
    await page.goto(BASE_URL);

    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeInViewport({ ratio: 0 }); // Should exist but be sr-only

    // Focus it
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
  });

  test('images have alt text', async ({ page }) => {
    await page.goto(BASE_URL);

    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});
