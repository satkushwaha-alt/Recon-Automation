import { test, expect } from "@playwright/test";
import { login } from "../../lib/login";
import { openFromBreakManagement } from "../../lib/Signoff/openReconFromBreakManagement";

test('signoff8', async({page}) =>{
    await login(page, "mayadav_reconsignoff@ivp.in","Ivp@123");
    //open Recon through

    // open recon through BreakManagement
    await openFromBreakManagement(page, 'Position_NV_Automation',"View");
    await page.getByRole('button', { name: 'Sign off' }).click();
    await expect(page.locator('#root')).toContainText('Shaurya_Tooltip_Testing');
    await expect(page.locator('#root')).toContainText('Shaurya_AG_Recon');
    await expect(page.locator('#root')).toContainText('Copy of Break_Management_Position');
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
    await expect(page.locator('#childContainerCheckRunStatus')).toContainText('Shaurya_Tooltip_Testing');
    await expect(page.locator('#childContainerCheckRunStatus')).toContainText('Shaurya_AG_Recon');
    await expect(page.locator('#childContainerCheckRunStatus')).toContainText('Copy of Break_Management_Position');
    await page.getByTestId('CloseRoundedIcon').click();

    //open recon- Shaurya_Tooltip_Testing
    await openFromBreakManagement(page,'Shaurya_Tooltip_Testing',"Recon");

    await expect(page.locator('#signOffIcon')).toContainText('Sign off');
    await page.getByRole('button', { name: 'Shaurya_Tooltip_Testing' }).click();
    await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Sign Off Not Intiated');
    await page.getByTestId('runSatusClose').click();
    //open - Position_NV_Automation
     await openFromBreakManagement(page, 'Position_NV_Automation',"View");

     // signoff and revoke through view
     await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
     await page.getByRole('button', { name: 'Shaurya_Tooltip_Testing' }).click();
     await page.getByTestId('runSatusClose').click();
     await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
     await page.getByRole('button', { name: 'Shaurya_Tooltip_Testing' }).click();
     await page.getByRole('button', { name: 'Sign Off', exact: true }).click();
     await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
     await page.getByRole('button', { name: 'Shaurya_Tooltip_Testing' }).click();
     await expect(page.locator('#RS_FirstRow')).toContainText('Revoke Sign Off');
     await page.getByRole('button', { name: 'Revoke Sign Off' }).click();

     await page.waitForTimeout(3000);
     //sign off through View (Recon- Shaurya_Tooltip_Testing)
    await page.getByRole('button', { name: 'Sign off' }).click();
    await page.waitForTimeout(3000);
    ;
    await page.getByLabel('').nth(1).check();
    await page.locator('button').filter({ hasText: 'Sign off' }).click();
    await page.getByRole('button', { name: 'Revoke' }).click();
    await expect(page.locator('#root')).toContainText('Shaurya_Tooltip_TestingAlready Signed Off');
    await page.getByLabel('').nth(1).check();
    await page.getByText('CancelSign offRevoke Signoff').click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
    await page.getByRole('button', { name: 'Shaurya_Tooltip_Testing' }).click();
    await expect(page.locator('#RS_FirstRow')).toContainText('Revoke Sign Off');
    await page.getByTestId('runSatusClose').click();

    //Revoke through recon
     await openFromBreakManagement(page,'Shaurya_Tooltip_Testing',"Recon");

     await expect(page.locator('#revokeIcon')).toContainText('Revoke');
     await page.getByRole('button', { name: 'Revoke' }).click();
     await page.locator('#signOffApproveButton').getByRole('button', { name: 'Revoke' }).click();
     await expect(page.locator('#signOffIcon')).toContainText('Sign off');
     await page.getByRole('button', { name: 'Shaurya_Tooltip_Testing' }).click();
     await expect(page.locator('#RS_FirstRow')).toContainText('Sign Off');
     await page.getByTestId('runSatusClose').click();

     //validate in NV
        await openFromBreakManagement(page, 'Position_NV_Automation',"View");

        await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
        await page.getByRole('button', { name: 'Shaurya_Tooltip_Testing' }).click();
        await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Sign Off Not IntiatedSign Off');
        await page.getByTestId('runSatusClose').click();
    //signoff through recon

     await openFromBreakManagement(page,'Shaurya_Tooltip_Testing',"Recon");

     await page.getByRole('button', { name: 'Sign off' }).click();
     await page.locator('#signOffApproveButton').getByRole('button', { name: 'Sign off' }).click();
     await expect(page.locator('#revokeIcon')).toContainText('Revoke');

     //validat in Nv

       await openFromBreakManagement(page, 'Position_NV_Automation',"View");

       await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
       await page.getByRole('button', { name: 'Shaurya_Tooltip_Testing' }).click();
       await expect(page.locator('#RS_FirstRow')).toContainText('Revoke Sign Off');
       await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Signed Off >Sign off by : reconSign Off Date :');
       await page.getByTestId('runSatusClose').click();
       
       //validate total rows in nv - Shaurya_Tooltip_testing
      

       await expect(page.locator('#ReconGrid')).toContainText('11,301');
          await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
       await page.getByRole('button', { name: 'Shaurya_Tooltip_Testing' }).click();
       await page.getByRole('button', { name: 'Revoke Sign Off' }).click();


       await page.getByRole('button', { name: 'view : Position_NV_Automation' }).click();
       await page.getByRole('button', { name: 'Shaurya_Tooltip_Testing' }).click();
       await page.getByRole('button', { name: 'Sign Off', exact: true }).click();
       await page.getByRole('button', { name: 'Clear Filters and Grouping' }).click();

       await page.waitForTimeout(3000);

     
      



});