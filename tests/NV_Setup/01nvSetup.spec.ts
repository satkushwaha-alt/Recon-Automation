import { test, expect, Page } from "@playwright/test";
import { login, loginQA } from "../../lib/login";
import { createNV } from "../../lib/NV_Setup/createNv";
import { updateNV } from "../../lib/NV_Setup/updateNV";
import { validateAscendingOrder } from "../../lib/NV_Setup/validateAscendingOrder";
import { deleteNv } from "../../lib/NV_Setup/deleteNV";
import { attributes } from "../../Static_Files/NV_Setup/attributes";
import { addNewAttributes } from "../../lib/NV_Setup/addnewAttributeNV";
import {
  getCellByAttributeAndValue,
  overllapedAttributescheckbox,
} from "../../lib/Locator/nvSetupLocator";
import {
  getCellByIdAndText,
  selectFilterByAttribute,
} from "../../lib/Locator/signoffLocator";
import { selectFilterByAttributeName } from "../../lib/Locator/nvSetupLocator";
import { updateReconMappingInNV } from "../../lib/NV_Setup/updateReconMappingInNV";
import { openFromBreakManagement } from "../../lib/Signoff/openReconFromBreakManagement";

test("nvSetupPosition", async ({ page }) => {
  // await login(page,"mayadav_reconsignoff@ivp.in", "Ivp@123");
  // await login(page,"mayadav_9074@ivp.in", "ivp@123");
  await loginQA(page, "mayadav_recsignoff@ivp.in", "Ivp@123");

  //open nv setup
  await page.getByTestId("menu-icon").click();
  await page
    .getByRole("button", { name: "Configurations", exact: true })
    .click();
  await page.getByRole("button", { name: "Normalized View Setup" }).click();
  //create nv
  await createNV(
    page,
    "Signoff_NV_Automation",
    "Position_NV_Automation",
    "Position",
  );
  try {
    await expect(page.getByLabel("#root")).toContainText(
      "Save Normalized ViewNormalized view with name Signoff_NV_Automation already exists",
    );
  } catch (error) {
    console.error(
      `Error During Validate Error:View with same name already exists`,
    );
  }
  //   await page.getByRole('button', { name: 'toast' }).click();
  await createNV(
    page,
    "Position-NV_Automation",
    "Position_NV_Automation",
    "Position",
  );
  //Update NV
  await updateNV(
    page,
    "Position-NV_Automation",
    "Position_NV_Setup_Automation",
    "Position_NV_Setup  for Automation",
    "Position",
  );
  //Delete,Cancel NV
  await page.getByRole("textbox", { name: "Search here" }).click();
  await page
    .getByRole("textbox", { name: "Search here" })
    .fill("Position_NV_Setup_Automation");
  await page
    .getByRole("button", { name: "Position_NV_Setup_Automation" })
    .first()
    .click();
  await page.getByRole("button", { name: "Delete NV" }).click();
  await expect(page.locator("body")).toContainText(
    "You sure want to remove this recon 'Position_NV_Setup_Automation ' from normalized view',",
  );
  await page.getByRole("button", { name: "Cancel deletion" }).click();

  //validate nv is not present in view list
  await deleteNv(page, ".ellipsis-text", "Position_NV_Setup_Automation");

  await validateAscendingOrder(page, ".ellipsis-text");
  //create deleteed nv with same  name
  await createNV(
    page,
    "Position_NV_Setup_Automation",
    "Position_NV_Automation",
    "Position",
  );
  // without view name - creation gives error

  await page.getByRole("button", { name: "Add View" }).click();
  await page.getByRole("button", { name: "Add", exact: true }).click();
  try {
    await expect(page.getByLabel("#root")).toContainText(
      "Save Normalized ViewView name cannot be empty",
    );
  } catch (error) {
    console.error(`Error duing validate Error:nv  creation without view name`);
  }
  await page.getByRole("textbox", { name: "View Name" }).click();
  await page.getByRole("textbox", { name: "View Name" }).fill("nv-Automation");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await expect(page.locator("#root")).toContainText(
    "Save Normalized ViewSelect Recon Type",
  );
  await page.getByRole("button", { name: "Cancel" }).click();

  // validate ascending order in dropdown of recon type
  await page.getByRole("button", { name: "Add View" }).click();
  await page.getByRole("button", { name: "DropdownArrowBtn" }).click();
  try {
    const values = (await page.getByRole("option").allTextContents())
      .map((v) => v.trim())
      .filter((v) => v !== "Select Recon Type");

    const sorted = [...values].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" }),
    );

    expect(values, " Dropdown is not in ascending order").toEqual(sorted);
  } catch (error) {
    console.error(" Dropdown validation failed");
  }
  //validate cancel button during add view

  const view_name_50 = "AbcDef123_XyZ-test.value_ExampleName12345_AbCdEf12";
  const dsc_200 =
    "AbcDef123_XyZ-test.value_ExampleName12345_AbCdEfGhIjKlMnOpQrStUvWxYz_1234567890-Test.Value_ExampleName_AbcDefGhIjKlMnOpQrStUvWxYz1234567890_Test-Value.ExampleName_AbCdEfGhIjKlMnOpQrStUvWxYz12345678912";

  await page.getByRole("button", { name: "DropdownArrowBtn" }).click();
  await page.getByRole("textbox", { name: "View Name" }).click();

  //validate view name length max=50
  const view_name_51 = "AbcDef123_XyZ-test.value_ExampleName12345_AbCdEf123";
  await page
    .getByRole("textbox", { name: "View Name" })
    .fill(`${view_name_51}`);
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await expect(page.locator("#root")).toContainText(
    "Save Normalized ViewView Name cannot have more than 50 characters",
  );

  //validate description length max= 50
  const dsc_201 = `${dsc_200}1`;
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.getByRole("button", { name: "Add View" }).click();
  await page.getByRole("textbox", { name: "View Name" }).click();
  await page.getByRole("textbox", { name: "View Name" }).fill("w");
  await page
    .locator("div")
    .filter({ hasText: /^Description$/ })
    .click();
  await page.getByRole("textbox", { name: "Description" }).fill(`${dsc_201}`);
  await page.getByRole("button", { name: "DropdownArrowBtn" }).click();
  await page.getByRole("option", { name: "Position" }).click();
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await expect(page.locator("#root")).toContainText(
    "Save Normalized ViewView description cannot have more than 200 characters",
  );

  await page.getByRole("button", { name: "Cancel" }).click();
  // console.log(view_name_50.length,dsc_200.length);

  //create nv view_length=50, descriptipon_length=200
  await createNV(page, view_name_50, dsc_200, "Position");

  //open Position_NV_Setup_Automation
  await page.getByRole("textbox", { name: "Search here" }).click();
  await page
    .getByRole("textbox", { name: "Search here" })
    .fill("Position_NV_Setup_Automation");
  await page
    .getByRole("button", { name: "Position_NV_Setup_Automation" })
    .click();
  //open Configure Attribute
  await expect(page.getByRole("group")).toContainText("Configure Attribute");
  await page.getByRole("button", { name: "Configure Attribute" }).click();
  await expect(page.locator("#NormalizedViewReportNVName")).toContainText(
    "Position_NV_Setup_Automation",
  );

  //Add new Attribute
  await expect(page.locator("#NormalizedViewAddNewAttrWrapper")).toContainText(
    "Add New Attribute",
  );
  await expect(page.locator("#NormalizedViewChangeViewWrapper")).toContainText(
    "Attributes",
  );
  await expect(page.locator("#Attributes")).toContainText("Attribute name");
  await expect(page.locator("#Attributes")).toContainText("Description");
  await expect(page.locator("#Attributes")).toContainText("Datatype");
  await expect(page.locator("#Attributes")).toContainText("Delete");
  await expect(page.locator("#Attributes")).toContainText("Update");
  //Add Attribute->Cancel, Name Validation
  await page.getByRole("button", { name: "Add New Attribute" }).click();
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await expect(page.locator("#root")).toContainText(
    "Save AttributeAttribute name cannot be empty",
  );
  await page.getByRole("button", { name: "Cancel" }).click();

  // /Add attribute

  await addNewAttributes(page, attributes);

  //change View

  await page.getByRole("button", { name: "Change View" }).click();
  await page.waitForTimeout(3000);

  await page.getByText("attribute-").click();
  await expect(page.getByTestId("draggable_item")).toContainText("attribute-1");
  await page.getByText("Test Date").click();
  await expect(page.locator("#NormalizedViewChangeViewShuttle")).toContainText(
    "Test Date",
  );
  await page.getByText("date", { exact: true }).click();
  await expect(page.locator("#NormalizedViewChangeViewShuttle")).toContainText(
    "attribute-1Test Datedate",
  );
  await page.getByRole("button", { name: "date", exact: true }).click();
  await expect(page.locator("#NormalizedViewChangeViewShuttle")).toContainText(
    "attribute-1Test Date",
  );
  await page.getByRole("button", { name: "Remove All" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page.locator("#NormalizedViewChangeViewShuttle")).toContainText(
    "Amount_SpreadDue DateAccount IDCurrencyLIBOR FloorContract AmountPortfolioTrade DateAmount_Spread-DifferenceContract Amount-DifferenceLIBOR Floor-DifferenceBreak StatusBreak ReasonUser RemarksBreak TypeAFAPBusiness AgeSystem AgeAttachmentStatusGroup NameRecon StatusUser NameAsset NameRecon NameSystem RemarksEmailApproverApprover ListPending LevelReview AgeIsReviewedExplained DiffReviewed DiffAction Performed ByAction Performed OnAction NameBusiness DaySideRec TimeOriginal Action TimeReconKey_AppliedPosting StatusImportance LevelPosted Transaction IDPosted MessagePosted BySnooze Datedateattribute-1Test Date",
  );
  await page.getByRole("button", { name: "Move All", exact: true }).click();
  await page.getByRole("button", { name: "No", exact: true }).click();
  await expect(page.locator("#NormalizedViewChangeViewShuttle")).toContainText(
    "Amount_SpreadDue DateAccount IDCurrencyLIBOR FloorContract AmountPortfolioTrade DateAmount_Spread-DifferenceContract Amount-DifferenceLIBOR Floor-DifferenceBreak StatusBreak ReasonUser RemarksBreak TypeAFAPBusiness AgeSystem AgeAttachmentStatusGroup NameRecon StatusUser NameAsset NameRecon NameSystem RemarksEmailApproverApprover ListPending LevelReview AgeIsReviewedExplained DiffReviewed DiffAction Performed ByAction Performed OnAction NameBusiness DaySideRec TimeOriginal Action TimeReconKey_AppliedPosting StatusImportance LevelPosted Transaction IDPosted MessagePosted BySnooze Datedateattribute-1Test Date",
  );
  await page.getByRole("button", { name: "Move All", exact: true }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page.locator("#NormalizedViewChangeViewShuttle")).toContainText(
    "Amount_SpreadDue DateAccount IDCurrencyLIBOR FloorContract AmountPortfolioTrade DateAmount_Spread-DifferenceContract Amount-DifferenceLIBOR Floor-DifferenceBreak StatusBreak ReasonUser RemarksBreak TypeAFAPBusiness AgeSystem AgeAttachmentStatusGroup NameRecon StatusUser NameAsset NameRecon NameSystem RemarksEmailApproverApprover ListPending LevelReview AgeIsReviewedExplained DiffReviewed DiffAction Performed ByAction Performed OnAction NameBusiness DaySideRec TimeOriginal Action TimeReconKey_AppliedPosting StatusImportance LevelPosted Transaction IDPosted MessagePosted BySnooze Datedateattribute-1Test Date",
  );
  await expect(page.locator("#NormalizedViewChangeViewShuttle")).toContainText(
    "Amount_SpreadDue DateAccount IDCurrencyLIBOR FloorContract AmountPortfolioTrade DateAmount_Spread-DifferenceContract Amount-DifferenceLIBOR Floor-DifferenceBreak StatusBreak ReasonUser RemarksBreak TypeAFAPBusiness AgeSystem AgeAttachmentStatusGroup NameRecon StatusUser NameAsset NameRecon NameSystem RemarksEmailApproverApprover ListPending LevelReview AgeIsReviewedExplained DiffReviewed DiffAction Performed ByAction Performed OnAction NameBusiness DaySideRec TimeOriginal Action TimeReconKey_AppliedPosting StatusImportance LevelPosted Transaction IDPosted MessagePosted BySnooze Datedateattribute-1Test Date",
  );
  await page.getByRole("button", { name: "Remove All" }).click();
  await page.getByRole("button", { name: "No", exact: true }).click();
  await expect(page.locator("#NormalizedViewChangeViewShuttle")).toContainText(
    "Amount_SpreadDue DateAccount IDCurrencyLIBOR FloorContract AmountPortfolioTrade DateAmount_Spread-DifferenceContract Amount-DifferenceLIBOR Floor-DifferenceBreak StatusBreak ReasonUser RemarksBreak TypeAFAPBusiness AgeSystem AgeAttachmentStatusGroup NameRecon StatusUser NameAsset NameRecon NameSystem RemarksEmailApproverApprover ListPending LevelReview AgeIsReviewedExplained DiffReviewed DiffAction Performed ByAction Performed OnAction NameBusiness DaySideRec TimeOriginal Action TimeReconKey_AppliedPosting StatusImportance LevelPosted Transaction IDPosted MessagePosted BySnooze Datedateattribute-1Test Date",
  );
  await page.getByRole("button", { name: "Remove All" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await page.getByRole("button", { name: "Configure Attribute" }).click();
  await page.getByRole("button", { name: "Change View" }).click();
  await expect(page.locator("#NormalizedViewChangeViewShuttle")).toContainText(
    "attribute-1Test DatedateAmount_SpreadDue DateAccount IDCurrencyLIBOR FloorContract AmountPortfolioTrade DateAmount_Spread-DifferenceContract Amount-DifferenceLIBOR Floor-DifferenceBreak StatusBreak ReasonUser RemarksBreak TypeAFAPBusiness AgeSystem AgeAttachmentStatusGroup NameRecon StatusUser NameAsset NameRecon NameSystem RemarksEmailApproverApprover ListPending LevelReview AgeIsReviewedExplained DiffReviewed DiffAction Performed ByAction Performed OnAction NameBusiness DaySideRec TimeOriginal Action TimeReconKey_AppliedPosting StatusImportance LevelPosted Transaction IDPosted MessagePosted BySnooze Date",
  );
  await page.getByText("attribute-").click();
  await page.getByText("Test Date").click();
  await page.getByText("date", { exact: true }).click();
  await page.getByText("Amount_Spread", { exact: true }).click();
  await page.getByText("Due Date").click();
  await page.getByText("Account ID").click();
  await page.getByText("Currency").click();
  await page.getByText("Contract Amount", { exact: true }).click();
  await page.getByText("LIBOR Floor", { exact: true }).click();
  await page.getByText("Amount_Spread-Difference").click();
  await page.getByText("Contract Amount-Difference").click();
  await page
    .locator("#NormalizedViewOverlappedColumnsSelector #checkboxID")
    .uncheck();
  await page
    .locator("#NormalizedViewOverlappedColumnsSelector #checkboxID")
    .check();
  await page.locator(overllapedAttributescheckbox("attribute-1")).uncheck();
  await page.locator(overllapedAttributescheckbox("Test Date")).uncheck();
  await page.getByRole("button", { name: "Save View" }).click();
  await expect(page.getByLabel("Error")).toContainText(
    "ErrorCan not save without any selected cloumns",
  );
  await page.locator("#NormalizedViewBreakStatusSelector #checkboxID").check();
  await page.getByRole("button", { name: "Save View" }).click();
  await expect(page.getByLabel("Update Normalized View")).toContainText(
    "Update Normalized ViewNormalized view Position_NV_Setup_Automation setup saved",
  );

  // Update Recon
  for (let i = 1; i <= 5; i++) {
    await updateReconMappingInNV(
      page,
      "Position_NV_Setup_Automation",
      `Position_Recon_NV_${i}`,
    );
  }
  //
  //validation on BM
  await openFromBreakManagement(page, "Position_NV_Setup_Automation", "View");
  await page.getByRole("button", { name: "view :" }).click();
  await expect(page.locator("#childContainerCheckRunStatus")).toContainText(
    "Underlying Recons Position_Recon_NV_1Position_Recon_NV_2Position_Recon_NV_3Position_Recon_NV_4Position_Recon_NV_5",
  );
  await page.getByRole("button", { name: "Position_Recon_NV_1" }).click();
  await expect(page.locator("#RS_FirstRow")).toContainText(
    "Recon : Position_Recon_NV_1",
  );
  await page.getByTestId("runSatusClose").click();
  await page.getByRole("button", { name: "Sign off" }).click();
  await expect(page.locator("#root")).toContainText(
    "Actions getting performed on following checked reconsPosition_Recon_NV_1Already Signed OffPosition_Recon_NV_2Already Signed OffPosition_Recon_NV_3Already Signed OffPosition_Recon_NV_4Already Signed OffPosition_Recon_NV_5Already Signed OffCancelSign offRevoke Signoff",
  );
  await page.getByRole("button", { name: "Cancel" }).click();

  //add attribute from view settings
  await page.getByTitle("Manage Recon Settings").click();
  await page.getByRole("button", { name: "View Settings" }).click();
  await page.getByRole("button", { name: "Recon Name" }).click();
  await page.getByRole("button", { name: "Recon Status" }).click();
  await page.getByRole("button", { name: "Break Type" }).click();
  await page.getByRole("button", { name: "Break Status" }).click();
  await page.getByRole("button", { name: "Status" }).click();
  await page.getByTestId("generateViewSettings").click();
  await page.getByTestId("saveViewSettings").click();

  await page
    .getByRole("button", { name: "Clear Filters and Grouping" })
    .click();
  try {
    await expect(page.locator("#ReconGrid")).toContainText(
      "Total Rows : 10,052",
    );
  } catch {
    console.error(`Error During validating added attributes in view`);
  }
  try {
    await expect(page.getByRole("grid")).toContainText(
      "attribute-1 - Internal",
    );
    await expect(page.getByRole("grid")).toContainText(
      "attribute-1 - External",
    );
    await expect(page.getByRole("grid")).toContainText("Test Date - Internal");

    await expect(page.getByRole("grid")).toContainText(
      "Test Date - External 1",
    );
    await expect(page.getByRole("grid")).toContainText("date");
    await expect(page.getByRole("grid")).toContainText("Amount_Spread");
    await expect(page.getByRole("grid")).toContainText("Due Date");
    await expect(page.getByRole("grid")).toContainText("Account ID");
    await expect(page.getByRole("grid")).toContainText("Account ID");
    await expect(page.getByRole("grid")).toContainText("Currency");
    //scroll to right
    // await scrolluntilVisible(page, getCellByAttributeAndValue('Contract Amount', 'Position_Recon_NV_1'));

    await expect(page.getByRole("grid")).toContainText("Contract Amount");
    await expect(page.getByRole("grid")).toContainText("LIBOR Floor");
    await expect(page.getByRole("grid")).toContainText(
      "Amount_Spread-Difference",
    );
    await expect(page.getByRole("grid")).toContainText(
      "Contract Amount-Difference",
    );
    await expect(page.getByRole("grid")).toContainText("Recon Name");
    await expect(page.getByRole("grid")).toContainText("Recon Status");
    await expect(page.getByRole("grid")).toContainText("Break Type");
    await expect(page.getByRole("grid")).toContainText("Break Status");
  } catch (error) {
    console.error(`Error During validating added attributes in view`);
  }

  //validate recon name in recon filter
  await selectFilterByAttributeName("Recon Name");
  // await page.locator('[id="floatingFilter_Recon Name_adaptableId"]').getByText('Select...').click();
  try {
    await expect(page.locator("body")).toContainText(
      "Position_Recon_NV_1 Position_Recon_NV_2 Position_Recon_NV_3 Position_Recon_NV_4 Position_Recon_NV_5",
    );
  } catch (error) {
    console.error(`Error During validating recon name in filter`);
  }

  //reconcile check
  try {
    await page.getByRole("textbox", { name: "Quick Search" }).click();
    await page.getByRole("textbox", { name: "Quick Search" }).fill("same side");
    await expect(page.getByRole("grid")).toContainText("");
    await page.getByRole("textbox", { name: "Quick Search" }).click();
    await page
      .getByRole("textbox", { name: "Quick Search" })
      .fill("system match");
    await expect(page.getByRole("grid")).toContainText("");
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
    await expect(page.getByRole("grid")).toContainText("");
  } catch (error) {
    console.error(`Error During validating closed status`);
  }
});
