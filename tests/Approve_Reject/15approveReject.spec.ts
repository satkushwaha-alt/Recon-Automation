import { test, expect } from "@playwright/test";
import { login } from "../../lib/login";
import { openFromBreakManagement } from "../../lib/Signoff/openReconFromBreakManagement";
import { selectFilterByAttribute } from "../../lib/Locator/signoffLocator";
import { getCellByIdAndText } from "../../lib/Locator/signoffLocator";
import { signoutLogin } from "../../lib/login";
import { performActionOnCell } from "../../lib/Signoff/performActionOnCell";
import { closeFilter } from "../../lib/Locator/signoffLocator";
import { selectRowByValues } from "../../lib/Approvereject/selectrowByValues";
import { allBreakType, allBreaktypeAssignBreak } from "../../Static_Files/ApproveReject/data";
import { assignBreak } from "../../lib/Approvereject/approveRejectMethod";

test("approveReject15", async ({ page }) => {
  
    await login(page,"mayadav_reconsignoff@ivp.in","Ivp@123");
 await openFromBreakManagement(
    page,
    "Copy of Break_Management_Position_AP_RJ",
    "Recon",
  );
  //select values for assign break
  await selectRowByValues(page, allBreaktypeAssignBreak);
  const valueForRightClick = allBreaktypeAssignBreak[allBreaktypeAssignBreak.length - 1];
  //assign break
  await assignBreak(page,valueForRightClick,"mayadav_re-arch1@ivp.in","mayadav_re-arch1 assigned"); 
 //change assign
 await assignBreak(page,valueForRightClick,"mayadav_re-arch@ivp.in","mayadav_re-arch assigned"); 



});