
import { Page } from "@playwright/test";

export async function scrollGrid(
  page: Page,
  direction: "left" | "right" = "right",
  steps: number = 5
) {
  const grid = page.locator('.ag-body-horizontal-scroll-viewport');

  for (let i = 0; i < steps; i++) {
    await grid.evaluate((el, dir) => {
      el.scrollBy({
        left: dir === "right" ? 300 : -300,
        behavior: "auto"
      });
    }, direction);

    await page.waitForTimeout(200); // allow render
  }
}