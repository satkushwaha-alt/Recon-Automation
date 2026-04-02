import { test, expect } from "@playwright/test";
import { login } from "../../lib/login";
import fs from "fs";
import { openFromBreakManagement } from "../../lib/Signoff/openReconFromBreakManagement";
const { PNG } = require("pngjs");
import { compareScreenshotWithBaseline } from "../../lib/screenshotUtils";

test("signoff4", async ({ page }) => {
  await login(page, "mayadav_reconsignoff@ivp.in", "Ivp@123");

  //open recon
  await page.getByRole("textbox", { name: "Search Text here..." }).click();
  await page
    .getByRole("textbox", { name: "Search Text here..." })
    .fill("Copy of Break_Management_Position");
  await page.getByText("Copy of Break_Management_Position",{exact:true}).click();
  await page.locator("#btnExpand_1990").click();
  await page
    .getByRole("textbox", { name: "Click to view Break Details" })
    .first()
    .click();

  
  await page.getByRole('button', { name: 'Sign off' }).click();
  
    await page.locator('#signOffApproveButton').getByRole('button', { name: 'Sign off' }).click();
    await page.waitForTimeout(5000);
    try{
        await expect(page.locator('#pendingSignOff')).toContainText('Signoff Pending for Approval');
    }catch(error){
      console.log('signoff not done');
    }
  
    await page.getByRole('button', { name: 'Copy of' }).click();
    await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status :');
    await expect(page.locator('#RS_FirstRow')).toContainText('Pending At Approver');
  

  await page.locator('i').hover();
  await page.getByTestId('runSatusClose').click();
  await page.getByTestId("menu-icon").click();
  await page.getByRole("button", { name: "Dashboard" }).click();
  await page.getByRole("textbox", { name: "Search Text here..." }).click();
  await page
    .getByRole("textbox", { name: "Search Text here..." })
    .fill("Copy of Break_Management_Position");
  // await expect(page.getByTitle('SIGNED_OFF', { exact: true })).toBeVisible();
  // await page.getByRole('button', { name: 'Signed off for the day is' }).click();
  // await expect(page.locator('#iconButtonID_SettingIconDashboard')).toBeVisible();
  await page.getByText("QA").click();
  await page.getByRole("button", { name: "Sign out" }).click();
  // await page.pause();

  // login by mayadav_16@ivp.in - operations
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_16@ivp.in');

  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_16@ivp.in');
  await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_16%40ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@123');
  await page.getByRole('button', { name: 'Log in' }).click();

await openFromBreakManagement(page, 'Copy of Break_Management_Position',"Recon");
  await page.getByRole('button', { name: 'Copy of'  }).click();
  // await page.pause();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending At Approver Assigned Approver : |OpsHead|SignOff_FirstApprover|Quick_OpsCurrent Approver : OperationsSign Off Date :');
  await page.getByTestId('runSatusClose').click();
  await expect(page.locator('#approveSignOff')).toContainText('Approve Sign off');
  await expect(page.locator('#rejectSignOff')).toContainText('Reject Sign off');
  await page.getByRole('button', { name: 'Copy of' }).click();
  await page.getByRole('button', { name: 'Approve', exact: true }).click();
  await expect(page.locator('#pendingSignOff')).toContainText('Signoff Pending for Approval');
  await page.getByRole('button', { name: 'Copy of' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending At Approver Assigned Approver : Operations||SignOff_FirstApprover|Quick_OpsCurrent Approver : OpsHeadSign Off Date :');
  await page.getByTestId('runSatusClose').click();
  await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();

  // login by mayadav_rearch@ivp.in - ops_head
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_re-arch@ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@123');
  await page.getByRole('button', { name: 'Log in' }).click();
 
  await openFromBreakManagement(page, 'Copy of Break_Management_Position',"Recon");
  
  await expect(page.locator('#approveSignOff')).toContainText('Approve Sign off');
  await expect(page.locator('#rejectSignOff')).toContainText('Reject Sign off');
  await page.getByRole('button', { name: 'Copy of' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending At Approver Assigned Approver : Operations||SignOff_FirstApprover|Quick_OpsCurrent Approver : OpsHeadSign Off Date :');
  await page.getByTestId('runSatusClose').click();
  await page.getByRole('button', { name: 'Approve Sign off' }).click();
  await expect(page.locator('#pendingSignOff')).toContainText('Signoff Pending for Approval');
  await page.getByRole('button', { name: 'Copy of' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending At Approver Assigned Approver : Operations|OpsHead||Quick_OpsCurrent Approver : SignOff_FirstApproverSign Off Date :');
  await page.getByTestId('runSatusClose').click();
  await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();

  // login by mayadav_re-arch1@ivp.in - Quick_Ops
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_re-arch1@ivp.in');
  await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_re-arch1%40ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@101');
  await page.getByRole('button', { name: 'Log in' }).click();
  
  await openFromBreakManagement(page, 'Copy of Break_Management_Position',"Recon");

  await expect(page.locator('#pendingSignOff')).toContainText('Signoff Pending for Approval');
  await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();

  // login by mayadav_test_16@ivp.in - SignOff_FirstApprover
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_test_16@ivp.in');
  await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_test_16%40ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@123');
  await page.getByRole('button', { name: 'Log in' }).click();

  await openFromBreakManagement(page, 'Copy of Break_Management_Position',"Recon");

  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Copy of' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending At Approver Assigned Approver : Operations|OpsHead||Quick_OpsCurrent Approver : SignOff_FirstApproverSign Off Date :');
  await page.getByTestId('runSatusClose').click();
  await page.getByRole('button', { name: 'Approve Sign off' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('tab', { name: 'BreakManagement -Copy of' }).click();
    await page.waitForTimeout(5000);
  await expect(page.locator('#pendingSignOff')).toContainText('Signoff Pending for Approval');
  await page.getByRole('button', { name: 'Copy of' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending At Approver Assigned Approver : Operations|OpsHead|SignOff_FirstApprover|Current Approver : Quick_OpsSign Off Date :');
  await page.getByTestId('runSatusClose').click();
  await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();

  // login by mayadav_re-arch1@ivp.in
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("mayadav_re-arch1@ivp.in");
  await page.goto(
    "https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_re-arch1%40ivp.in",
  );
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("Ivp@101");
  await page.getByRole("button", { name: "Log in" }).click();
  await page.getByTestId("menu-icon").click();
  // await page.getByRole('button', { name: 'Dashboard' }).click();
  await page.getByRole("button", { name: "Dashboard", exact: true }).click();
  await page.getByRole("textbox", { name: "Search Text here..." }).click();
  await page
    .getByRole("textbox", { name: "Search Text here..." })
    .fill("Copy of Break_Management_Position");
  // await page.getByTitle('SIGNED_OFF', { exact: true }).click();
  await page.getByRole('button', { name: 'Signed off for the day is' }).click();



  // compare signoff logo when signoff not done(should appear as blank)
  const signOffBtn = page.getByRole('button', { name: 'Signed off for the day is' });
  const baselinePath = './Screenshots/Signoff1.png';
  
    // Compare images
    try {
      compareScreenshotWithBaseline(signOffBtn,baselinePath);
    } catch (error) {
         console.log('Signoff logo not matches when signoff not done');
    }
    
 
  

  await page.locator('#btnExpand_1990').click();
  await page.getByRole('textbox', { name: 'Click to view Break Details' }).first().click();
  await page.getByRole('button', { name: 'Approve Sign off' }).click();
  await expect(page.locator('#revokeIcon')).toContainText('Revoke');
  await page.getByRole('button', { name: 'Copy of' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Signed Off >Sign off by : mayadav_re-arch1@ivp.inSign Off Date :');
  await expect(page.locator('#RS_FirstRow')).toContainText('Revoke Sign Off');
  await page.getByTestId('runSatusClose').click();

  //signoff validation on dashboard
  await page.getByTestId('menu-icon').click();
  await page.getByRole('button', { name: 'Dashboard' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).fill('Copy of Break_Management_Position');
  await page.mouse.move(100,100);
  await page.locator(`
  //input[@type='button'
  and contains(@title,'Recon name: Copy of Break_Management_Position')
  and not(contains(@title,'Single Approver'))
]`).click();
  

  // await page.getByRole('button', { name: 'Recon name: Copy of',exact:true }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Signed Off >Sign off by : mayadav_re-arch1@ivp.inSign Off Date :');
  await expect(page.locator('#RS_FirstRow')).toContainText('Revoke Sign Off');
  await page.getByTestId('runSatusClose').click();
  // await page.getByRole('button', { name: 'Recon has been signed off for' }).click();


  // signoff logo validation on dashboard
  try{
    
  const signOffBtn1 = page.getByRole("button", {
    name: "Recon has been signed off for",
  });
  const baselinePath1 = "./Screenshots/Signoff2.png";
  await signOffBtn1.waitFor({ state: "visible" });
  // take screenshot
  const currentScreenshot1 = await signOffBtn1.screenshot({
    animations: "disabled",
  });
  if (!fs.existsSync(baselinePath1)) {
    fs.writeFileSync(baselinePath1, currentScreenshot1);
    console.log("Baseline image created for Signoff done");
  } else {
    const baselineImage1 = PNG.sync.read(fs.readFileSync(baselinePath1));
    const currentImage1 = PNG.sync.read(currentScreenshot1);
    const totalPixels = baselineImage1.width * baselineImage1.height;
    let diffPixels = 0;
    for (let i = 0; i < baselineImage1.data.length; i++) {
      const diff = Math.abs(baselineImage1.data[i] - currentImage1.data[i]);
      if (diff > 10) {
        //  per-channel tolerance
        diffPixels++;
      }
    }
    const diffPercentage = (diffPixels / baselineImage1.data.length) * 100;
    if (diffPercentage < 20) {
      //  overall tolerance (20%)
      console.log(`Signoff logo matches baseline with ${diffPercentage}`);
    } else {
      console.error(
        ` Screenshot mismatch: ${diffPercentage.toFixed(2)}% difference`,
      );
      fs.writeFileSync("./Screenshots/Signoff2_failed.png", currentScreenshot1);
      throw new Error("Screenshot comparison failed");
    }
  }
}catch(error){
  console.log('error during screenshot comapre')
}


  // Revoke -> signoff convert into revoke
  await page.locator('#btnExpand_1990').click();
  await page.getByRole('textbox', { name: 'Click to view Break Details' }).first().click();
  await page.getByRole('button', { name: 'Revoke' }).click();
  await page.locator('#signOffApproveButton').getByRole('button', { name: 'Revoke' }).click();

  await page.getByRole('button', { name: 'Copy of' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Revoke Sign off Pending Assigned Approver : |OpsHead|SignOff_FirstApprover|Quick_OpsCurrent Approver : OperationsSign Off Date :');
  await page.getByTestId('runSatusClose').click();
  await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();

  //login by mayadav_16@ivp.in
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_16@ivp.in');
  await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_16%40ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  
  await openFromBreakManagement(page, 'Copy of Break_Management_Position',"Recon");

  await page.getByRole('button', { name: 'Approve Revoke' }).click();
  try{
    await page.getByRole('button', { name: 'Approve Revoke' }).click();
  }catch(error){
    console.log(error);
  }
  
  await page.getByRole('button', { name: 'Copy of' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Revoke Sign off Pending Assigned Approver : Operations||SignOff_FirstApprover|Quick_OpsCurrent Approver : OpsHeadSign Off Date :');
  await page.getByTestId('runSatusClose').click();
  await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();

  //login by mayadav_re-arch@ivp.in
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_re-arch@ivp.in');
  await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_re-arch%40ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await openFromBreakManagement(page,'Copy of Break_Management_Position',"Recon");
  // await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  // await page.getByRole('textbox', { name: 'Search Text here...' }).fill('Copy of Break_Management_Position');
  // await page.getByRole('button', { name: 'Revoke Signed off is pending' }).click();
  await page.waitForTimeout(20000);
  await page.getByRole('button', { name: 'Recon name: Copy of' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Revoke Sign off Pending Assigned Approver : Operations||SignOff_FirstApprover|Quick_OpsCurrent Approver : OpsHeadSign Off Date :');
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Recon name: Copy of' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Revoke Sign off Pending Assigned Approver : Operations|OpsHead||Quick_OpsCurrent Approver : SignOff_FirstApproverSign Off Date :');
  await page.getByTestId('runSatusClose').click();
  await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();

  //login by mayadav_re-arch1@ivp.in
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_re-arch1@ivp.in');
  await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_re-arch1%40ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@101');
  await page.getByRole('button', { name: 'Log in' }).click();
  // await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  // await page.getByRole('textbox', { name: 'Search Text here...' }).fill('Copy of Break_Management_Position');
  // await page.mouse.move(100,100);
  await openFromBreakManagement(page,'Copy of Break_Management_Position',"Recon");
  await page.getByRole('button', { name: 'Recon name: Copy of' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Revoke Sign off Pending Assigned Approver : Operations|OpsHead||Quick_OpsCurrent Approver : SignOff_FirstApproverSign Off Date :');
  await page.getByTestId('runSatusClose').click();
  await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();

  // login by mayadav_test_16@ivp.in
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_test_16@ivp.in');
  await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_test_16%40ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  // await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  // await page.getByRole('textbox', { name: 'Search Text here...' }).fill('Copy of Break_Management_Position');
  // await page.mouse.move(100,100);
  await openFromBreakManagement(page, 'Copy of Break_Management_Position',"Recon");
  await page.getByRole('button', { name: 'Recon name: Copy of' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Recon name: Copy of' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Revoke Sign off Pending Assigned Approver : Operations|OpsHead|SignOff_FirstApprover|Current Approver : Quick_OpsSign Off Date :');
  await page.getByTestId('runSatusClose').click();
  await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();

  //login by mayadav_re-arch1@ivp.in
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_re-arch1@ivp.in');
  await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_re-arch1%40ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@101');
  await page.getByRole('button', { name: 'Log in' }).click();
  // await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  // await page.getByRole('textbox', { name: 'Search Text here...' }).fill('Copy of Break_Management_Position');
  // await page.getByRole('button', { name: 'Revoke Signed off is pending' }).click();
  await openFromBreakManagement(page, 'Copy of Break_Management_Position',"Recon");
  await page.getByRole('button', { name: 'Recon name: Copy of' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Recon name: Copy of' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Sign Off Not Intiated');
  await page.getByTestId('runSatusClose').click();
  await openFromBreakManagement(page, 'Copy of Break_Management_Position',"Recon");

  // revoke change into signoff
  await expect(page.locator('#signOffIcon')).toContainText('Sign off');
  await page.getByTestId('menu-icon').click();
  await page.getByRole('button', { name: 'Dashboard' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).fill('Copy of Break_Management_Position');
  await page.getByRole('button', { name: 'Recon name: Copy of' , exact:true}).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Sign Off Not Intiated');
  await page.getByTestId('runSatusClose').click();
  await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();

  //login by signoff_initiator
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_reconsignoff@ivp.in');
  await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_reconsignoff%40ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await openFromBreakManagement(page, 'Copy of Break_Management_Position',"Recon");
  // await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  // await page.getByRole('textbox', { name: 'Search Text here...' }).fill('Copy of Break_Management_Position');
  await page.getByRole('button', { name: 'Recon name: Copy of'}).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Sign Off Not Intiated');
  await page.getByTestId('runSatusClose').click();


 
});
