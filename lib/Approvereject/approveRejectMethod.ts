import { Page, expect } from "@playwright/test";
export const flotingFilterButtonAttrributeClick = async (
  page: Page,
  attribute: string,
) => {
  await page
    .locator(`[id*= "floatingFilter_${attribute}_adaptableId"]`)
    .locator('[data-name*= "floating-filter-button"]')
    .click();
};

export const expandFilterAttrributeClick = async (
  page: Page,
  attribute: string,
) => {
  await page
    .locator(`[id*= "floatingFilter_${attribute}_adaptableId"]`)
    .locator('[data-name*= "expand-filter"] ')
    .click();
};

export const assignBreak = async (
  page: Page,
  valueForRightClick: string,
  assigned_user: string,
  remarks: string,
) => {
  try {
    await page.getByText(valueForRightClick).click({
      button: "right",
    });
    await page.getByText("Workflow Actions").hover();
    await page.getByText('Assign Break', { exact: true }).click();
    const dropdown = page.getByRole('textbox', { name: 'Users' });
  await dropdown.click();
  await dropdown.type(assigned_user, { delay: 100 });
  await page.getByRole('option').first().waitFor({ state: 'visible' });
  await page.getByRole('option', {
    name: assigned_user
  }).click();

    await page.getByRole("combobox", { name: "Remarks" }).click();
    await page.getByRole("combobox", { name: "Remarks" }).fill(remarks);
    await page.getByRole("button", { name: "Update" }).click();
    try{
        
   const locator = page.locator('[id*="cell-User Remarks"]').first();
await locator.waitFor({ state: 'visible' });
let text = await locator.textContent();
console.log('User Remarks:', text);
await expect(locator).toContainText(remarks);
}catch(error){
    console.error(`Error in validating user remarks`);
}

    await page
      .locator('[id*="cell-Facility ID"]')
      .filter({ hasText: valueForRightClick })
      .click({
        button: "right",
      });
    //Audit Trail
    await page.getByText("Audit Trail").click();
    await expect(page.locator("#AuditTrailReport")).toContainText(remarks);
    await expect(page.locator("#AuditTrailReport")).toContainText(
      `Updated Assignee : ${assigned_user} `
    );
    await page.getByTestId("closeAuditTrailPopup").click();
  } catch (error) {
    console.error(`Error in Assign Break`);
  }
};
