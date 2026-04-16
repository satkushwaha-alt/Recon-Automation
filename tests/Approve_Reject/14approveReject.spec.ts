import { test, expect } from "@playwright/test";
import { login } from "../../lib/login";
import { openFromBreakManagement } from "../../lib/Signoff/openReconFromBreakManagement";
import { selectFilterByAttribute } from "../../lib/Locator/signoffLocator";
import { getCellByIdAndText } from "../../lib/Locator/signoffLocator";
import { signoutLogin } from "../../lib/login";
import { performActionOnCell } from "../../lib/Signoff/performActionOnCell";
import { closeFilter } from "../../lib/Locator/signoffLocator";
import { selectRowByValues } from "../../lib/Approvereject/selectrowByValues";
import { aggregateCloseEE, aggregatePairClose, allBreakType } from "../../Static_Files/ApproveReject/data";
import { flotingFilterButtonAttrributeClick } from "../../lib/Approvereject/approveRejectMethod";

test("approveReject14", async ({ page }) => {
  await login(page, "mayadav_16@ivp.in", "Ivp@123");
  await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );

  //validate open record-6145
  await page.locator(selectFilterByAttribute("Status")).click();
  await expect(page.locator("body")).toContainText("Blanks");
  await expect(page.locator("body")).toContainText("Open (6145)");
  await expect(page.locator("#ReconGrid")).toContainText("Total Rows : 6,523");
  await page.getByText("Total Rows").click();
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  //select values of all break Type for close Action
  await selectRowByValues(page, allBreakType);
  //right clik
  await page.getByText(allBreakType[allBreakType.length - 1]).click({
    button: "right",
  });

  //update remarks

  await page.getByLabel("Context Menu").getByText("Update Remarks").click();
  await page.getByRole("combobox", { name: "Remarks" }).click();
  await page
    .getByRole("combobox", { name: "Remarks" })
    .fill("update remarks test");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.locator('[id*="cell-User Remarks"]').first()).toContainText(
    "update remarks test",
  );

  await page.getByRole("textbox", { name: "Quick Search" }).click();
  await page.getByRole("textbox", { name: "Quick Search" }).fill("");
  await page.getByRole("button", { name: "Refresh" }).click();
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();

  //validate open record-6145
  await page.locator(selectFilterByAttribute("Status")).click();
  await expect(page.locator("body")).toContainText("Blanks");
  await expect(page.locator("body")).toContainText("Open (6145)");
  await expect(page.locator("#ReconGrid")).toContainText("Total Rows : 6,523");
  await page.getByText("Total Rows").click();
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  await page.getByRole("button", { name: "Refresh" }).click();
  //validate update remarks- comment
  await page.locator(selectFilterByAttribute("User Remarks")).click();
  await page
    .getByRole("textbox", { name: "Search..." })
    .fill("update remarks test");
  await page.getByLabel("", { exact: true }).first().click();
  await page.getByText("External Exception").first().click();
  await expect(page.locator('[id*="cell-User Remarks"]').first()).toContainText(
    "update remarks test",
  );
  await expect(page.locator('[id*="cell-User Remarks"]').nth(1)).toContainText(
    "update remarks test",
  );
  await expect(page.locator('[id*="cell-User Remarks"]').nth(2)).toContainText(
    "update remarks test",
  );
  await expect(page.locator('[id*="cell-User Remarks"]').nth(3)).toContainText(
    "update remarks test",
  );
  await expect(page.locator('[id*="cell-User Remarks"]').nth(4)).toContainText(
    "update remarks test",
  );

  //close break- IE,EE,Paired
  await page
    .getByRole("gridcell", { name: "Press Space to toggle row" })
    .first()
    .click();

  await page
    .getByRole("gridcell", { name: "Press Space to toggle row" })
    .nth(1)
    .click();
  await page
    .getByRole("gridcell", { name: "Press Space to toggle row" })
    .nth(2)
    .click();
  await page.getByText("12974573755512").click({
    button: "right",
  });
  await page.getByText("Close Break").click();
  await page.getByRole("combobox", { name: "Remarks" }).click();
  await page
    .getByRole("combobox", { name: "Remarks" })
    .fill("close break test");
  await page.getByRole("button", { name: "Update" }).click();

  await page
    .getByRole("gridcell", { name: "Press Space to toggle row" })
    .first()
    .click();
  await page.getByText("2110184123039").click({
    button: "right",
  });
  //validate audit trail of update remarks test
  await page.getByText("Audit Trail").click();
  await page.getByText("Audit Trail").click();
  await expect(page.locator("#actionName")).toContainText("Update Remarks");
  await page.getByTitle("update remarks test").click();
  await page.getByText("Updated Assignee : OpsHead").click();
  await page.getByText("Break Status : None").click();

  await expect(page.locator("#AuditTrailReport")).toContainText(
    "Break State : Completed Without Approval",
  );
  await page.getByTestId("closeAuditTrailPopup").click();

  await page.getByRole("button", { name: "Refresh" }).click();
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();

  //open pending breaks-( on this close break action performed)
  await page.locator(selectFilterByAttribute("Status")).click();
  await expect(page.locator("body")).toContainText("Pending (3)");
  await page.getByLabel("", { exact: true }).nth(2).check();
  await page.locator('[id*="cell-User Remarks"]').first().click();
  // Pending Status of closed Break
  await expect(
    page.locator('[id*="cell-Pending Level"]').first(),
  ).toContainText("Pending at Level:1");
  await expect(page.locator('[id*="cell-Pending Level"]').nth(1)).toContainText(
    "Pending at Level:1",
  );
  await expect(page.locator('[id*="cell-Pending Level"]').nth(2)).toContainText(
    "Pending at Level:1",
  );
  //Audit Trail of Closed Break

  await page.getByText("External Exception").click({
    button: "right",
  });
  await page.getByText("Audit Trail").click();
  await expect(page.locator("#AuditTrailReport")).toContainText(
    "Close BreaksBy : mayadav_16@ivp.in",
  );
  await expect(page.locator("#AuditTrailReport")).toContainText(
    "close break test",
  );
  await expect(page.locator("#AuditTrailReport")).toContainText(
    "Updated Assignee : OpsHead",
  );
  await expect(page.locator("#AuditTrailReport")).toContainText(
    "Break Status : None",
  );
  await expect(page.locator("#AuditTrailReport")).toContainText(
    "Break State : Pending",
  );
  await page.getByTestId("closeAuditTrailPopup").click();
  //Approve Break- External Exception
  await page.getByText("External Exception").click({
    button: "right",
  });
  await page.getByText("Workflow Actions").hover();
  await page.getByText("Approve Break").click();
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.locator('[id*="cell-Pending Level"]').nth(2)).toContainText(
    "Pending at Level:2",
  );
  //Reject Break-Internal Exception,Paired

  await page
    .getByRole("gridcell", { name: "Press Space to toggle row" })
    .first()
    .click();
  await page
    .getByRole("gridcell", { name: "Press Space to toggle row" })
    .nth(1)
    .click();
  await page.getByText("Internal Exception").click({
    button: "right",
  });
  await page.getByText("Workflow Actions").hover();
  await page.getByText("Reject Break").click();
  await page.getByRole("button", { name: "Update" }).click();

  //login by mayadav_re-arch@ivp.in
  await signoutLogin(page, "mayadav_re-arch@ivp.in", "Ivp@123");
  await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  await performActionOnCell(
    page,
    "Pending",
    "12974573755512",
    { workflowAction: "Approve Break" },
    "Break approved",
  );
  //open closed break
  await page.getByRole("button", { name: "Refresh" }).click();
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  await page.locator(selectFilterByAttribute("Status")).click();
  await page.getByLabel("", { exact: true }).nth(1).check();
  await page.getByText("Break approved").click();
  //Audit Trail

  await page.getByText("External Exception").click({
    button: "right",
  });
  await page.getByText("Audit Trail").click();
  await expect(page.locator("#AuditTrailReport")).toContainText(
    "Approve BreaksBy : mayadav_re-arch@ivp.in",
  );
  await page.getByTestId("closeAuditTrailPopup").click();
  //open again
  await page.getByText("12974573755512").click({
    button: "right",
  });
  await page.getByText("Open Break").click();
  await page.getByRole("combobox", { name: "Remarks" }).click();
  await page.getByRole("combobox", { name: "Remarks" }).fill("open break");
  await page.getByRole("button", { name: "Update" }).click();

  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  await page.getByRole("button", { name: "Refresh" }).click();
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  //close again

  await page.getByRole("textbox", { name: "Quick Search" }).click();
  await page
    .getByRole("textbox", { name: "Quick Search" })
    .fill("12974573755512");
  await page.getByText("12974573755512").click({
    button: "right",
  });
  await page.getByText("Close Break").click();
  await page.getByRole("combobox", { name: "Remarks" }).click();
  await page.getByRole("combobox", { name: "Remarks" }).fill("close again");
  await page.getByRole("button", { name: "Update" }).click();
  //Approve at level 1
  await signoutLogin(page, "mayadav_16@ivp.in", "Ivp@123");
  await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  await performActionOnCell(
    page,
    "Pending",
    "12974573755512",
    { workflowAction: "Approve Break" },
    "Break approved",
  );
  //approve at level 2
  await signoutLogin(page, "mayadav_re-arch@ivp.in", "Ivp@123");
  await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  await performActionOnCell(
    page,
    "Pending",
    "12974573755512",
    { workflowAction: "Approve Break" },
    "Break approved",
  );
  //open closed
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  await page.getByRole("button", { name: "Refresh" }).click();
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  await page.locator(selectFilterByAttribute("Status")).click();
  await page.getByLabel("", { exact: true }).nth(1).check();
  await page.getByText("Break approved").first().click();
  try {
    await expect(page.locator("[id*='cell-Status']")).toContainText("Closed");
  } catch (error) {
    console.log("Error During validationg closed recon");
  }
  await page.getByText("12974573755512").click({
    button: "right",
  });
  await page.getByText("Open Break").click();
  await page.getByRole("button", { name: "Update" }).click();
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();

  //Aggregate and Close
  try{
    await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
  await selectRowByValues(page, aggregateCloseEE);
    await page.getByText(aggregateCloseEE[aggregateCloseEE.length - 1]).click({
    button: "right",
  });
  await page.getByText('Close Break').click();
  await page.locator('#divAggregate').getByRole('checkbox').click();
  await page.getByRole('combobox', { name: 'Remarks' }).click();
  await page.getByRole('combobox', { name: 'Remarks' }).fill('\nClose - Aggregate And Close');
  await page.getByRole('button', { name: 'Update' }).click();
  await signoutLogin(page,"mayadav_16@ivp.in","Ivp@123");
    await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  await performActionOnCell(
    page,
    "Pending",
    "14483706444875",
    { workflowAction: "Approve Break" },
    "Aggregate and Close",
  );

 await  signoutLogin(page,"mayadav_re-arch@ivp.in","Ivp@123");
    await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  await performActionOnCell(
    page,
    "Pending",
    "14483706444875",
    { workflowAction: "Approve Break" },
    "Aggregate and Close",
  );

  await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
  
  await page.locator(selectFilterByAttribute("Status"));
  await page.getByRole('textbox', { name: 'Search...' }).fill('closed');
  await page.getByLabel('', { exact: true }).check();
  await page.getByText('14483706444875').nth(1).click();

  await page.getByText('Aggregate and Close').click();
  await page.getByText('14483706444875').click({
    button: 'right'
  });
  await page.getByText('Open Break').click();
  await page.getByRole('button', { name: 'Update' }).click();

  await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
  }catch(error){
    console.error('Error in Aggregate and Close');
  }
  //Aggregate Pair and Close

  try{
        await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
  await selectRowByValues(page, aggregatePairClose);
    await page.getByText(aggregatePairClose[aggregatePairClose.length - 1]).click({
    button: "right",
  });
  await page.getByText('Close Break').click();
  await page.locator('#divAggregate').getByRole('checkbox').click();
  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByRole('combobox', { name: 'Remarks' }).click();
  await page.getByRole('combobox', { name: 'Remarks' }).click();
  await page.getByRole('combobox', { name: 'Remarks' }).fill('\nClose - Pair And Close Break(s)');
  await page.getByRole('button', { name: 'Update' }).click();
  await signoutLogin(page,"mayadav_16@ivp.in","Ivp@123");
    await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  await performActionOnCell(
    page,
    "Pending",
    "14483706444875",
    { workflowAction: "Approve Break" },
    "Aggregate pair and Close",
  );

  await signoutLogin(page,"mayadav_re-arch@ivp.in","Ivp@123");
    await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  await performActionOnCell(
    page,
    "Pending",
    "14483706444875",
    { workflowAction: "Approve Break" },
    "Aggregate Pair and Close",
  );

  await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
  
  await page.locator(selectFilterByAttribute("Status"));
  await page.getByRole('textbox', { name: 'Search...' }).fill('closed');
  await page.getByLabel('', { exact: true }).check();
  await page.getByText('7845238058').first().click();

  await page.getByText('Aggregate and Close').click();
  await page.getByText('7845238058').click({
    button: 'right'
  });
  await page.getByText('Open Break').click();
  await page.getByRole('button', { name: 'Update' }).click();



  }catch(error){
    console.error('Error in Aggregate , Pair close');
  }
  //Close- System Aggregated IE
  try{
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
  await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();


 await flotingFilterButtonAttrributeClick(page,"AF");
  await page.getByText('INIn').click();
  await page.locator(selectFilterByAttribute("AF")).click();
  await page.getByText('IID1.1.5').click();
  await page.getByRole('textbox', { name: 'Quick Search' }).click();
  await page.getByRole('textbox', { name: 'Quick Search' }).fill('IID1.1.5');
  await page.getByRole('gridcell', { name: 'Press Space to toggle row' }).click();
  await page.getByText('IID1.1.5').click({
    button: 'right'
  });
  await page.getByText('Close Break', { exact: true }).click();
  await page.getByRole('combobox', { name: 'Remarks' }).click();
  await page.getByRole('combobox', { name: 'Remarks' }).fill('aggregate-close');
  await page.getByRole('button', { name: 'Update' }).click();

  await signoutLogin(page,"mayadav_re-arch1@ivp.in","Ivp@101");
    await performActionOnCell(
    page,
    "Pending",
    "307419281447",
    { workflowAction: "Approve Break" },
    "aggregate-close",
  );
    await performActionOnCell(
    page,
    "Pending",
    "307419281447",
    { workflowAction: "Approve Break" },
    "aggregate-close",
  );

  await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();
  await page.locator(selectFilterByAttribute("Status")).click();
  await page.getByLabel('', { exact: true }).nth(1).check();
  await page.getByText('aggregate-close').click();

  await expect(page.locator('[id*= "cell-Status"]')).toContainText('Closed');
  //open closed
  await page.getByText('307419281447', { exact: true }).click({
    button: 'right'
  });
  await page.getByText('Open Break').click();

  await page.getByRole('combobox', { name: 'Remarks' }).click();
  await page.getByRole('combobox', { name: 'Remarks' }).fill('aggregate-close-open');
  await page.getByRole('button', { name: 'Update' }).click();
  }catch(error){
    console.error('Error During close-  System Aggregated IE');
  }






});
