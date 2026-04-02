import { test, expect } from "@playwright/test";
import { login } from "../../lib/login";

test("signoff1", async ({ page }) => {
  await login(page,"mayadav_reconsignoff@ivp.in", "Ivp@123");

  //open recon
  await page.getByRole("textbox", { name: "Search Text here..." }).click();
  await page
    .getByRole("textbox", { name: "Search Text here..." })
    .fill("Copy of Break_Management_Position - Single Approver");
  // await page.getByText('Copy of Break_Management_Position').click();
  await page.locator("#btnExpand_1992").click();
  await page
    .getByRole("textbox", { name: "Click to view Break Details" })
    .first()
    .click();
  //validate

  await expect(page.locator("#ReconNameDiv")).toContainText(
    "Copy of Break_Management_Position - Single Approver",
  );
  await expect(page.locator("#statusBarCount")).toContainText("9.6%");
  await expect(page.locator("#SignOffStatesButtons")).toContainText("Sign off");
  // await page.pause();

  // await expect(page.getByLabel('BreakManagement -Signoff')).toContainText('Copy of Break_Management_Position - Single Approver');
  await expect(page.locator("#ReconNameDiv")).toContainText(
    "Copy of Break_Management_Position - Single Approver",
  );
  await page.getByRole("button", { name: "Copy of" }).click();

  await expect(page.locator("#RS_FirstRow")).toContainText(
    "Sign off Status : Sign Off Not Intiated",
  );
  await expect(page.locator("#RS_FirstRow")).toContainText("Sign Off");
  await page.getByTestId("runSatusClose").click();
  //validation details after click on Signoff button

  await page.getByRole("button", { name: "Sign off" }).click();
  // await page.pause();
  await expect(page.locator("#signOffMatch")).toContainText(
    "Match(%)By Record Count9.6%",
  );
  await expect(page.locator("#signOffOpenBreaksText")).toContainText(
    "Open Breaks",
  );
  await expect(page.locator("#signOffClosedMatchText")).toContainText(
    "Closed | Match (Manual)",
  );
  await expect(page.locator("#signOffActionBreaksText")).toContainText(
    "Uncommented Breaks | Unassigned Break Status Count",
  );
  await expect(page.locator("#signOffCancelButton")).toContainText("Cancel");
  await expect(page.locator("#signOffApproveButton")).toContainText("Sign off");
  await page.getByRole("button", { name: "Cancel" }).click();
  // click on cell and validate options before signoff
  await page
    .locator(
      ".ag-row-even.ag-row-no-focus > div:nth-child(4) > .ag-cell-wrapper",
    )
    .first()
    .click();
  await page
    .locator(
      ".ag-row-even.ag-row-no-focus > div:nth-child(4) > .ag-cell-wrapper",
    )
    .first()
    .click({
      button: "right",
    });
  await expect(page.getByRole("menu")).toContainText(
    "MatchUpdate RemarksClose BreakWorkflow Actions Insert MappingMove to AssetAttachment CommunicateTrace RecordAudit TrailPostSearch",
  );
  //validation after signoff
  await page.getByRole("button", { name: "Sign off" }).click();

  // signoff background color validation
  const signoff = page
    .locator("#signOffApproveButton")
    .getByRole("button", { name: "Sign off" });
  const signoffbgColor = await signoff.evaluate(
    (el) => window.getComputedStyle(el).backgroundColor,
  );
  console.log(`sign off bg color ${signoffbgColor}`);

  expect(signoffbgColor).toBe("rgb(219, 134, 57)");
  //signoff
  await page
    .locator("#signOffApproveButton")
    .getByRole("button", { name: "Sign off" })
    .click();
  await expect(page.locator("#rejectSignOff")).toContainText("Reject Sign off");

  //reject signoff color
  const rejectsignoff = page
    .locator("#rejectsignoff")
    .getByRole("button", { name: "Sign off" });
  const rejectsignoffbgColor = await rejectsignoff.evaluate(
    (el) => window.getComputedStyle(el).backgroundColor,
  );
  console.log(` reject sign off bg color ${rejectsignoffbgColor}`);
  expect(rejectsignoffbgColor).toBe("rgb(219, 134, 57)");

  await expect(page.locator("#approveSignOff")).toContainText(
    "Approve Sign off",
  );

  //approve signoff color
  const approvesignoff = page
    .locator("#approvesignoff")
    .getByRole("button", { name: "Sign off" });
  const approvesignoffbgColor = await approvesignoff.evaluate(
    (el) => window.getComputedStyle(el).backgroundColor,
  );
  console.log(` approve sign off bg color ${approvesignoffbgColor}`);
  expect(approvesignoffbgColor).toBe("rgb(219, 134, 57)");

  await expect(page.locator("#approveSignOff")).toContainText(
    "Approve Sign off",
  );
  await page.getByRole("button", { name: "Copy of" }).click();
  await expect(page.locator("#RS_FirstRow")).toContainText("Sign off Status :");
  await expect(page.locator("#RS_FirstRow")).toContainText(
    "Pending At Approver",
  );
  await expect(page.locator("#RS_FirstRow")).toContainText("Reject");
  await expect(page.locator("#RS_FirstRow")).toContainText("Approve");

  await page.getByTestId("runSatusClose").click();
  // click on cell and validate options after signoff

  await page
    .locator(
      ".ag-row-even.ag-row-no-focus.ag-row.ag-row-level-0.ag-row-position-absolute.ag-row-hover > div:nth-child(4) > .ag-cell-wrapper",
    )
    .click({
      button: "right",
    });
  await expect(page.getByLabel("Context Menu").getByRole("menu")).toContainText(
    "Attachment",
  );
  await expect(page.getByRole("menu")).toContainText("Trace Record");
  await expect(page.getByRole("menu")).toContainText("Audit Trail");
  await expect(page.getByLabel("Context Menu").getByRole("menu")).toContainText(
    "Post",
  );
  await expect(page.getByRole("menu")).toContainText("Search");
  //Approve Signoff
  await page.getByRole("button", { name: "Approve Sign off" }).click();
  //Signoff convert into revoke
  await expect(page.locator("#revokeIcon")).toContainText("Revoke");
  await page.getByRole("button", { name: "Copy of" }).click();
  await page.getByText("Sign off Status :").click();
  await expect(page.locator("#RS_FirstRow")).toContainText("Sign off Status :");
  await expect(page.locator("#RS_FirstRow")).toContainText("Signed Off");
  await expect(page.locator("#RS_FirstRow")).toContainText("Revoke Sign Off");
  await page.getByTestId("runSatusClose").click();
  // validate options after revoke
  await page.getByRole("button", { name: "Revoke" }).click();
  await expect(page.locator("#signOffMatch")).toContainText(
    "Match(%)By Record Count9.6%",
  );
  await expect(page.locator("#signOffOpenBreaksText")).toContainText(
    "Open Breaks",
  );
  await expect(page.locator("#signOffClosedMatchText")).toContainText(
    "Closed | Match (Manual)",
  );
  await expect(page.locator("#SignOffStatsDiv")).toContainText(
    "Uncommented Breaks | Unassigned Break Status Count",
  );
  await expect(page.locator("#signOffCancelButton")).toContainText("Cancel");
  await expect(page.locator("#signOffApproveButton")).toContainText("Revoke");
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.getByRole("button", { name: "Revoke" }).click();
  //Revoke
  await page
    .locator("#signOffApproveButton")
    .getByRole("button", { name: "Revoke" })
    .click();
  await expect(page.locator("#approveRevoke")).toContainText("Approve Revoke");
  await expect(page.locator("#rejectRevoke")).toContainText("Reject Revoke");
  await page.getByRole("button", { name: "Copy of" }).click();
  await expect(page.locator("#RS_FirstRow")).toContainText("Sign off Status :");
  await expect(page.locator("#RS_FirstRow")).toContainText(
    "Revoke Sign off Pending",
  );
  await expect(page.locator("#RS_FirstRow")).toContainText("Reject");
  await expect(page.locator("#RS_FirstRow")).toContainText("Approve");
  await page.getByTestId("runSatusClose").click();
  //Reject Revoke
  await page.getByRole("button", { name: "Reject Revoke" }).click();

  await page
    .locator(
      ".ag-row-even.ag-row-no-focus > div:nth-child(4) > .ag-cell-wrapper",
    )
    .first()
    .click({
      button: "right",
    });

  await expect(page.getByLabel("Context Menu").getByRole("menu")).toContainText(
    "Attachment",
  );
  await expect(page.getByRole("menu")).toContainText("Trace Record");
  await expect(page.getByRole("menu")).toContainText("Audit Trail");
  await expect(page.getByLabel("Context Menu").getByRole("menu")).toContainText(
    "Post",
  );
  await expect(page.getByRole("menu")).toContainText("Search");
  await page.getByRole("button", { name: "Revoke" }).click();
  await page
    .locator("#signOffApproveButton")
    .getByRole("button", { name: "Revoke" })
    .click();
  await page.getByRole("button", { name: "Approve Revoke" }).click();
  // Revoke change into Signoff
  await expect(page.locator("#SignOffStatesButtons")).toContainText("Sign off");
  await page.getByRole("button", { name: "Copy of" }).click();
  await expect(page.locator("#RS_FirstRow")).toContainText("Sign off Status :");
  await expect(page.locator("#RS_FirstRow")).toContainText(
    "Sign Off Not Intiated",
  );
  await expect(page.locator("#RS_FirstRow")).toContainText("Sign Off");
  await page.getByTestId("runSatusClose").click();
});
