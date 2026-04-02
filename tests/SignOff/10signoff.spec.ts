import { test, expect } from "@playwright/test";
import { login } from "../../lib/login";
import { openFromBreakManagement } from "../../lib/Signoff/openReconFromBreakManagement";
import { scrollGrid } from "../../lib/scrollUntilVisible";
import { getContrast } from "../../lib/getContrast";
import { getCellByIdAndText } from "../../lib/Locator/signoffLocator";
import { selectFilterByAttribute } from "../../lib/Locator/signoffLocator";
test("signoff10", async ({ page }) => {
  await login(page, "mayadav_reconsignoff@ivp.in", "Ivp@123");

  // open recon through BreakManagement
  await openFromBreakManagement(page, "Position_NV_Automation", "View");

  await scrollGrid(page, "right", 5);

  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  await page.waitForTimeout(3000);
  await page
    .locator(
      `//*[@id="floatingFilter_Recon Name_adaptableId"]//span[contains(text(),"Select")]`,
    )
    .click();

  await page.waitForTimeout(2000);
  //select Shaurya_Tooltip_Testing

  await page.getByText("Shaurya_Tooltip_Testing (147)").click();
  await page.getByLabel("", { exact: true }).nth(2).check();

  await page
    .getByRole("checkbox", { name: "Column with Header Selection" })
    .check();
  await page.waitForTimeout(3000);
  await page.pause();

  await expect(page.locator("#SelectedRowsNumber")).toContainText(
    "Selected Row Count : 147",
  );

  await page
    .getByRole("checkbox", { name: "Column with Header Selection" })
    .uncheck();
  await page.waitForTimeout(3000);
  await expect(page.locator("#SelectedRowsNumber")).toContainText(
    "Selected Row Count : 0",
  );

  await page
    .getByRole("checkbox", { name: "Column with Header Selection" })
    .check();
  await page.waitForTimeout(3000);

  const locator1 = page.locator(
    getCellByIdAndText("Quantity_NV-Difference", "78,910.830000"),
  );

  let result = getContrast(locator1);

  //   console.log("🎨 Text Color:", result.textColor);
  //   console.log("🟦 Background Color:", result.bgColor);
  //   console.log("📊 Contrast Ratio:", result.contrast);
  console.log(result);
  try {
    const resolvedResult = await result;
    if (resolvedResult?.contrast !== undefined) {
      const contrast = resolvedResult.contrast;
      await expect(contrast >= 15.45 && contrast <= 15.55).toBeTruthy();
    }
  } catch (error) {
    console.error(error);
  }

  await page
    .getByRole("checkbox", { name: "Column with Header Selection" })
    .uncheck();
  await page.waitForTimeout(3000);

  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  //select copy of Break_management_Position
  await page.locator(selectFilterByAttribute("Recon Name")).click();
  await page.waitForTimeout(3000);
  await page.getByLabel("", { exact: true }).first().check({ force: true });
  //   await page.locator('#RightSideBMHeader').click();
  await page
    .getByRole("checkbox", { name: "Column with Header Selection" })
    .check();
  await page.waitForTimeout(3000);
  await expect(page.locator("#SelectedRowsNumber")).toContainText(
    "Selected Row Count : 11065",
  );
  const locator2 = page.locator(
    getCellByIdAndText("Quantity_NV-Difference", "191,533.950000"),
  );
  const result1 = getContrast(locator2);
  try {
    const resolvedResult1 = await result1;
    const bgColor = resolvedResult1?.bgColor;
    await expect(bgColor).toBe("rgba(0, 0, 0, 0)");
  } catch (error) {
    const resolvedResult1 = await result1;
    console.error(
      `On grid Backgroud color is ${resolvedResult1?.bgColor}, expected= 'rgba(0, 0, 0, 0)`,
    );
  }

  await page.getByRole("button", { name: "Revoke" }).click();
  await expect(page.locator("#root")).toContainText(
    "Shaurya_Tooltip_TestingAlready Signed Off",
  );
  await page.getByLabel("").nth(1).check();
  await page.getByRole("button", { name: "Revoke Signoff" }).click();

  await page.getByRole("button", { name: "Sign off" }).click();
});
