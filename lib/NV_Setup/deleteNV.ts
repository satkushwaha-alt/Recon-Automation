import { expect, Page } from '@playwright/test';

// delete NV + validate
export async function deleteNv(
  page: Page,
  selector: string,
  nv_name: string
) {
  try {
    //  Delete NV
    await page.getByRole('textbox', { name: 'Search here' }).fill(nv_name);

    await page.getByRole('button', { name: nv_name }).click(); // ⚠️ missing click earlier
    await page.getByRole('button', { name: 'Delete NV' }).click();
    await page.getByRole('button', { name: 'Confirm deletion' }).click();

    //  Wait for UI update (important)
    await page.waitForTimeout(2000);

    //  Validate list
    const locator = page.locator(selector);
    await locator.first().waitFor();

    const names = await locator.allTextContents();
    const trimmedNames = names.map(n => n.trim());

    // console.log("UI Names:", trimmedNames);

    // 🔍 Check presence manually
    const isPresent = trimmedNames.includes(nv_name);

    if (isPresent) {
      console.log(` '${nv_name}' is STILL present → Not deleted`);
    } else {
      console.log(` '${nv_name}' is NOT present → Successfully deleted`);
    }

    //  Assertion (final validation)
    expect(
      trimmedNames,
      `Name '${nv_name}' should NOT be present in list`
    ).not.toContain(nv_name);

  } catch (error) {
    console.error(`Error During Delete NV`, error);
    throw error;
  }
}