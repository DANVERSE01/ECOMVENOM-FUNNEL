import { chromium, devices } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3010";
const OUT = "screenshots/opus47-premium-rebuild";
fs.mkdirSync(OUT, { recursive: true });

const summary = { pages: [], console: [], errors: [], overflow: [] };

async function captureViewport(browser, { name, viewport, dpr = 1 }) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: dpr,
    locale: "en-US",
    reducedMotion: "no-preference",
  });

  const tasks = [
    { route: "/", file: `${name}-home-en`, lang: "en", scroll: true },
    { route: "/", file: `${name}-home-ar`, lang: "ar", scroll: true },
    { route: "/apply", file: `${name}-apply-en`, lang: "en" },
    { route: "/schedule", file: `${name}-schedule-en`, lang: "en" },
    { route: "/confirmation", file: `${name}-confirmation-en`, lang: "en" },
  ];

  for (const t of tasks) {
    const page = await context.newPage();
    const consoleMessages = [];
    page.on("console", (msg) => {
      if (msg.type() === "error" || msg.type() === "warning") {
        consoleMessages.push({ route: t.route, viewport: name, lang: t.lang, type: msg.type(), text: msg.text() });
      }
    });
    page.on("pageerror", (err) => {
      summary.errors.push({ route: t.route, viewport: name, lang: t.lang, message: err.message });
    });

    await context.addCookies([{ name: "ev.lang", value: t.lang, url: BASE }]);
    await page.goto(BASE + t.route, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(800);

    // Detect horizontal overflow
    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      return { docW, winW, overflows: docW > winW + 1 };
    });
    if (overflow.overflows) {
      summary.overflow.push({ route: t.route, viewport: name, lang: t.lang, ...overflow });
    }

    // Hero shot
    const heroPath = path.join(OUT, `${t.file}-hero.png`);
    await page.screenshot({ path: heroPath, fullPage: false });

    if (t.scroll && t.route === "/") {
      // VSL is in hero, already captured.
      // Cinematic
      await page.evaluate(() => {
        const el = document.getElementById("chaos-system-film");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(900);
      await page.screenshot({ path: path.join(OUT, `${t.file}-cinematic.png`) });

      // Mechanism
      await page.evaluate(() => {
        const el = document.getElementById("mechanism");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(OUT, `${t.file}-mechanism.png`) });

      // Proof
      await page.evaluate(() => {
        const el = document.getElementById("proof");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(OUT, `${t.file}-proof.png`) });

      // Final CTA
      await page.evaluate(() => {
        const el = document.getElementById("final-cta");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(OUT, `${t.file}-final-cta.png`) });
    }

    summary.pages.push({ route: t.route, viewport: name, lang: t.lang, overflow, consoleCount: consoleMessages.length });
    summary.console.push(...consoleMessages);
    await page.close();
  }

  await context.close();
}

const browser = await chromium.launch();

await captureViewport(browser, { name: "d1440", viewport: { width: 1440, height: 900 }, dpr: 1 });
await captureViewport(browser, { name: "t768", viewport: { width: 768, height: 1024 }, dpr: 1 });
await captureViewport(browser, { name: "m390", viewport: { width: 390, height: 844 }, dpr: 2 });

await browser.close();

fs.writeFileSync(path.join(OUT, "_qa-summary.json"), JSON.stringify(summary, null, 2));
console.log(`PAGES: ${summary.pages.length}`);
console.log(`CONSOLE messages: ${summary.console.length}`);
console.log(`PAGE ERRORS: ${summary.errors.length}`);
console.log(`OVERFLOW: ${summary.overflow.length}`);
if (summary.console.length) console.log(JSON.stringify(summary.console.slice(0, 5), null, 2));
if (summary.errors.length) console.log(JSON.stringify(summary.errors.slice(0, 5), null, 2));
if (summary.overflow.length) console.log(JSON.stringify(summary.overflow, null, 2));
