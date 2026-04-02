import { Page, expect } from "@playwright/test";
export async function updateNV(
  page: Page,
  view_name: string,
  update_view_name: string,
  update_desc: string,
  recon_type: string,
) {
  try {
    await page.getByRole("textbox", { name: "Search here" }).click();
    await page
      .getByRole("textbox", { name: "Search here" })
      .fill(`${view_name}`);

    await page.getByRole("button", { name: `${view_name}` }).click();
    await page.getByRole("button", { name: "Update NV" }).click();
    await page.getByRole("textbox", { name: "View Name" }).click();
    await page
      .getByRole("textbox", { name: "View Name" })
      .fill(`${update_view_name}`);

    await page
      .getByRole("textbox", { name: "Description" })
      .click({ force: true });
    await page
      .getByRole("textbox", { name: "Description" })
      .fill(`${update_desc}`);
    const value = await page
      .locator("#AddNormalizedViewReconTypeWrapper input")
      .getAttribute("value");
    expect(value).toBe(`${recon_type}`);

    await page.getByRole("button", { name: "Update", exact: true }).click();
  } catch (error) {
    console.error(`Error During update NV`);
  }
}
