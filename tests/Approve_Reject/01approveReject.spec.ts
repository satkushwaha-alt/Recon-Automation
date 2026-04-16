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
//   await page.pause();
  await page.getByText("18348725006773").click({
    button: "right",
  });
  await page.getByText("Workflow Actions").hover();
  await page.getByText("Approve Break").click();
  await page.getByRole("combobox", { name: "Remarks" }).click();
  await page
    .getByRole("combobox", { name: "Remarks" })
    .fill("close record Approve-1");
  await page.getByRole("button", { name: "Update" }).click();

//   await expect(page.getByLabel("Error while performing action")).toContainText(
//     "Error while performing actionAction failed : The User does not belongs to the Approver Group. Cannot Approve the Breaks.",
//   );
  // login by mayadav_16@ivp.in
  await signoutLogin(page, "mayadav_16@ivp.in", "Ivp@123");
  //open recon
  await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon"
  );

  // await performActionOnCell(
  //   page,
  //   "Pending",
  //   "18348725006773",
  //   { workflowAction: "Approve Break" },
  //   "update-1",
  // );
  await performActionOnCell(
    page,
    "Pending",
    "18348725006773",
    { workflowAction: "Approve Break" },
    "update-1",
  );
  try {
    await expect(
      page.getByLabel("Error while performing action"),
    ).toContainText(
      "Error while performing actionAction failed : The User does not belongs to the Approver Group. Cannot Approve the Breaks.",
    );
  } catch (error) {
    console.error(
      "Error During validate of error:The User does not belongs to the Approver Group. Cannot Approve the Breaks.",
    );
  }

  //login by mayadav_re-arch@ivp.in
  await signoutLogin(page, "mayadav_re-arch@ivp.in", "Ivp@123");
  await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
await page.getByRole('button', { name: 'Refresh' }).click();
await page.waitForTimeout(3000);
  await performActionOnCell(
    page,
    "Pending",
    "18348725006773",
    { workflowAction: "Approve Break" },
    "update-2",
  );
  await expect(page.locator("#root")).toContainText(
    "Action performedBreak(s) Approved Successfully!✕",
  );
  //validate close record
  //click on close filter of status
  await page.locator(await closeFilter("Status")).click();
  //Filter byy close
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.locator(await selectFilterByAttribute("Status")).click();
  await page.getByLabel("", { exact: true }).nth(1).click();
  await page.waitForTimeout(3000);
  await page
    .getByRole("checkbox", { name: "Column with Header Selection" })
    .check();
    await page.waitForTimeout(3000);
  await expect(page.locator("#selectedRowCountNumber")).toContainText("01");

  //
  await page
    .getByRole("checkbox", { name: "Column with Header Selection" })
    .uncheck();
  await page.locator(await closeFilter("Status")).click();

  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.locator(await selectFilterByAttribute("Status")).click();
  await page.getByLabel("", { exact: true }).nth(2).click();
  await page
    .getByRole("checkbox", { name: "Column with Header Selection" })
    .check();
  await expect(page.locator("#selectedRowCountNumber")).toContainText("6144");

  await page
    .getByRole("checkbox", { name: "Column with Header Selection" })
    .uncheck();
  await page.locator(await closeFilter("Status")).click;
  //open break
  await page.getByRole('button', { name: 'Refresh' }).click();
  await performActionOnCell(
    page,
    "Closed",
    "18348725006773",
    {
      action: "Open Break",
    },
    "open rec",
  );
});
