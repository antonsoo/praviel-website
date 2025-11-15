/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

const SITE_URL = 'https://praviel.com';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  console.log('\n🎬 ANIMATION AUDIT\n');

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('📍 Loading praviel.com...');
  await page.goto(SITE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
  await delay(5000);

  const animationAnalysis = await page.evaluate(() => {
    const animations = document.getAnimations();

    const animationsByName = {};
    const animationsByElement = {};

    animations.forEach(anim => {
      // Get animation name
      const effectName = anim.effect?.getKeyframes?.()?.[0]?.composite ||
                         anim.animationName ||
                         'unknown';

      // Count by name
      if (!animationsByName[effectName]) {
        animationsByName[effectName] = {
          count: 0,
          playState: anim.playState,
          elements: []
        };
      }
      animationsByName[effectName].count++;

      // Get element info
      const target = anim.effect?.target;
      if (target) {
        const elementInfo = {
          tag: target.tagName,
          className: target.className,
          id: target.id
        };
        animationsByName[effectName].elements.push(elementInfo);

        // Count by element type
        const key = `${target.tagName}.${target.className.split(' ')[0] || 'no-class'}`;
        animationsByElement[key] = (animationsByElement[key] || 0) + 1;
      }
    });

    // Get animation properties from computed styles
    const allElements = Array.from(document.querySelectorAll('*'));
    const elementsWithAnimation = allElements.filter(el => {
      const style = window.getComputedStyle(el);
      return style.animationName && style.animationName !== 'none';
    }).map(el => ({
      tag: el.tagName,
      className: el.className,
      id: el.id,
      animationName: window.getComputedStyle(el).animationName,
      animationDuration: window.getComputedStyle(el).animationDuration,
      animationIterationCount: window.getComputedStyle(el).animationIterationCount
    }));

    return {
      totalAnimations: animations.length,
      animationsByName,
      animationsByElement,
      elementsWithAnimation: elementsWithAnimation.slice(0, 50)
    };
  });

  console.log('='.repeat(80));
  console.log('ANIMATION ANALYSIS');
  console.log('='.repeat(80));

  console.log(`\n📊 TOTAL ACTIVE ANIMATIONS: ${animationAnalysis.totalAnimations}\n`);

  console.log('🎯 ANIMATIONS BY NAME:');
  const sortedByName = Object.entries(animationAnalysis.animationsByName)
    .sort((a, b) => b[1].count - a[1].count);

  sortedByName.forEach(([name, data]) => {
    console.log(`   ${name}: ${data.count} instances (${data.playState})`);
    if (data.elements.length <= 5) {
      data.elements.forEach(el => {
        console.log(`      - ${el.tag}.${el.className.split(' ').slice(0, 2).join('.')}`);
      });
    }
  });

  console.log('\n🏷️  ANIMATIONS BY ELEMENT TYPE:');
  const sortedByElement = Object.entries(animationAnalysis.animationsByElement)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  sortedByElement.forEach(([element, count]) => {
    console.log(`   ${element}: ${count} animations`);
  });

  console.log('\n📝 ELEMENTS WITH ANIMATION (first 50):');
  animationAnalysis.elementsWithAnimation.forEach((el, i) => {
    console.log(`   ${i + 1}. ${el.tag}.${el.className.split(' ').slice(0, 2).join('.')}`);
    console.log(`      Animation: ${el.animationName}`);
    console.log(`      Duration: ${el.animationDuration}, Iterations: ${el.animationIterationCount}`);
  });

  console.log('\n' + '='.repeat(80));

  await browser.close();
})();
