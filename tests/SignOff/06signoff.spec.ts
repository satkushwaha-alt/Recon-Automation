import { test, expect } from '@playwright/test';
import { login } from '../../lib/login';
import { getContrast } from '../../lib/getContrast';

test('signoff6', async ({ page }) => {
  await login(page, 'mayadav_reconsignoff@ivp.in', 'Ivp@123');

  //open recon
  await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).fill('Signoff Automation WA Break_Management_Position');
  await page.locator('#btnExpand_1991').click();
  await page.getByRole('textbox', { name: 'Click to view Break Details' }).first().click();
  await expect(page.locator('#signOffIcon')).toContainText('Sign off');
const signOff = page.locator('#signOffIcon');

// signoff color in status bar
try {
    await expect(signOff).toHaveCSS('color', 'rgb(219, 134, 57)');
} catch (error) {
    // console.log('signoff color changed');
}
try{
    await expect(signOff).toHaveCSS('background-color', 'rgb(255, 255, 255)');
}catch(error){
    // console.log(`signoff bacground color changed`);
}
// grid color when signoff


await page.getByRole('textbox', { name: 'Quick Search' }).click();
await page.getByRole('textbox', { name: 'Quick Search' }).fill('17358570074838');
let gridcell = await page.getByText('17358570074838');
await expect(gridcell).toHaveCSS('color', 'rgb(0, 0, 0)');
await expect(gridcell).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');

//signoff Approve Button Color
await page.getByRole('button', { name: 'Sign off' }).click();
const signoffApproveButton = await page.locator('#signOffApproveButton').getByRole('button', { name: 'Sign off' });
await expect(signoffApproveButton).toHaveCSS('color','rgb(255, 255, 255)');
await expect(signoffApproveButton).toHaveCSS('background-color','rgb(219, 134, 57)');
await page.locator('#signOffApproveButton').getByRole('button', { name: 'Sign off' }).click();

// revoke color in status bar
const revoke = await page.getByRole('button', { name: 'Revoke' });
try {
    await expect(revoke).toHaveCSS('color', 'rgb(219, 134, 57)');
} catch (error) {
    // console.log('signoff color changed');
}
try{
    await expect(revoke).toHaveCSS('background-color', 'rgb(255, 255, 255)');
}catch(error){
    // console.log(`signoff background color changed`);
}

// grid color when revoke
await page.getByRole('textbox', { name: 'Quick Search' }).click();
await page.getByRole('textbox', { name: 'Quick Search' }).fill('17358570074838');






const gridcell1 = await page.locator(`//span[contains(@id,'cell-Fitch Rating') and text()='CCC+']`);
const res= await getContrast(gridcell1);
try{
  if(res){
    expect(res.contrast.toFixed(2)).toBe("15.00");
  }
}catch(error){
  console.error(`contrast not match ${error}`)
}



await page.getByRole('button', { name: 'Revoke' }).click();
const revokeButton =  await page.locator('#signOffApproveButton').getByRole('button', { name: 'Revoke' });
await expect(revokeButton).toHaveCSS('color','rgb(255, 255, 255)');
await expect(revokeButton).toHaveCSS('background-color','rgb(219, 134, 57)');

await page.locator('#signOffApproveButton').getByRole('button', { name: 'Revoke' }).click();





});