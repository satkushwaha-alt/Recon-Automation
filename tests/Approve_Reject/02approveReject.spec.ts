import { test, expect } from "@playwright/test";
import { login } from "../../lib/login";
import { openFromBreakManagement } from "../../lib/Signoff/openReconFromBreakManagement";
import { selectFilterByAttribute } from "../../lib/Locator/signoffLocator";
import { getCellByIdAndText } from "../../lib/Locator/signoffLocator";
import { signoutLogin } from "../../lib/login";
import { performActionOnCell } from "../../lib/Signoff/performActionOnCell";
import { closeFilter } from "../../lib/Locator/signoffLocator";

test("approveReject1", async ({ page }) => {
  await login(page, "mayadav_16@ivp.in", "Ivp@123");
  await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  await page.locator(selectFilterByAttribute("Status")).click();
  // await page.pause();
  //validate open record-6145
  await expect(page.locator("body")).toContainText("Blanks");
  await expect(page.locator("body")).toContainText("Open (6145)");

  //search and close break
  await page.getByRole("textbox", { name: "Quick Search" }).click();
  await page
    .getByRole("textbox", { name: "Quick Search" })
    .fill("18348725006773");
  await page
    .locator('[id*="cell-Facility ID"] span')
    .filter({ hasText: "18348725006773" })
    .click();
  await page.getByText("18348725006773").click({
    button: "right",
  });
  await page.getByText("Close Break").click();
  await page.getByRole("combobox", { name: "Remarks" }).click();
  await page.getByRole("combobox", { name: "Remarks" }).fill("_operations");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(
    page.locator(`//span[contains(@id,'cell-Status')]//div[text()='Pending']`),
  ).toContainText("Pending");

  await page.getByRole("textbox", { name: "Quick Search" }).click();
  await page.getByRole("textbox", { name: "Quick Search" }).fill("");
  await page.waitForTimeout(3000);
  //validate record in status
  await page.locator(selectFilterByAttribute("Status")).click();
  await expect(page.locator("body")).toContainText("Open (6144)");
  await expect(page.locator("body")).toContainText("Pending (1)");
  await page.getByLabel("", { exact: true }).nth(2).check();

  await expect(page.getByRole('grid')).toContainText('Pending Level');
  await expect(page.locator('[id*="cell-Pending Level"]')).toContainText('Pending at Level:1');

  await expect(page.getByRole('grid')).toContainText('Approver');

  await page.getByText('Operations', { exact: true }).click();

  await expect(page.getByRole('grid')).toContainText('Approver List');
  await expect(page.locator('[id*="cell-Approver List"]')).toContainText('|Operations|OpsHead|');
  //Approve Break
   await page.getByText("18348725006773").click({
    button: "right",
  });
  await page.getByText("Workflow Actions").hover();
  await page.getByText("Approve Break").click();
  await page.getByRole("combobox", { name: "Remarks" }).click();
  await page
    .getByRole("combobox", { name: "Remarks" })
    .fill(" Approve-1");
  await page.getByRole("button", { name: "Update" }).click();

  await expect(page.locator('#root')).toContainText('Action performedBreak(s) Approved Successfully!✕');

  //validation - At Level 2
  await expect(page.getByRole('grid')).toContainText('Pending Level');
  await expect(page.locator('[id*="cell-Pending Level"]')).toContainText('Pending at Level:2');

  await expect(page.getByRole('grid')).toContainText('Approver');
  await page.getByText('OpsHead', { exact: true }).click();


  await page.getByText('18348725006773').click({
    button: 'right'
  });
    await page.getByText("Workflow Actions").hover();
  await page.getByText('Approve Break', { exact: true }).click();
  await page.getByRole('button', { name: 'Update' }).click();
  try{
  await expect(page.getByLabel('Error while performing action')).toContainText('Error while performing actionAction failed : The User does not belongs to the Approver Group. Cannot Approve the Breaks.');
  }catch(error){
    console.error('Error during validation of error:Error while performing actionAction failed : The User does not belongs to the Approver Group. Cannot Approve the Breaks.')
  }

  //login by mayadav_re-arch@ivp.in
  await signoutLogin(page,"mayadav_re-arch@ivp.in","Ivp@123");
  await openFromBreakManagement(page,"Copy of Break_Management_Position_AP_RJ","Recon");
  await performActionOnCell(page,"Pending","18348725006773",{workflowAction:"Approve Break"},"Approve-2");

  //close filter of status
  await (page.locator(await closeFilter("Status"))).click();
await page.waitForTimeout(3000);
// Filter By close
  await page.locator(await selectFilterByAttribute("Status")).click();
  await page.getByLabel('', { exact: true }).nth(1).check();

  await page.getByText('External Exception').click();
  
  
  await page.getByText('18348725006773').click({
    button: 'right'
  });
  await page.getByText('Open Break').click();
  await page.getByRole('button', { name: 'Update' }).click();



});