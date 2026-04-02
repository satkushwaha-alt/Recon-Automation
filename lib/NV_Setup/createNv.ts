import { Page } from "@playwright/test";

export async function createNV(
  page: Page,
  view_name: string,
  Description: string,
  recon_type: string
) {
  try {
      const Beforenames = await page.locator('.ellipsis-text').allTextContents();
    const BeforetrimmedNames = Beforenames.map(n => n.trim());
    await page.getByRole("button", { name: "Add View" }).click();

    await page.getByRole("textbox", { name: "View Name" }).fill(view_name);

    await page.getByRole("textbox", { name: "Description" }).fill(Description);

    await page.getByRole("button", { name: "DropdownArrowBtn" }).click();

    await page.locator("#DailyorMonthEndDropDown input").fill(recon_type);
    await page.getByRole("option", { name: recon_type }).click();

    await page.getByRole("button", { name: "Add", exact: true }).click();

    //  Wait for UI to update (better: replace with proper wait if possible)
    await page.waitForTimeout(2000);

    //  Validate in list
    const names = await page.locator('.ellipsis-text').allTextContents();
    const trimmedNames = names.map(n => n.trim());

    // console.log("UI Names:", trimmedNames);
    const existedBefore = BeforetrimmedNames.includes(view_name);
const existsAfter = trimmedNames.includes(view_name);

if (!existedBefore && existsAfter) {
  console.log(` '${view_name}' → View created successfully`);
} 
else if (existedBefore && existsAfter) {
  console.log(` '${view_name}' already exists → can't be created`);
} 
else {
  console.log(` '${view_name}' → View NOT created`);
}

  } catch (error) {
    console.error(`Error During Create NV`, error);
    throw error;
  }
}