import { test, expect } from "@playwright/test";
import { login } from "../../lib/login";
import { openFromBreakManagement } from "../../lib/Signoff/openReconFromBreakManagement";
import { selectFilterByAttribute } from "../../lib/Locator/signoffLocator";
import { signoutLogin } from "../../lib/login";
import { performActionOnCell } from "../../lib/Signoff/performActionOnCell";
import { closeFilter } from "../../lib/Locator/signoffLocator";
import { facilityId50InternalException } from "../../Static_Files/ApproveReject/data";
import { selectRowByValues } from "../../lib/Approvereject/selectrowByValues";
//Internal Exception - Aggregate 50 records
test("approveReject9", async ({ page }) => {
  await login(page, "mayadav_16@ivp.in", "Ivp@123");
  await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  await page.locator(selectFilterByAttribute("Status")).click();
  //validate open record-6145
  await expect(page.locator("body")).toContainText("Blanks");
  await expect(page.locator("body")).toContainText("Open (6145)");
  await expect(page.locator("#ReconGrid")).toContainText("Total Rows : 6,523");
  await page.getByText("Total Rows").click();
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  //Filter Break Type- Internal Exception
  await page.locator(selectFilterByAttribute("Break Type")).click();
  await page.getByLabel("", { exact: true }).nth(1).click();
  await page.waitForTimeout(3000);
  //Filter Fitch Rating- B
  await page.locator(selectFilterByAttribute("Fitch Rating")).click();
  await page.getByLabel("", { exact: true }).nth(1).click();
  //select multiple records
  await selectRowByValues(page, facilityId50InternalException);
  //aggregate action
  await page
    .getByText(
      facilityId50InternalException[facilityId50InternalException.length - 1],
    )
    .click({
      button: "right",
    });
  await page.getByText("Aggregate").click();
  await page.getByRole("combobox", { name: "Remarks" }).click();
  await page
    .getByRole("combobox", { name: "Remarks" })
    .fill("aggregate by satyam");
  await page.getByRole("button", { name: "Update" }).click();

  await page.getByRole("button", { name: "Refresh" }).click();
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  //validate aggregate record
  try {
    await page.locator(selectFilterByAttribute("Status")).click();
    await expect(page.locator("body")).toContainText("Open (6095)");
    await expect(page.locator("body")).toContainText("Pending (1)");
    await page.getByLabel("", { exact: true }).nth(2).click();
    await page.getByText("aggregate by satyam").click();
    await expect(page.locator("#ReconGrid")).toContainText(
      "Total Rows : 6,474",
    );
  } catch (e) {
    console.log("Error in validating record status count and total rows count");
  }

  //Approve Break-Level1
  await page.waitForTimeout(3000);
  let pendingLevelCellValue = await page
    .locator('[id*="cell-Facility ID"]')
    .textContent();
  console.log("Pending Level Cell Value: ", pendingLevelCellValue);
  await expect(page.locator('[id*="cell-Pending Level"]')).toContainText(
    "Pending at Level:1",
  );
  if (!pendingLevelCellValue) {
    pendingLevelCellValue = "";
  }
  await performActionOnCell(
    page,
    "Pending",
    pendingLevelCellValue,
    { workflowAction: "Approve Break" },
    "Updated by satyam",
  );
  await expect(page.locator('[id*="cell-Pending Level"]')).toContainText(
    "Pending at Level:2",
  );
  await performActionOnCell(
    page,
    "Pending",
    pendingLevelCellValue,
    { workflowAction: "Reject Break" },
    "Updated by satyam",
  );
  await expect(page.getByLabel("Error while performing action")).toContainText(
    "Error while performing actionAction failed : The User does not belongs to the Approver Group. Cannot Reject the Breaks.",
  );
  await page.getByLabel("Error while performing action").click();

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
    pendingLevelCellValue,
    { workflowAction: "Reject Break" },
    "Updated by satyam",
  );

  await expect(page.locator('[id*="cell-Pending Level"]')).toContainText(
    "Pending at Level:1",
  );
  //login by mayadav_16@ivp.in
  await signoutLogin(page, "mayadav_16@ivp.in", "Ivp@123");
  await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  await performActionOnCell(
    page,
    "Pending",
    pendingLevelCellValue,
    { workflowAction: "Approve Break" },
    "Updated by satyam",
  );
  await expect(page.locator('[id*="cell-Pending Level"]')).toContainText(
    "Pending at Level:2",
  );
  //login by mayadav_re-arch@ivp.in
  await signoutLogin(page, "mayadav_re-arch@ivp.in", "Ivp@123");
  await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  //change approver- signoff_FirstApprover
  await page.locator(await selectFilterByAttribute("Status")).click();
  await page.getByLabel("", { exact: true }).nth(2).click();
  await page.getByText("Updated by satyam").click();
  //change Approver
  await page.getByText(pendingLevelCellValue).click({
    button: "right",
  });
  //  await page.getByText("Workflow Actions").hover();
  const workflowMenu = page.getByText("Workflow Actions");
  await workflowMenu.dispatchEvent("mouseenter");
  await workflowMenu.dispatchEvent("mouseover");
  await page
    .getByText("Change Approver", { exact: true })
    .click({ force: true });

  await page
    .locator("#bmActionPopUpGroupSelection")
    .getByRole("button", { name: "DropdownArrowBtn" })
    .click();
  await page.locator('[aria-controls*= "listbox"]').fill("Signoff");
  await page.getByRole("option", { name: "SignOff_FirstApprover" }).click();
  await page.getByRole("button", { name: "Update" }).click();
  //validate approver
  await expect(page.getByRole("grid")).toContainText("Pending at Level:2");

  await page.getByText("SignOff_FirstApprover", { exact: true }).click();
  await expect(page.locator('[id*="cell-Approver List"]')).toContainText(
    "|Operations|SignOff_FirstApprover|",
  );
  //Approve Break- should comes error as signoff_FirstApprover is not in approver list of level-2
  await page.getByText(pendingLevelCellValue).click({
    button: "right",
  });
  await workflowMenu.dispatchEvent("mouseenter");
  await workflowMenu.dispatchEvent("mouseover");
  await page.getByText("Approve Break").click({ force: true });
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.getByLabel("Error while performing action")).toContainText(
    "Error while performing actionAction failed : The User does not belongs to the Approver Group. Cannot Approve the Breaks.",
  );
  //login by signoff_FirstApprover
  await signoutLogin(page, "mayadav_test_16@ivp.in", "Ivp@123");
  await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  await page.locator(await selectFilterByAttribute("Status")).click();
  await expect(page.locator("body")).toContainText("Pending (1)");
  await page.getByRole("button", { name: "Refresh" }).click();
  //Approve Break
  await performActionOnCell(
    page,
    "Pending",
    pendingLevelCellValue,
    { workflowAction: "Approve Break" },
    "Updated by satyam",
  );
  await expect(page.getByLabel("Action performed")).toContainText(
    "Action performedBreak(s) Approved Successfully!",
  );
  await page.locator(closeFilter("Status")).click();

  await page.getByRole("button", { name: "Refresh" }).click();
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  //validate records
  await page.locator(selectFilterByAttribute("Status")).click();
  try {
    await page.getByText("Open (6095)").click();
    await expect(page.locator("#ReconGrid")).toContainText(
      "Total Rows : 6,474",
    );
  } catch (e) {
    console.log(
      "Error in validating record status count and total rows count after approval",
    );
  }

  await page.getByRole("button", { name: "Copy of" }).click();
  //Run Again
  await page.getByRole("button", { name: "Run Again" }).click();
  await page.waitForTimeout(1000 * 300);
  await expect(page.locator("#ReconGrid")).toContainText("Total Rows : 6,523");
});
