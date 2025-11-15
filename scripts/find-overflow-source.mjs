/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

const SITE_URL = 'https://praviel-site.antonnsoloviev.workers.dev';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 375, height: 667 });
  await page.goto(SITE_URL, { waitUntil: 'networkidle2' });

  const overflowInfo = await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;

    // Check which element is causing the horizontal scroll
    const checkElement = (el) => {
      const rect = el.getBoundingClientRect();
      const styles = window.getComputedStyle(el);

      // Check if element's right edge extends beyond viewport
      if (rect.right > window.innerWidth) {
        return {
          tag: el.tagName,
          id: el.id || '(no id)',
          classes: el.className,
          rect: {
            left: rect.left,
            right: rect.right,
            width: rect.width,
            overflowAmount: rect.right - window.innerWidth
          },
          styles: {
            overflow: styles.overflow,
            overflowX: styles.overflowX,
            position: styles.position,
            width: styles.width,
            maxWidth: styles.maxWidth
          }
        };
      }
      return null;
    };

    // Start from body and check all descendants
    const culprits = [];
    const traverse = (element) => {
      const info = checkElement(element);
      if (info) {
        culprits.push(info);
      }

      for (const child of element.children) {
        traverse(child);
      }
    };

    traverse(body);

    // Sort by overflow amount descending
    culprits.sort((a, b) => b.rect.overflowAmount - a.rect.overflowAmount);

    return {
      htmlScrollWidth: html.scrollWidth,
      htmlClientWidth: html.clientWidth,
      viewportWidth: window.innerWidth,
      bodyScrollWidth: body.scrollWidth,
      bodyClientWidth: body.clientWidth,
      overflowAmount: html.scrollWidth - window.innerWidth,
      culprits: culprits.slice(0, 20) // Top 20 offenders
    };
  });

  console.log('\n=== HORIZONTAL OVERFLOW ANALYSIS ===\n');
  console.log(`Viewport width: ${overflowInfo.viewportWidth}px`);
  console.log(`HTML scrollWidth: ${overflowInfo.htmlScrollWidth}px`);
  console.log(`Overflow amount: ${overflowInfo.overflowAmount}px\n`);

  console.log('Top elements extending beyond viewport:\n');
  overflowInfo.culprits.forEach((culprit, i) => {
    console.log(`${i + 1}. ${culprit.tag} - overflows by ${culprit.rect.overflowAmount.toFixed(2)}px`);
    console.log(`   ID: ${culprit.id}`);
    console.log(`   Classes: ${culprit.classes.substring(0, 100)}`);
    console.log(`   Rect: left=${culprit.rect.left.toFixed(2)}, right=${culprit.rect.right.toFixed(2)}, width=${culprit.rect.width.toFixed(2)}`);
    console.log(`   Position: ${culprit.styles.position}, overflow-x: ${culprit.styles.overflowX}`);
    console.log('');
  });

  await browser.close();
})();
