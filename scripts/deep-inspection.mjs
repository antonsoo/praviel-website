/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

const SITE_URL = 'https://praviel.com';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  console.log('\n🔬 DEEP SITE INSPECTION - DESIGN & LAYOUT\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const allMessages = [];
  page.on('console', msg => {
    allMessages.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location()
    });
  });

  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push({
      message: error.message,
      stack: error.stack
    });
  });

  console.log('📍 Loading praviel.com...');
  await page.goto(SITE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
  await delay(5000);

  // Check for layout issues
  const layoutIssues = await page.evaluate(() => {
    const issues = [];

    // Check for overlapping elements
    const allElements = Array.from(document.querySelectorAll('*'));
    const overlapping = [];

    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i];
      const rect = el.getBoundingClientRect();

      // Check if element is visible
      if (rect.width === 0 || rect.height === 0) continue;

      // Check for overflow
      const computed = window.getComputedStyle(el);
      if (el.scrollWidth > el.clientWidth + 5 || el.scrollHeight > el.clientHeight + 5) {
        if (computed.overflow !== 'auto' && computed.overflow !== 'scroll') {
          overlapping.push({
            tag: el.tagName,
            className: el.className,
            id: el.id,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            scrollHeight: el.scrollHeight,
            clientHeight: el.clientHeight
          });
        }
      }
    }

    // Check for elements outside viewport
    const outsideViewport = allElements.filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.right < 0 || rect.left > window.innerWidth;
    }).map(el => ({
      tag: el.tagName,
      className: el.className,
      id: el.id
    }));

    // Check for invisible text (color same as background)
    const invisibleText = [];
    const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, li');
    textElements.forEach(el => {
      if (!el.textContent.trim()) return;

      const style = window.getComputedStyle(el);
      const color = style.color;
      const bgColor = style.backgroundColor;

      if (color === bgColor || style.opacity === '0') {
        invisibleText.push({
          tag: el.tagName,
          className: el.className,
          text: el.textContent.substring(0, 50)
        });
      }
    });

    // Check for broken images
    const images = Array.from(document.querySelectorAll('img'));
    const brokenImages = images.filter(img => !img.complete || img.naturalHeight === 0)
      .map(img => ({
        src: img.src,
        alt: img.alt
      }));

    // Check z-index issues (very high z-index values)
    const highZIndex = allElements.filter(el => {
      const zIndex = parseInt(window.getComputedStyle(el).zIndex);
      return zIndex > 1000;
    }).map(el => ({
      tag: el.tagName,
      className: el.className,
      zIndex: window.getComputedStyle(el).zIndex
    }));

    return {
      overlapping: overlapping.slice(0, 10),
      outsideViewport: outsideViewport.slice(0, 10),
      invisibleText: invisibleText.slice(0, 10),
      brokenImages,
      highZIndex: highZIndex.slice(0, 10)
    };
  });

  // Check hero section specifically
  const heroCheck = await page.evaluate(() => {
    const hero = document.querySelector('h1');
    if (!hero) return { found: false };

    const rect = hero.getBoundingClientRect();
    const style = window.getComputedStyle(hero);

    return {
      found: true,
      text: hero.textContent,
      position: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      },
      styles: {
        fontSize: style.fontSize,
        color: style.color,
        backgroundColor: style.backgroundColor,
        zIndex: style.zIndex,
        position: style.position
      }
    };
  });

  // Check for animation/performance issues
  const animationCheck = await page.evaluate(() => {
    const animations = document.getAnimations();
    return {
      activeAnimations: animations.length,
      animationDetails: animations.slice(0, 5).map(anim => ({
        effect: anim.effect?.target?.tagName,
        playState: anim.playState,
        currentTime: anim.currentTime
      }))
    };
  });

  console.log('\n' + '='.repeat(80));
  console.log('DEEP INSPECTION REPORT');
  console.log('='.repeat(80) + '\n');

  console.log('🎨 LAYOUT ISSUES:');
  console.log(`   Overlapping/Overflow Elements: ${layoutIssues.overlapping.length}`);
  if (layoutIssues.overlapping.length > 0) {
    layoutIssues.overlapping.forEach((el, i) => {
      console.log(`   ${i + 1}. ${el.tag}.${el.className || el.id}`);
      console.log(`      ScrollWidth: ${el.scrollWidth}px vs ClientWidth: ${el.clientWidth}px`);
    });
  }

  console.log(`\n   Elements Outside Viewport: ${layoutIssues.outsideViewport.length}`);
  if (layoutIssues.outsideViewport.length > 0) {
    layoutIssues.outsideViewport.forEach((el, i) => {
      console.log(`   ${i + 1}. ${el.tag}.${el.className || el.id}`);
    });
  }

  console.log(`\n   Invisible Text Elements: ${layoutIssues.invisibleText.length}`);
  if (layoutIssues.invisibleText.length > 0) {
    layoutIssues.invisibleText.forEach((el, i) => {
      console.log(`   ${i + 1}. ${el.tag}: "${el.text}"`);
    });
  }

  console.log(`\n   Broken Images: ${layoutIssues.brokenImages.length}`);
  if (layoutIssues.brokenImages.length > 0) {
    layoutIssues.brokenImages.forEach((img, i) => {
      console.log(`   ${i + 1}. ${img.src}`);
    });
  }

  console.log(`\n   High Z-Index Elements: ${layoutIssues.highZIndex.length}`);
  if (layoutIssues.highZIndex.length > 0) {
    layoutIssues.highZIndex.forEach((el, i) => {
      console.log(`   ${i + 1}. ${el.tag}.${el.className} (z-index: ${el.zIndex})`);
    });
  }

  console.log('\n🎯 HERO SECTION:');
  if (heroCheck.found) {
    console.log(`   Text: "${heroCheck.text}"`);
    console.log(`   Position: top=${heroCheck.position.top}px, left=${heroCheck.position.left}px`);
    console.log(`   Size: ${heroCheck.position.width}px × ${heroCheck.position.height}px`);
    console.log(`   Font Size: ${heroCheck.styles.fontSize}`);
    console.log(`   Color: ${heroCheck.styles.color}`);
    console.log(`   Z-Index: ${heroCheck.styles.zIndex}`);
  } else {
    console.log('   ❌ Hero section not found');
  }

  console.log('\n🎬 ANIMATIONS:');
  console.log(`   Active Animations: ${animationCheck.activeAnimations}`);
  if (animationCheck.animationDetails.length > 0) {
    animationCheck.animationDetails.forEach((anim, i) => {
      console.log(`   ${i + 1}. ${anim.effect} - ${anim.playState}`);
    });
  }

  console.log('\n📢 CONSOLE MESSAGES:');
  const errors = allMessages.filter(m => m.type === 'error');
  const warnings = allMessages.filter(m => m.type === 'warning');
  const logs = allMessages.filter(m => m.type === 'log' || m.type === 'info');

  console.log(`   Errors: ${errors.length}`);
  if (errors.length > 0) {
    errors.slice(0, 5).forEach((err, i) => {
      console.log(`   ${i + 1}. ${err.text}`);
    });
  }

  console.log(`   Warnings: ${warnings.length}`);
  if (warnings.length > 0) {
    warnings.slice(0, 5).forEach((warn, i) => {
      console.log(`   ${i + 1}. ${warn.text}`);
    });
  }

  console.log(`   Info/Logs: ${logs.length}`);

  console.log('\n💥 PAGE ERRORS:');
  console.log(`   Total: ${pageErrors.length}`);
  if (pageErrors.length > 0) {
    pageErrors.forEach((err, i) => {
      console.log(`   ${i + 1}. ${err.message}`);
    });
  }

  console.log('\n' + '='.repeat(80));

  await browser.close();

  const hasIssues =
    layoutIssues.overlapping.length > 0 ||
    layoutIssues.brokenImages.length > 0 ||
    errors.length > 0 ||
    pageErrors.length > 0;

  process.exit(hasIssues ? 1 : 0);
})();
