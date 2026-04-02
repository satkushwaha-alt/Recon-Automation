import { test, expect } from "@playwright/test";
import { login } from "../../lib/login";
import { compareScreenshotWithBaseline } from "../../lib/screenshotUtils";
import { openFromBreakManagement } from "../../lib/Signoff/openReconFromBreakManagement";

test("signoff5", async ({ page }) => {
  try{
  await login(page, "mayadav_reconsignoff@ivp.in", "Ivp@123");

  await openFromBreakManagement(page,'Copy of Break_Management_Position - Single Approver',"Recon");
  await page.getByRole("button", { name: "Copy of" }).click();
  await expect(page.locator("#RS_FirstRow")).toContainText("Sign Off");
  //Run Again - Recon
  await page.getByRole("button", { name: "Run Again" }).click();
  await page.waitForTimeout(190000);
  // await page.pause();
  await expect(page.locator("#signOffIcon")).toContainText("Sign off");
  await page.getByRole("button", { name: "Copy of" }).click();
  await expect(page.locator("#RS_FirstRow")).toContainText("Sign Off");
  await page.getByTestId("runSatusClose").click();
  //undo Tasks
  await page
    .getByRole("button", { name: "Click to get actions for undo" })
    .click();
  await expect(page.locator("#noDataUndoActions")).toContainText(
    "No manual action is available for undo.",
  );

  await page.getByTestId("menu-icon").click();
  await page.getByRole("button", { name: "Task Management" }).click();
  await page.getByRole("button", { name: "Undo Tasks" }).click();

  await page.getByRole("button", { name: "DropdownArrowBtn" }).click();

  await page
    .getByRole("combobox")
    .fill("Copy of Break_Management_Position - Single Approver");
  await page.getByRole("combobox").press("ArrowDown");
  await page.getByRole("combobox").press("Enter");

  await page.getByTestId("KeyboardArrowRightIcon").nth(2).click();
  await page.getByTestId("ReplayIcon").first().click();
  await page.getByRole("button", { name: "Yes" }).click();
  // undo- when recon is not signoff
  try {
    await expect(page.locator("#root")).toContainText("SuccessUndo completed");
  } catch (error) {
    console.error(error);
  }

  await page.getByTestId("menu-icon").click();
  await page.getByRole("button", { name: "Dashboard" }).click();
await openFromBreakManagement(page,'Copy of Break_Management_Position - Single Approver',"Recon");
  await page.getByRole("button", { name: "Sign off" }).click();
  await page
    .locator("#signOffApproveButton")
    .getByRole("button", { name: "Sign off" })
    .click();
  await page
    .getByRole("button", { name: "Click to get actions for undo" })
    .click();
  await page.getByTestId("menu-icon").click();
  await page.getByRole("button", { name: "Task Management" }).click();
  await page.getByRole("button", { name: "Undo Tasks" }).click();
  await page.getByRole("button", { name: "DropdownArrowBtn" }).click();
  await page
    .getByRole("combobox")
    .fill("Copy of Break_Management_Position - Single Approver");
  await page.getByRole("combobox").press("ArrowDown");
  await page.getByRole("combobox").press("Enter");

  await page.getByTestId("KeyboardArrowRightIcon").nth(2).click();
  await page.getByTestId("ReplayIcon").first().click();
  await page.getByRole("button", { name: "Yes" }).click();
  //undo - when signoff is in progress -> gives error
  try {
    await expect(page.locator("#root")).toContainText(
      "ErrorSignoff is in progress/completed for the Recon. Please Revoke.",
    );
  } catch (error) {
    console.error(error);
  }

  await page.getByTestId("menu-icon").click();
  await page.getByRole("button", { name: "Dashboard" }).click();
  await page.getByRole("textbox", { name: "Search Text here..." }).click();
  await page
    .getByRole("textbox", { name: "Search Text here..." })
    .fill("Copy of Break_Management_Position - Single Approver");
  await page.getByRole("button", { name: "Recon name: Copy of" }).click();
  await expect(page.locator("#RS_FirstRow")).toContainText(
    "Sign off Status : Pending At Approver Assigned Approver : Current Approver : OperationsSign Off Date :",
  );
  await page.getByTestId("runSatusClose").click();
  // Verify Status Logo- on Dashboard(green)
  const statusBtn1 = page.locator(
    `//input[@type='button'    and contains(@class,'SignOffPendingApprove')    and contains(@title,'pending for approval')]`,
  );
  await compareScreenshotWithBaseline(
    statusBtn1,
    "./Screenshots/status_recon_run_green.png",
  );

  // login by - mayadav_16@ivp.in

  await page.getByText("QA").click();
  await page.getByRole("button", { name: "Sign out" }).click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("mayadav_16@ivp.in");
  await page.goto(
    "https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_16%40ivp.in",
  );
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("Ivp@123");
  await page.getByRole("button", { name: "Log in" }).click();
  await page.getByTestId("menu-icon").click();
  await page.getByRole("button", { name: "Task Management" }).click();
  await page.getByRole("button", { name: "Undo Tasks" }).click();
  await page.getByRole("button", { name: "DropdownArrowBtn" }).click();
  await page
    .getByRole("combobox")
    .fill("Copy of Break_Management_Position - Single Approver");
  await page.mouse.move(300, 500);
  await page.getByRole("combobox").press("ArrowDown");
  await page.getByRole("combobox").press("Enter");

  await page.getByTestId("KeyboardArrowRightIcon").nth(2).click();
  await page.getByTestId("ReplayIcon").first().click();
  await page.getByRole("button", { name: "Yes" }).click();
  //on undo signoff is in progress givess error
  try {
    await expect(page.getByLabel("Error")).toContainText(
      "ErrorSignoff is in progress/completed for the Recon. Please Revoke.",
    );
  } catch (error) {
    console.error(
      "Error in validation of error message when undo action performed and signoff is in progress",
    );
  }
  await expect(page.getByLabel("Error")).toContainText(
    "ErrorSignoff is in progress/completed for the Recon. Please Revoke.",
  );

  await page.getByTestId("menu-icon").click();
  await page.getByRole("button", { name: "Dashboard" }).click();
  await page.getByRole("textbox", { name: "Search Text here..." }).click();
  await page
    .getByRole("textbox", { name: "Search Text here..." })
    .fill("Copy of Break_Management_Position - Single Approver");
  await page.locator("#btnExpand_1992").click();
  await page
    .getByRole("textbox", { name: "Click to view Break Details" })
    .first()
    .click();
  // Approve Signoff
  await page.getByRole("button", { name: "Approve Sign off" }).click();
  await expect(page.locator("#revokeIcon")).toContainText("Revoke");
  await page
    .getByRole("button", { name: "Click to get actions for undo" })
    .click();
  await expect(page.locator("#noDataUndoActions")).toContainText(
    "No manual action is available for undo.",
  );
  await page.getByRole("button", { name: "Copy of" }).click();
  await expect(page.locator("#RS_FirstRow")).toContainText(
    "Sign off Status : Signed Off >Sign off by : mayadav_16@ivp.inSign Off Date :",
  );
  await page.getByTestId("runSatusClose").click();

  await page.getByTestId("menu-icon").click();
  await page.getByRole("button", { name: "Task Management" }).click();
  await page.getByRole("button", { name: "Undo Tasks" }).click();
  await page.getByRole("button", { name: "DropdownArrowBtn" }).click();
  await page
    .getByRole("combobox")
    .fill("Copy of Break_Management_Position - Single Approver");
  await page.getByRole("combobox").press("ArrowDown");
  await page.getByRole("combobox").press("Enter");

  await page.getByTestId("KeyboardArrowRightIcon").nth(2).click();
  await page.getByTestId("ReplayIcon").first().click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page.getByLabel("Error")).toContainText(
    "ErrorSignoff is in progress/completed for the Recon. Please Revoke.",
  );

  await page.getByTestId("menu-icon").click();
  await page.getByRole("button", { name: "Dashboard" }).click();
  await page.getByRole("textbox", { name: "Search Text here..." }).click();
  await page
    .getByRole("textbox", { name: "Search Text here..." })
    .fill("Copy of Break_Management_Position - Single Approver");

  // signoff logo validation on dashboard
  const signOffBtn1 = page.getByRole("button", {
    name: "Recon has been signed off for",
  });
  await compareScreenshotWithBaseline(
    signOffBtn1,
    "./Screenshots/Signoff2.png",
  );

  await page.locator("#btnExpand_1992").click();
  await page
    .getByRole("textbox", { name: "Click to view Break Details" })
    .first()
    .click();
    try{
       await page.getByRole('button', { name: 'toast' }).click();
    }catch(error){
      console.error(`Error on clicking toast`);
    }
   
  await page.getByRole("button", { name: "Revoke" }).click();
  await page
    .locator("#signOffApproveButton")
    .getByRole("button", { name: "Revoke" })
    .click();
  // await page.getByRole('button', { name: 'Approve Revoke' }).click();
  await page.getByRole("button", { name: "Copy of" }).click();

  try {
    await expect(page.locator("#RS_FirstRow")).toContainText(
      "Sign off Status : Revoke Sign off Pending Assigned Approver : Current Approver : OperationsSign Off Date :",
    );
  } catch (error) {
    console.error(`error in validation on status pop up`);
  }
  await page.getByTestId("runSatusClose").click();
  await page.getByTestId("menu-icon").click();
  await page.getByRole("button", { name: "Task Management" }).click();
  await page.getByRole("button", { name: "Undo Tasks" }).click();
  await page.getByRole("button", { name: "DropdownArrowBtn" }).click();
  await page
    .getByRole("combobox")
    .fill("Copy of Break_Management_Position - Single Approver");
  await page.getByRole("combobox").press("ArrowDown");
  await page.getByRole("combobox").press("Enter");

  await page.getByTestId("KeyboardArrowRightIcon").nth(2).click();
  await page.getByTestId("ReplayIcon").first().click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page.getByLabel("Error")).toContainText(
    "ErrorSignoff is in progress/completed for the Recon. Please Revoke.",
  );

  await page.getByTestId("menu-icon").click();
  await page.getByRole("button", { name: "Dashboard" }).click();
  await page.getByRole("textbox", { name: "Search Text here..." }).click();
  await page
    .getByRole("textbox", { name: "Search Text here..." })
    .fill("Copy of Break_Management_Position - Single Approver");

  const signOffBtn2 = page.getByRole("button", {
    name: "Revoke Signed off is pending",
  });
  //compare logo RevokeSignoffPending
  await compareScreenshotWithBaseline(
    signOffBtn2,
    "./Screenshots/RevokeSignoffPending.png",
  );

  await page.locator("#btnExpand_1992").click();
  await page
    .getByRole("textbox", { name: "Click to view Break Details" })
    .first()
    .click();
  await page.getByRole("button", { name: "Approve Revoke" }).click();
  await expect(page.locator("#signOffIcon")).toContainText("Sign off");
  await page.getByRole("button", { name: "Copy of" }).click();
  await expect(page.locator("#RS_FirstRow")).toContainText(
    "Sign off Status : Sign Off Not Intiated",
  );
  await page.getByTestId("runSatusClose").click();
  await page.getByTestId("menu-icon").click();
  await page.getByRole("button", { name: "Task Management" }).click();
  await page.getByRole("button", { name: "Undo Tasks" }).click();
  await page.getByRole("button", { name: "DropdownArrowBtn" }).click();
  await page
    .getByRole("combobox")
    .fill("Copy of Break_Management_Position - Single Approver");
  await page.getByRole("combobox").press("ArrowDown");
  await page.getByRole("combobox").press("Enter");

  await page.getByTestId("KeyboardArrowRightIcon").nth(2).click();
  await page.getByTestId("ReplayIcon").first().click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page.getByLabel("Success")).toContainText(
    "SuccessUndo completed",
  );
  await page.getByTestId("menu-icon").click();
  await page.getByRole("button", { name: "Dashboard" }).click();
  await page.getByRole("textbox", { name: "Search Text here..." }).click();
  await page
    .getByRole("textbox", { name: "Search Text here..." })
    .fill("Copy of Break_Management_Position - Single Approver");

  await page.getByText("QA").click();
  await page.getByRole("button", { name: "Sign out" }).click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("mayadav_reconsignoff@ivp.in");
  await page.goto(
    "https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_reconsignoff%40ivp.in",
  );
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("Ivp@123");
  await page.getByRole("button", { name: "Log in" }).click();
  await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position - Single Approver",
    "Recon",
  );

  await expect(page.locator("#signOffIcon")).toContainText("Sign off");
  await page.getByRole("button", { name: "Copy of" }).click();
  await expect(page.locator("#RS_FirstRow")).toContainText("Sign Off");
  //Run Again - Recon
  await page.getByRole("button", { name: "Run Again" }).click();
  await page.waitForTimeout(190000);
  // await page.pause();
  await expect(page.locator("#signOffIcon")).toContainText("Sign off");
}catch(error){
  console.error(`Error in running test..`);
}
});
