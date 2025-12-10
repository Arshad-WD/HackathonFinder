import { chromium } from "playwright";
import { createRateLimiter } from "./rateLimiter.js";

// 1 request every 5 seconds (GLOBAL crawler throttle)
const crawlLimiter = createRateLimiter({
  maxRequests: 1,
  windowMs: 5000
});

let browser = null;

// REUSE SINGLE BROWSER INSTANCE
async function getBrowser() {
  if (!browser) {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
  }
  return browser;
}

export async function crawlPage(url, depth = 1, visited = new Set(), baseHost = null) {
  try {
    if (!baseHost) baseHost = new URL(url).host;

    const currentHost = new URL(url).host;

    // DOMAIN LOCK
    if (currentHost !== baseHost) return "";

    // SAFE RECURSION GUARD
    if (visited.has(url) || depth <= 0 || visited.size > 15) return "";

    visited.add(url);

    const browserInstance = await getBrowser();
    const page = await browserInstance.newPage();

    // BLOCK HEAVY ASSETS
    await page.route("**/*", route => {
      const type = route.request().resourceType();
      if (["image", "stylesheet", "font", "media", "xhr", "fetch"].includes(type)) {
        return route.abort();
      }
      route.continue();
    });

    try {
      // TRUE RATE LIMIT APPLIED TO FULL REQUEST
      await crawlLimiter(() =>
        page.goto(url, { waitUntil: "networkidle", timeout: 60000 })
      );

      const text = await page.evaluate(() => document.body.innerText);

      // SMART PAGINATION DETECTION
      const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("a"))
          .map(a => a.href)
          .filter(href =>
            href &&
            (
              href.includes("?page=") ||
              href.toLowerCase().includes("page/") ||
              href.toLowerCase().includes("next")
            )
          );
      });

      let childText = "";

      for (const link of links.slice(0, 2)) {
        childText += await crawlPage(link, depth - 1, visited, baseHost);
      }

      await page.close();
      return text + "\n" + childText;
    } catch (err) {
      console.error("❌ Crawler error:", err.message);
      await page.close();
      return "";
    }
  } catch {
    return "";
  }
}

// CLEAN SHUTDOWN
process.on("exit", async () => {
  if (browser) await browser.close();
});
