import { chromium } from "playwright";

(async () => {
  // Launch a new browser instance
  const browser = await chromium.launch({ headless: false });

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();

  // Navigate to a URL
  await page.goto("https://babylon.art/");

  // Perform actions and assertions
  const pageTitle = await page.title();
  console.log("Page title:", pageTitle);

  const banner = await page.locator(
    ':text("This website uses cookies to ensure you get the best experience on our website.")'
  );

  const elementText = await banner.textContent();
  console.log(elementText);

  const parent = await banner.evaluateHandle(
    (element: any) => element.parentElement
  );

  const parentElement = parent.asElement();

  const button = await parentElement!.$("button");
  await button!.click();

  const bannerElement = await banner.elementHandle({ timeout: 1000 });

  // Close the browser
  //   await browser.close();
})();
