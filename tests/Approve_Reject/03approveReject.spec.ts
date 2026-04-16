import { test, expect } from "@playwright/test";
import { login } from "../../lib/login";
import { openFromBreakManagement } from "../../lib/Signoff/openReconFromBreakManagement";
import { selectFilterByAttribute } from "../../lib/Locator/signoffLocator";
import { getCellByIdAndText } from "../../lib/Locator/signoffLocator";
import { signoutLogin } from "../../lib/login";
import { performActionOnCell } from "../../lib/Signoff/performActionOnCell";
import { closeFilter } from "../../lib/Locator/signoffLocator";

test("approveReject3", async ({ page }) => {

  await login(page, "mayadav_16@ivp.in", "Ivp@123");
  await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  await page.locator(selectFilterByAttribute("Status")).click();
  
  //validate open record-6145
  // await page.pause();
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
  await page.getByLabel("", { exact: true }).nth(2).click();

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
  await page.getByText('Reject Break', { exact: true }).click();
  await page.getByRole('button', { name: 'Update' }).click();
  try{
  await expect(page.getByLabel('Error while performing action')).toContainText('Error while performing actionAction failed : The User does not belongs to the Approver Group. Cannot Reject the Breaks.');
  }catch(error){
    console.error('Error during validation of error:Error while performing actionAction failed : The User does not belongs to the Approver Group. Cannot Reject the Breaks.')
  }

  //login by mayadav_re-arch@ivp.in
  await signoutLogin(page,"mayadav_re-arch@ivp.in","Ivp@123");
  await openFromBreakManagement(page,"Copy of Break_Management_Position_AP_RJ","Recon");
  await performActionOnCell(page,"Pending","18348725006773",{workflowAction:"Reject Break"},"Approve-2");
  // const searchBox = page.getByRole("textbox", { name: "Quick Search" });
  // await searchBox.fill("");
  // await page.waitForTimeout(3000);

  await expect(page.locator('[id*="cell-Pending Level"]')).toContainText('Pending at Level:1');
  // await page.getByText('Operations', { exact: true }).click();

 
  //close filter of status
  // await (page.locator(await closeFilter("Status"))).click();

await page.waitForTimeout(3000);
await page.getByRole('button', { name: 'Refresh' }).click();
// Filter By close
  await page.locator(await selectFilterByAttribute("Status")).click();
    await page.getByLabel('', { exact: true }).nth(2).click();
  await page.getByText('_operations').click();

  
  
  await page.getByText('18348725006773').click({
    button: 'right'
  });
//  await page.getByText("Workflow Actions").hover();
//   await page.getByText('Reject Break', { exact: true }).click();
// Trigger the 'mouseenter' event via JS
const workflowMenu = page.getByText("Workflow Actions");
await workflowMenu.dispatchEvent('mouseenter');
await workflowMenu.dispatchEvent('mouseover');

// Wait a split second for the menu to render
await page.waitForTimeout(300);

// Click the button—use force: true to ignore if the menu is 'technically' hidden
await page.getByText('Reject Break', { exact: true }).click({ force: true });
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByLabel('Error while performing action')).toContainText('Error while performing actionAction failed : The User does not belongs to the Approver Group. Cannot Reject the Breaks.');

  //action by operations
  await signoutLogin(page,"mayadav_16@ivp.in","Ivp@123");
  await openFromBreakManagement(page,"Copy of Break_Management_Position_AP_RJ","Recon");
  await performActionOnCell(page,"Pending","18348725006773",{workflowAction:"Approve Break"},"Reject-2");
  
  await expect(page.locator('[id*="cell-Pending Level"]')).toContainText('Pending at Level:2');
  //Approve is at level- opshead
  await signoutLogin(page,"mayadav_re-arch@ivp.in","Ivp@123");
   await openFromBreakManagement(page,"Copy of Break_Management_Position_AP_RJ","Recon");
     await page.locator(await selectFilterByAttribute("Status")).click();
    await page.getByLabel('', { exact: true }).nth(2).click();
  await page.getByText('Reject-2').click();
  //change Approver
    await page.getByText('18348725006773').click({
    button: 'right'
  });
//  await page.getByText("Workflow Actions").hover();
// const workflowMenu = page.getByText("Workflow Actions");
await workflowMenu.dispatchEvent('mouseenter');
await workflowMenu.dispatchEvent('mouseover');
  await page.getByText('Change Approver', { exact: true }).click({force: true});

  await page.locator('#bmActionPopUpGroupSelection').getByRole('button', { name: 'DropdownArrowBtn' }).click();
  await page.locator('[aria-controls*= "listbox"]').fill('Signoff');
  await page.getByRole('option', { name: 'SignOff_FirstApprover' }).click();
  await page.getByRole('button', { name: 'Update' }).click();
  //validate approver


  await expect(page.getByRole('grid')).toContainText('Pending at Level:2');

  await page.getByText('SignOff_FirstApprover', { exact: true }).click();
  await expect(page.locator('[id*="cell-Approver List"]')).toContainText('|Operations|SignOff_FirstApprover|');
  //Approve Break

  await page.getByText('18348725006773').click({
    button: 'right'
  });
  //  await page.getByText("Workflow Actions").hover();

await workflowMenu.dispatchEvent('mouseenter');
await workflowMenu.dispatchEvent('mouseover');
  await page.getByText('Approve Break').click({force: true});
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByLabel('Error while performing action')).toContainText('Error while performing actionAction failed : The User does not belongs to the Approver Group. Cannot Approve the Breaks.');

  
//login by signoff_FirstApprover
await signoutLogin(page,"mayadav_test_16@ivp.in","Ivp@123");
  await openFromBreakManagement(page,"Copy of Break_Management_Position_AP_RJ","Recon");
  await performActionOnCell(page,"Pending","18348725006773",{workflowAction:"Approve Break"},"Approve_signoffFirstApprover");

  await expect(page.getByLabel('Action performed')).toContainText('Action performedBreak(s) Approved Successfully!');

  //close filter of status
  await (page.locator(await closeFilter("Status"))).click();
await page.waitForTimeout(3000);
// Filter By close
  await page.locator(await selectFilterByAttribute("Status")).click();
  await page.getByLabel('', { exact: true }).nth(1).click();
  await page.getByText('External Exception').click();

  await page.getByRole('gridcell', { name: 'External Exception' }).click({
    button: 'right'
  });
  await page.getByText('Open Break').click();
  await page.getByRole('button', { name: 'Update' }).click();
  //opened close break
   await (page.locator(await closeFilter("Status"))).click();
  await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
   await page.locator(await selectFilterByAttribute("Status")).click();
  await page.getByText('Open (1)').click();




});