/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

const SITE_URL = 'https://praviel.com';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  console.log('\n🔍 DETECTING REACT HYDRATION ERRORS\n');

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const pageErrors = [];

  // Capture page errors with full details
  page.on('pageerror', error => {
    pageErrors.push({
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  });

  // Capture console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push({
        text: msg.text(),
        location: msg.location()
      });
    }
  });

  console.log('📍 Loading praviel.com...');
  await page.goto(SITE_URL, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  await delay(3000);

  console.log('\n' + '='.repeat(80));
  console.log('HYDRATION ERROR DETECTION');
  console.log('='.repeat(80) + '\n');

  console.log(`Found ${pageErrors.length} page errors:`);
  pageErrors.forEach((err, i) => {
    console.log(`\n--- Error ${i + 1} ---`);
    console.log(`Name: ${err.name}`);
    console.log(`Message: ${err.message}`);
    if (err.stack) {
      console.log(`Stack trace:`);
      console.log(err.stack.split('\n').slice(0, 10).join('\n'));
    }
  });

  console.log(`\n\nFound ${consoleErrors.length} console errors:`);
  consoleErrors.forEach((err, i) => {
    console.log(`\n--- Console Error ${i + 1} ---`);
    console.log(`Text: ${err.text}`);
    if (err.location && err.location.url) {
      console.log(`Location: ${err.location.url}:${err.location.lineNumber}`);
    }
  });

  await browser.close();

  process.exit(pageErrors.length > 0 ? 1 : 0);
})();
