import { test, expect } from "@playwright/test";
import { login } from "../../lib/login";
import { openFromBreakManagement } from "../../lib/Signoff/openReconFromBreakManagement";

test('signoff9', async({page}) =>{
    await login(page, "mayadav_reconsignoff@ivp.in","Ivp@123");
  

    // open recon through BreakManagement
    await openFromBreakManagement(page, 'Position_NV_Automation', "View");
    
    await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
    await page.getByRole('button', { name: 'Copy of' }).click();
    await page.getByRole('button', { name: 'Sign Off', exact: true }).click();
     await page.getByTestId('runSatusClose').click();
    await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
    await page.getByRole('button', { name: 'Copy of' }).click();
    await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending At Approver Assigned Approver : |OpsHead|SignOff_FirstApprover|Quick_OpsCurrent Approver : OperationsSign Off Date :');
    await page.getByTestId('runSatusClose').click();

    //login by mayadav_16@ivp.in
    
    await page.locator('div').filter({ hasText: /^QA$/ }).click();
    await page.getByRole('button', { name: 'Sign out' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_16@ivp.in');
    await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_16%40ivp.in');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@123');
    await page.getByRole('button', { name: 'Log in' }).click();

      await openFromBreakManagement(page, 'Copy of Break_Management_Position',"Recon");
    
      await page.getByRole('button', { name: 'Approve Sign off' }).click();
      await page.getByRole('button', { name: 'Copy of' }).click();
      await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending At Approver Assigned Approver : Operations||SignOff_FirstApprover|Quick_OpsCurrent Approver : OpsHeadSign Off Date :');
      await page.getByTestId('runSatusClose').click();

      await openFromBreakManagement(page, 'Position_NV_Automation',"View");
      await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
      await page.getByRole('button', { name: 'Copy of' }).click();
      await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending At Approver Assigned Approver : Operations||SignOff_FirstApprover|Quick_OpsCurrent Approver : OpsHeadSign Off Date :');
      await page.getByTestId('runSatusClose').click();

      //login by mayadav_re-arch@ivp.in

      await page.getByText('QA').click();
      await page.getByRole('button', { name: 'Sign out' }).click();
      await page.getByRole('textbox', { name: 'Email' }).click();
      await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_re-arch@ivp.in');
      await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_re-arch%40ivp.in');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@123');
      await page.getByRole('button', { name: 'Log in' }).click();

       await openFromBreakManagement(page, 'Position_NV_Automation',"View");

       await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
       await page.getByRole('button', { name: 'Copy of' }).click();
       await page.getByRole('button', { name: 'Approve' }).click();
       await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
       await page.getByRole('button', { name: 'Copy of' }).click();
       await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending At Approver Assigned Approver : Operations|OpsHead||Quick_OpsCurrent Approver : SignOff_FirstApproverSign Off Date :');
       await page.getByTestId('runSatusClose').click();

       //login by mayadav_test_16@ivp.in

       await page.getByText('QA').click();
       await page.getByRole('button', { name: 'Sign out' }).click();
       await page.getByRole('textbox', { name: 'Email' }).click();
       await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_test_16@ivp.in');
       await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_test_16%40ivp.in');
       await page.getByRole('textbox', { name: 'Password' }).click();
       await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@123');
       await page.getByRole('button', { name: 'Log in' }).click();

       await openFromBreakManagement(page, 'Copy of Break_Management_Position',"Recon");
       await expect(page.locator('#approveSignOff')).toContainText('Approve Sign off');
       await expect(page.locator('#rejectSignOff')).toContainText('Reject Sign off');
       await page.getByRole('button', { name: 'Copy of' }).click();
       await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending At Approver Assigned Approver : Operations|OpsHead||Quick_OpsCurrent Approver : SignOff_FirstApproverSign Off Date :');
       await page.getByTestId('runSatusClose').click();

       
       await openFromBreakManagement(page, 'Position_NV_Automation',"View");
       await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
       await page.getByRole('button', { name: 'Copy of' }).click();
       await page.getByRole('button', { name: 'Approve' }).click();
       await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
       await page.getByRole('button', { name: 'Copy of' }).click();
       await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending At Approver Assigned Approver : Operations|OpsHead|SignOff_FirstApprover|Current Approver : Quick_OpsSign Off Date :');
       await page.getByTestId('runSatusClose').click();

       //login by mayadav_re-arch1@ivp.in
       await page.getByText('QA').click();
       await page.getByRole('button', { name: 'Sign out' }).click();
       await page.getByRole('textbox', { name: 'Email' }).click();
       await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_re-arch1@ivp.in');
       await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_re-arch1%40ivp.in');
       await page.getByRole('textbox', { name: 'Password' }).click();
       await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@101');
       await page.getByRole('button', { name: 'Log in' }).click();

       await openFromBreakManagement(page, 'Copy of Break_Management_Position',"Recon");
       await page.getByRole('button', { name: 'Reject Sign off' }).click();
       await expect(page.locator('#signOffIcon')).toContainText('Sign off');




    


});