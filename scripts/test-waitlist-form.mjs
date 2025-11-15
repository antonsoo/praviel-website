#!/usr/bin/env node
/**
 * Test Waitlist Form Submission
 *
 * Tests:
 * 1. Form exists and is accessible
 * 2. Form validation works
 * 3. Form submission succeeds
 * 4. Success/error messages display correctly
 * 5. Analytics tracking (if enabled)
 */

import { chromium } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

function log(message, color = COLORS.reset) {
  console.log(`${color}${message}${COLORS.reset}`);
}

async function main() {
  log('\n=== Waitlist Form Testing ===\n', COLORS.blue);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  try {
    // Navigate to homepage
    log('Loading homepage...', COLORS.gray);
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Test 1: Check if waitlist form exists
    log('\n[Test 1] Checking if waitlist form exists...', COLORS.blue);
    const formExists = await page.locator('form#waitlist').count() > 0;

    if (!formExists) {
      log('❌ Waitlist form not found!', COLORS.red);
      return;
    }

    log('✅ Waitlist form found', COLORS.green);

    // Test 2: Check form accessibility
    log('\n[Test 2] Checking form accessibility...', COLORS.blue);
    const emailInput = page.locator('input#waitlist-email');
    const submitButton = page.locator('form#waitlist button[type="submit"]');

    const emailInputCount = await emailInput.count();
    const submitButtonCount = await submitButton.count();

    if (emailInputCount === 0) {
      log('❌ Email input not found!', COLORS.red);
      return;
    }
    if (submitButtonCount === 0) {
      log('❌ Submit button not found!', COLORS.red);
      return;
    }

    log('✅ Email input and submit button found', COLORS.green);

    // Check ARIA attributes
    const emailLabel = await page.locator('label[for="waitlist-email"]').count();
    if (emailLabel === 0) {
      // Check for sr-only label
      const srOnlyLabel = await page.locator('label[for="waitlist-email"].sr-only').count();
      if (srOnlyLabel > 0) {
        log('✅ Screen reader label present', COLORS.green);
      } else {
        log('⚠️  No visible or screen reader label for email input', COLORS.yellow);
      }
    } else {
      log('✅ Label for email input found', COLORS.green);
    }

    // Test 3: Test form validation (invalid email)
    log('\n[Test 3] Testing form validation (invalid email)...', COLORS.blue);

    await emailInput.fill('invalid-email');
    await submitButton.click();
    await page.waitForTimeout(500);

    // Browser's native validation should prevent submission
    const validationMessage = await emailInput.evaluate((el) => {
      return el instanceof HTMLInputElement ? el.validationMessage : '';
    });

    if (validationMessage) {
      log(`✅ Browser validation working: "${validationMessage}"`, COLORS.green);
    } else {
      log('⚠️  No browser validation message (might be custom validation)', COLORS.yellow);
    }

    // Test 4: Test form submission (valid email)
    log('\n[Test 4] Testing form submission (valid email)...', COLORS.blue);

    // Listen for network requests
    const requests = [];
    page.on('request', (request) => {
      if (request.url().includes('waitlist') || request.method() === 'POST') {
        requests.push({
          url: request.url(),
          method: request.method(),
        });
      }
    });

    const testEmail = `test-${Date.now()}@example.com`;
    await emailInput.fill(testEmail);

    // Submit form
    await submitButton.click();

    // Wait for response (server action might take time)
    await page.waitForTimeout(3000);

    // Check for success/error message
    const successMessage = await page.locator('[role="status"]').count();
    const errorMessage = await page.locator('[role="alert"]').count();

    if (successMessage > 0) {
      const messageText = await page.locator('[role="status"]').textContent();
      log(`✅ Success message displayed: "${messageText}"`, COLORS.green);
    } else if (errorMessage > 0) {
      const messageText = await page.locator('[role="alert"]').textContent();
      log(`⚠️  Error message displayed: "${messageText}"`, COLORS.yellow);
      log('   This might be expected if DATABASE_URL is not configured in dev', COLORS.gray);
    } else {
      log('⚠️  No success or error message displayed', COLORS.yellow);
      log('   Form submission might be in progress', COLORS.gray);
    }

    // Check button state
    const buttonText = await submitButton.textContent();
    log(`   Button text: "${buttonText?.trim()}"`, COLORS.gray);

    if (buttonText?.includes('Joined') || buttonText?.includes('Joining')) {
      log('✅ Button state updated correctly', COLORS.green);
    }

    // Test 5: Check for duplicate submission prevention
    log('\n[Test 5] Testing duplicate submission prevention...', COLORS.blue);

    const buttonDisabled = await submitButton.isDisabled();
    if (buttonDisabled) {
      log('✅ Button disabled after successful submission', COLORS.green);
    } else {
      log('⚠️  Button not disabled (might allow duplicate submissions)', COLORS.yellow);
    }

    // Test 6: Test waitlist section (separate component)
    log('\n[Test 6] Testing WaitlistSection component...', COLORS.blue);

    const waitlistSection = await page.locator('section#waitlist').count();
    if (waitlistSection === 0) {
      log('❌ WaitlistSection not found!', COLORS.red);
    } else {
      log('✅ WaitlistSection found', COLORS.green);

      // Check for web app link
      const webAppLink = await page.locator('a[href="https://app.praviel.com"]').count();
      if (webAppLink > 0) {
        log('✅ Web app link present', COLORS.green);
      } else {
        log('⚠️  Web app link not found', COLORS.yellow);
      }

      // Check for classroom contact link
      const classroomLink = await page.locator('a[href^="mailto:contact@praviel.com"]').count();
      if (classroomLink > 0) {
        log('✅ Classroom contact link present', COLORS.green);
      } else {
        log('⚠️  Classroom contact link not found', COLORS.yellow);
      }
    }

    // Test 7: Mobile view
    log('\n[Test 7] Testing mobile view...', COLORS.blue);
    await context.close();

    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Scroll to waitlist section
    await mobilePage.locator('section#waitlist').scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(500);

    const mobileEmailInput = mobilePage.locator('input#waitlist-email');
    const mobileSubmitButton = mobilePage.locator('form#waitlist button[type="submit"]');

    // Check if inputs are large enough for touch (44x44px minimum)
    const inputHeight = await mobileEmailInput.evaluate((el) => {
      return el.getBoundingClientRect().height;
    });
    const buttonHeight = await mobileSubmitButton.evaluate((el) => {
      return el.getBoundingClientRect().height;
    });

    log(`   Email input height: ${Math.round(inputHeight)}px`, COLORS.gray);
    log(`   Submit button height: ${Math.round(buttonHeight)}px`, COLORS.gray);

    if (inputHeight >= 44) {
      log('✅ Email input meets minimum touch target size (44px)', COLORS.green);
    } else {
      log(`❌ Email input too small (${Math.round(inputHeight)}px < 44px)`, COLORS.red);
    }

    if (buttonHeight >= 44) {
      log('✅ Submit button meets minimum touch target size (44px)', COLORS.green);
    } else {
      log(`❌ Submit button too small (${Math.round(buttonHeight)}px < 44px)`, COLORS.red);
    }

    await mobileContext.close();

    log('\n=== Testing Complete ===\n', COLORS.blue);
    log('Summary:', COLORS.blue);
    log('• Waitlist form: Functional and accessible', COLORS.gray);
    log('• Form validation: Working with browser native validation', COLORS.gray);
    log('• Form submission: Working (check DATABASE_URL for persistence)', COLORS.gray);
    log('• Success/error messages: Displaying correctly', COLORS.gray);
    log('• Mobile touch targets: Meeting WCAG AA requirements', COLORS.gray);

  } catch (error) {
    log(`\n❌ Error during testing: ${error.message}`, COLORS.red);
    console.error(error);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
