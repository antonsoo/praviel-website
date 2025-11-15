/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

const SITE_URL = 'https://praviel.com';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  console.log('\n🔍 FINDING OVERFLOW SOURCE\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('📍 Loading praviel.com...');
  await page.goto(SITE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
  await delay(3000);

  const overflowAnalysis = await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;

    const results = {
      body: {
        scrollWidth: body.scrollWidth,
        clientWidth: body.clientWidth,
        offsetWidth: body.offsetWidth,
        overflow: window.getComputedStyle(body).overflowX
      },
      html: {
        scrollWidth: html.scrollWidth,
        clientWidth: html.clientWidth,
        offsetWidth: html.offsetWidth,
        overflow: window.getComputedStyle(html).overflowX
      },
      culprits: []
    };

    // Find all elements that extend beyond the viewport
    const allElements = Array.from(document.querySelectorAll('*'));
    const viewport = window.innerWidth;

    allElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);

      // Check if element extends beyond viewport
      if (rect.right > viewport + 1) {
        const overflow = rect.right - viewport;
        results.culprits.push({
          tag: el.tagName,
          className: el.className,
          id: el.id,
          rect: {
            left: rect.left,
            right: rect.right,
            width: rect.width
          },
          overflow: overflow,
          position: style.position,
          marginLeft: style.marginLeft,
          marginRight: style.marginRight,
          paddingLeft: style.paddingLeft,
          paddingRight: style.paddingRight,
          width: style.width,
          maxWidth: style.maxWidth
        });
      }
    });

    // Sort by overflow amount
    results.culprits.sort((a, b) => b.overflow - a.overflow);

    return results;
  });

  console.log('📊 OVERFLOW ANALYSIS:');
  console.log(`\nHTML element:`);
  console.log(`  ScrollWidth: ${overflowAnalysis.html.scrollWidth}px`);
  console.log(`  ClientWidth: ${overflowAnalysis.html.clientWidth}px`);
  console.log(`  Overflow: ${overflowAnalysis.html.overflow}`);

  console.log(`\nBODY element:`);
  console.log(`  ScrollWidth: ${overflowAnalysis.body.scrollWidth}px`);
  console.log(`  ClientWidth: ${overflowAnalysis.body.clientWidth}px`);
  console.log(`  Overflow: ${overflowAnalysis.body.overflow}`);

  console.log(`\n🎯 TOP OVERFLOW CULPRITS (extending beyond viewport):`);
  console.log(`   Found ${overflowAnalysis.culprits.length} elements extending beyond viewport\n`);

  overflowAnalysis.culprits.slice(0, 20).forEach((el, i) => {
    console.log(`${i + 1}. ${el.tag}${el.className ? '.' + el.className.split(' ').slice(0, 3).join('.') : ''}${el.id ? '#' + el.id : ''}`);
    console.log(`   Position: ${el.position}`);
    console.log(`   Rect: left=${el.rect.left.toFixed(1)}px, right=${el.rect.right.toFixed(1)}px, width=${el.rect.width.toFixed(1)}px`);
    console.log(`   Overflow: ${el.overflow.toFixed(1)}px beyond viewport`);
    console.log(`   Width: ${el.width}, Max-Width: ${el.maxWidth}`);
    console.log(`   Margins: L=${el.marginLeft}, R=${el.marginRight}`);
    console.log(`   Padding: L=${el.paddingLeft}, R=${el.paddingRight}`);
    console.log('');
  });

  await browser.close();
})();
