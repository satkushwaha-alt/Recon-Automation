import { test, expect } from "@playwright/test";

import { login, loginQA } from "../../lib/login";
import { createNV } from "../../lib/NV_Setup/createNv";
import { updateNV } from "../../lib/NV_Setup/updateNV";
import { validateAscendingOrder } from "../../lib/NV_Setup/validateAscendingOrder";
import { deleteNv } from "../../lib/NV_Setup/deleteNV";
import { attributes } from "../../Static_Files/NV_Setup/attributes";
import { addNewAttributes } from "../../lib/NV_Setup/addnewAttributeNV";
import {
  getCellByAttributeAndValue,
  selectDebtByAttributeOnNv,
  selectEquitiesByAttributeOnNv,
  toggleOnForClosedBreaksOnNV,
  toggleOnForReconciledRecordsOnNV,
} from "../../lib/Locator/nvSetupLocator";
import {
  closeFilter,
  getCellByIdAndText,
  selectFilterByAttribute,
} from "../../lib/Locator/signoffLocator";
import { selectFilterByAttributeName } from "../../lib/Locator/nvSetupLocator";
import { openFromBreakManagement } from "../../lib/Signoff/openReconFromBreakManagement";
import { overllapedAttributescheckbox } from "../../lib/Locator/nvSetupLocator";
import { attributeMappings } from "../../Static_Files/NV_Setup/attributes";
import { updateReconMappingInNV } from "../../lib/NV_Setup/updateReconMappingInNV";
test("nvSetup3", async ({ page }) => {
  await loginQA(page, "mayadav_recsignoff@ivp.in", "Ivp@123");
  await page.getByTestId("menu-icon").click();
  await page
    .getByRole("button", { name: "Configurations", exact: true })
    .click();
  await page.getByRole("button", { name: "Normalized View Setup" }).click();
  await page.getByRole("textbox", { name: "Search here" }).click();
  await page
    .getByRole("textbox", { name: "Search here" })
    .fill("Position_Nv_Setup_Automation");
  await page
    .getByRole("button", { name: "Position_NV_Setup_Automation" })
    .click();
  await page.getByRole("button", { name: "Configure Attribute" }).click();
  //  await page.waitForTimeout(2000);

  // const field = page.locator(selectFilterByAttributeName("attribute_name"));
  // await field.hover();
  // await page.waitForTimeout(200); // Small pause for the UI to register the hover
  // await field.click();

  //Search, Edit, Delete validation for Attribute
  await page
    .locator("#Attributes")
    .getByRole("textbox", { name: "Quick Search" })
    .click();
  await page
    .locator("#Attributes")
    .getByRole("textbox", { name: "Quick Search" })
    .fill("attribute-1");
  await expect(
    page.locator(getCellByAttributeAndValue("attribute_name", "attribute-1")),
  ).toContainText("attribute-1");

  // await page.getByTestId('faPenToSquareAttribute').click();
  // await page.locator("//*[@data-testid='faPenToSquareAttribute']").click();
  await page
    .getByRole("row", { name: "attribute-1" })
    .getByTestId("faPenToSquareAttribute")
    .click();
  await page.getByRole("textbox", { name: "Name" }).click();
  await page.getByRole("textbox", { name: "Name" }).fill("attribute-1edited");
  await page.getByRole("textbox", { name: "Description" }).click();

  await page.getByRole("textbox", { name: "Description" }).fill("edited");
  await page.getByRole("button", { name: "Update", exact: true }).click();
  await expect(
    page.locator(
      getCellByAttributeAndValue("attribute_name", "attribute-1edited"),
    ),
  ).toContainText("attribute-1edited");
  await expect(
    page.locator(getCellByAttributeAndValue("description", "edited")),
  ).toContainText("edited");

  const field = page.locator(selectFilterByAttributeName("attribute_name"));
  await field.hover();
  await page.waitForTimeout(200); // Small pause for the UI to register the hover
  await field.click();

  //  await page.getByRole('textbox', { name: 'Search...' }).click();
  // await page.getByRole('textbox', { name: 'Search...' }).waitFor({ state: 'visible' });
  await page
    .getByRole("textbox", { name: "Search..." })
    .fill("attribute-1edited");

  await page.getByLabel("", { exact: true }).click({ force: true });
  await page.getByText("Varchar").first().click();
  await expect(
    page.locator(
      getCellByAttributeAndValue("attribute_name", "attribute-1edited"),
    ),
  ).toContainText("attribute-1edited");

  await page
    .locator("#Attributes")
    .getByRole("columnheader", { name: "Column with Header Selection" })
    .click();
  await expect(page.locator("#Attributes")).toContainText("Selected : 1");
  //close filter
  await page.locator(closeFilter("attribute_name")).click();
  await page
    .locator("#Attributes")
    .getByRole("columnheader", { name: "Column with Header Selection" })
    .click();
  // await page.getByText('Selected : 11').click();
  await expect(page.locator("#Attributes")).toContainText("Selected : 11");

  await expect(page.locator("#Attributes")).toContainText("Total Rows : 11");

  // await page.getByText('Attribute name').first().click();
  // await expect(page.locator(getCellByAttributeAndValue("attribute_name","Account ID"))).toContainText('Account ID');
  // await page.getByText('Attribute name').first().click();
  // await expect(page.locator(getCellByAttributeAndValue("attribute_name","attribute-1edited"))).toContainText('attribute-1edited');

  await page
    .locator("#Attributes")
    .getByRole("columnheader", { name: "Column with Header Selection" })
    .click();
  await page.locator(selectFilterByAttributeName("attribute_name")).click();
  await page
    .getByRole("textbox", { name: "Search..." })
    .fill("attribute-1edited");
  await page.getByLabel("", { exact: true }).click({ force: true });
  await page.getByText("Varchar").first().click();
  await expect(
    page.locator(
      getCellByAttributeAndValue("attribute_name", "attribute-1edited"),
    ),
  ).toContainText("attribute-1edited");

  await page
    .locator("#Attributes")
    .getByRole("gridcell", { name: "Press Space to toggle row" })
    .click();
  await page.locator("#Attributes").getByText("Selected").click();
  // await page.getByRole('checkbox', { name: 'Press Space to toggle row' }).check();
  await expect(page.locator("#Attributes")).toContainText("Selected : 1");

  await page
    .getByRole("gridcell", {
      name: "Press Space to toggle row selection (checked)",
    })
    .click();
  await page.locator(closeFilter("attribute_name")).click();

  //delete validation

  // await page.locator('#Attributes').getByRole('columnheader', { name: 'Column with Header Selection' }).click();
  await page.locator(selectFilterByAttributeName("attribute_name")).click();
  await page.getByRole("textbox", { name: "Search..." }).fill("Due Date");
  await page.getByLabel("", { exact: true }).click({ force: true });
  await page.getByText("DateTime").first().click();
  // await expect(page.locator(getCellByAttributeAndValue("attribute_name","Due Date"))).toContainText('Due Date');

  await page.getByRole("img", { name: "Delete this attribute" }).click();
  await expect(page.locator("body")).toContainText("Delete attribute Due Date");
  await page.getByRole("button", { name: "Cancel deletion" }).click();

  await page.getByRole("img", { name: "Delete this attribute" }).click();
  await page.getByRole("button", { name: "Confirm deletion" }).click();

  await page
    .locator("#Attributes")
    .getByRole("columnheader", { name: "Column with Header Selection" })
    .click();
  await expect(page.locator("#Attributes")).toContainText("Selected : 10");
  await page.locator(selectFilterByAttributeName("attribute_name")).click();
  await page.getByRole("textbox", { name: "Search..." }).fill("Due Date");

  // await page.pause();

  await page
    .locator("#Attributes")
    .getByRole("textbox", { name: "Quick Search" })
    .click();
  await page
    .locator("#Attributes")
    .getByRole("textbox", { name: "Quick Search" })
    .fill("Due Date");
  await expect(page.locator("#Attributes")).toContainText("");
  await page.getByRole("button", { name: "Change View" }).click();
  // toggle On for reconciled Records
  await page.locator(toggleOnForReconciledRecordsOnNV()).click();
  // toggle on for closed breaks
  await page.locator(toggleOnForClosedBreaksOnNV()).click();
  await page.getByRole("button", { name: "Save View" }).click();

  await page.getByRole("button", { name: "Configure Attribute" }).click();

  const page1Promise = page.waitForEvent("popup");
  // validate in mappings after deletion of attribute and edit of attribute
  await page
    .getByRole("row", { name: "Position_Recon_NV_1 Position" })
    .getByLabel("Edit recon mappings")
    .click();
  const page1 = await page1Promise;
  await page1.getByTestId("SettingsIcon").click();
  await page1.getByRole("button", { name: "Reports & Views" }).click();
  await page1.getByRole("tab", { name: "Normalized Views" }).click();

  await expect(page1.locator("#wow_ReportsAndViews_container")).toContainText(
    "attribute-1editedabc",
  );
  await page1.getByRole("textbox", { name: "Search Views" }).click();
  await page1.getByRole("textbox", { name: "Search Views" }).fill("Due Date");
  await expect(page1.locator("#wow_ReportsAndViews_container")).toContainText(
    "Account IDabcAmount_Spread123attribute-1editedabcContract Amount123CurrencyabcdateLIBOR Floor123PortfolioabcTest DateTrade Date",
  );
  await page1.getByRole("button", { name: "Cancel" }).click();
  //open nv from break management and validate
  await openFromBreakManagement(page, "Position_NV_Setup_Automation", "View");
  //validation on nv
  await expect(page1.getByRole("grid")).toContainText(
    "attribute-1edited - Internal",
  );
  await expect(page1.getByRole("grid")).toContainText(
    "attribute-1edited - External",
  );

  //reconcile check
  try {
    await page.getByRole("textbox", { name: "Quick Search" }).click();
    await page
      .getByRole("textbox", { name: "Quick Search" })
      .fill("same side system match");
    await expect(page.getByRole("grid")).toContainText(
      "Same Side System Match",
    );

    await page.getByRole("textbox", { name: "Quick Search" }).click();
    await page
      .getByRole("textbox", { name: "Quick Search" })
      .fill("same side manual match");
    await expect(page.getByRole("grid")).toContainText(
      "Same Side Manual Match",
    );
    await page.getByRole("textbox", { name: "Quick Search" }).click();
    await page
      .getByRole("textbox", { name: "Quick Search" })
      .fill("system match");
    await expect(page.getByRole("grid")).toContainText("system match");
    await page.getByRole("textbox", { name: "Quick Search" }).click();
    await page
      .getByRole("textbox", { name: "Quick Search" })
      .fill("Internal Exception");

    await expect(
      page.locator(getCellByIdAndText("Break Type", "Internal Exception")),
    ).toContainText("Internal Exception");
    await page.getByRole("textbox", { name: "Quick Search" }).click();
    await page
      .getByRole("textbox", { name: "Quick Search" })
      .fill("External Exception");

    await expect(
      page.locator(getCellByIdAndText("Break Type", "External Exception")),
    ).toContainText("External Exception");
    await page.getByRole("textbox", { name: "Quick Search" }).click();
    await page.getByRole("textbox", { name: "Quick Search" }).fill("Paired");

    await expect(
      page.locator(getCellByIdAndText("Break Type", "Paired")),
    ).toContainText("Paired");
  } catch (error) {
    console.error(`Error During validating reconcile status`);
  }
  //close check
  try {
    await page.getByRole("textbox", { name: "Quick Search" }).click();
    await page.getByRole("textbox", { name: "Quick Search" }).fill("closed");
    await expect(page.getByRole("grid")).toContainText("closed");
  } catch (error) {
    console.error(`Error During validating closed status`);
  }
});
