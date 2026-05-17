import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3010";
const OUT = "screenshots/opus47-premium-rebuild";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

const sets = [
  { name: "d1440", viewport: { width: 1440, height: 900 }, dpr: 1 },
  { name: "t768", viewport: { width: 768, height: 1024 }, dpr: 1 },
  { name: "m390", viewport: { width: 390, height: 844 }, dpr: 2 },
];

for (const v of sets) {
  // Fresh isolated context per language so localStorage cannot bleed
  const context = await browser.newContext({
    viewport: v.viewport,
    deviceScaleFactor: v.dpr,
    locale: "ar-SA",
    storageState: {
      cookies: [{ name: "ev.lang", value: "ar", domain: "127.0.0.1", path: "/", httpOnly: false, secure: false, sameSite: "Lax" }],
      origins: [{ origin: BASE, localStorage: [{ name: "ev.lang", value: "ar" }] }],
    },
  });

  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(OUT, `${v.name}-home-ar-hero.png`) });

  await page.evaluate(() => {
    const el = document.getElementById("proof");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, `${v.name}-home-ar-proof.png`) });

  await page.evaluate(() => {
    const el = document.getElementById("final-cta");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, `${v.name}-home-ar-final-cta.png`) });

  await page.evaluate(() => {
    const el = document.getElementById("chaos-system-film");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(OUT, `${v.name}-home-ar-cinematic.png`) });

  await page.evaluate(() => {
    const el = document.getElementById("mechanism");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(OUT, `${v.name}-home-ar-mechanism.png`) });

  // apply AR
  await page.goto(BASE + "/apply", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(OUT, `${v.name}-apply-ar.png`) });

  await context.close();
}

await browser.close();
console.log("AR captures done");
