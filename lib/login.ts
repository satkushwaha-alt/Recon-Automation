import { Page } from '@playwright/test';

//login - open dashboard - Automation
export async function login(page: Page, email: string, password: string) {
  try{
  await page.goto('https://li-reconqaautomation.ivp.in/IVPRecon/DashboardHandler');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(5000);
  const leftMenu = await page.getByTestId('menu-icon');
  if (await leftMenu.isVisible()) {
    console.log('Login success');
  } else {
    console.log('Login failed');
    console.log('page reloading... and login again');
    await page.reload();
    login(page, email, password); 
  }
  }catch(error){
    console.log('Error During Login');
  }
}
//login - open dashboard - QA
export async function loginQA(page: Page, email: string, password: string) {
  try{
  await page.goto('https://li-reconqarearchmt.ivp.in/IVPRecon/DashboardHandler');
  await page.getByRole('textbox', { name: 'Email' }).click(); 
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(5000);
  const leftMenu = await page.getByTestId('menu-icon');
 
  const isVisible = await leftMenu.isVisible();

  if (isVisible) {
    console.log('Login success');
  } else {
    console.log('Login failed');
    console.log('page reloading... and login again');
    await page.reload();
    loginQA(page, email, password);
  }
  }catch(error){
    console.log('Error During Login');
  }
}

//signout and login
export async function signoutLogin(page:Page,email:string,password:string){
  try{
    await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_16@ivp.in');
  const username= email.split('@ivp.in')[0];
  // await page.goto(`https://li-reconqarearchmt.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqarearchmt.ivp.in/MFRAD/LoginCallback&username=${username}%40ivp.in`);
   await page.goto(`https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=${username}%40ivp.in`);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  }catch(error)
  {
    console.error(`Error in Signout and Again Login`);
  }
}
