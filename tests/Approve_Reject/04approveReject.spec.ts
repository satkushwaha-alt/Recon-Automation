import { test, expect } from "@playwright/test";
import { login } from "../../lib/login";
import { openFromBreakManagement } from "../../lib/Signoff/openReconFromBreakManagement";
import { selectFilterByAttribute } from "../../lib/Locator/signoffLocator";
import { getCellByIdAndText } from "../../lib/Locator/signoffLocator";
import { signoutLogin } from "../../lib/login";
import { performActionOnCell } from "../../lib/Signoff/performActionOnCell";
import { closeFilter } from "../../lib/Locator/signoffLocator";
//Match Action
test("approveReject4", async ({ page }) => {
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
  //search and match break (2 Breaks)
  //Facility ID-7845237664,22357145317434
  await page.getByRole("textbox", { name: "Quick Search" }).click();
  await page.getByRole("textbox", { name: "Quick Search" }).fill("7845237664");
  await page.waitForTimeout(3000);
  await page
    .getByRole("gridcell", { name: "Press Space to toggle row" })
    .first()
    .click();
  await expect(page.locator("#ReconGrid")).toContainText("Selected : 1");

  await page.getByRole("textbox", { name: "Quick Search" }).click();
  await page.getByRole("textbox", { name: "Quick Search" }).fill("");
  await page.getByRole("textbox", { name: "Quick Search" }).click();
  await page
    .getByRole("textbox", { name: "Quick Search" })
    .fill("22357145317434");
  await page.waitForTimeout(3000);
  await page
    .getByRole("gridcell", { name: "Press Space to toggle row" })
    .first()
    .click();
  await expect(page.locator("#ReconGrid")).toContainText("Selected : 2");

  await page.getByText("22357145317434").click({
    button: "right",
  });
  await page.getByText("Match", { exact: true }).click();
  await page.getByRole("combobox", { name: "Remarks" }).click();
  await page
    .getByRole("combobox", { name: "Remarks" })
    .fill("Updated by satyam");
  await page.getByRole("button", { name: "Update" }).click();

  await page.getByRole("button", { name: "Refresh" }).click();
  //open pending record
  await page.locator(selectFilterByAttribute("Status")).click();
  await expect(page.locator("body")).toContainText("Open (6143)");
  await expect(page.locator("body")).toContainText("Pending (1)");
  await page.getByLabel("", { exact: true }).nth(2).check();
  await page.getByText("Updated by satyam").click();
  await expect(page.locator("#ReconGrid")).toContainText("Total Rows : 6,522");
  //Approve Break-Level1

  await expect(page.locator('[id*="cell-Pending Level"]')).toContainText(
    "Pending at Level:1",
  );
  await performActionOnCell(
    page,
    "Pending",
    "7845237664",
    { workflowAction: "Approve Break" },
    "Updated by satyam",
  );

  await expect(page.locator('[id*="cell-Pending Level"]')).toContainText(
    "Pending at Level:2",
  );
  await performActionOnCell(
    page,
    "Pending",
    "7845237664",
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
    "7845237664",
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
    "7845237664",
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
  await page.getByText("7845237664").click({
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
  await page.getByText("7845237664").click({
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
  await expect(page.locator("body")).toContainText("Open (6143)");
  await page.getByRole("button", { name: "Refresh" }).click();
  //Approve Break
  await performActionOnCell(
    page,
    "Pending",
    "7845237664",
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
  await page.getByText("Open (6143)").click();
  await expect(page.locator("#ReconGrid")).toContainText("Total Rows : 6,522");
  //undo records- back at signoff_FirstApprover
  await page.getByRole("button", { name: "Refresh" }).click();
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  await page
    .getByRole("button", { name: "Click to get actions for undo" })
    .click();
  await page.getByTestId("UndoActiveActionRow0Data").click();
  await page.getByRole("button", { name: "ok" }).click();
  //open pending record
  await page.locator(selectFilterByAttribute("Status")).click();
  await expect(page.locator("body")).toContainText("Open (6143)");
  await expect(page.locator("body")).toContainText("Pending (1)");
  await page.getByLabel("", { exact: true }).nth(2).click();
  await page.getByText("Updated by satyam").click();
  await expect(page.locator("#ReconGrid")).toContainText("Total Rows : 6,522");
  await expect(page.locator('[id*="cell-Pending Level"]')).toContainText(
    "Pending at Level:2",
  );
  await expect(page.locator('[id*="cell-Approver List"]')).toContainText(
    "|Operations|SignOff_FirstApprover|",
  );

  //unmatch break
  await page.getByText("7845237664").click({
    button: "right",
  });
  await page.getByText("UnMatch").click();
  await page.getByRole("button", { name: "Update" }).click();

  //validate satus
  await page.locator(closeFilter("Status")).click();
  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  await page.locator(selectFilterByAttribute("Status")).click();
  await page.getByText("Open (6145)").click();
  await expect(page.locator("#ReconGrid")).toContainText("Total Rows : 6,523");
});
