import { test, expect } from "@playwright/test";
import { login } from "../../lib/login";
import fs from "fs";
const { PNG } = require("pngjs");

test("signoff3", async ({ page }) => {
  await login(page, "mayadav_reconsignoff@ivp.in", "Ivp@123");
  // signoff Reject at first Level
  await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).fill('Copy of Break_Management_Position');

  await page.locator('#btnExpand_1990').click();
  await page.getByRole('textbox', { name: 'Click to view Break Details' }).first().click();

  await page.getByRole('button', { name: 'Revoke' }).click();
  await page.locator('#signOffApproveButton').getByRole('button', { name: 'Revoke' }).click();
 
  await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_16@ivp.in');
  await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_16%40ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByTestId('menu-icon').click();
  await page.getByRole('button', { name: 'Dashboard' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).fill('copy of Break_Management_Position');
  await page.locator('#btnExpand_1990').click();
  await page.getByRole('textbox', { name: 'Click to view Break Details' }).first().click();
  await page.getByRole('button', { name: 'Approve Revoke' }).click();
   await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_re-arch@ivp.in');
  await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_re-arch%40ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByTestId('menu-icon').click();
  await page.getByRole('button', { name: 'Dashboard' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).fill('copy of Break_Management_Position');
  await page.locator('#btnExpand_1990').click();
  await page.getByRole('textbox', { name: 'Click to view Break Details' }).first().click();
  await page.getByRole('button', { name: 'Approve Revoke' }).click();

   await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_test_16@ivp.in');
  await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_test_16%40ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByTestId('menu-icon').click();
  await page.getByRole('button', { name: 'Dashboard' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).fill('copy of Break_Management_Position');
  await page.locator('#btnExpand_1990').click();
  await page.getByRole('textbox', { name: 'Click to view Break Details' }).first().click();
  await page.getByRole('button', { name: 'Approve Revoke' }).click();
  await page.getByText('QA').click();
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mayadav_test_re-arch1@ivp.in');
  await page.goto('https://li-reconqaautomation.ivp.in/keycloak/realms/reconqa15autouat/protocol/openid-connect/auth?response_type=code&client_id=rad&redirect_uri=https://li-reconqaautomation.ivp.in/MFRAD/LoginCallback&username=mayadav_re-arch1%40ivp.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ivp@101');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByTestId('menu-icon').click();
  await page.getByRole('button', { name: 'Dashboard' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).fill('copy of Break_Management_Position');
  await page.locator('#btnExpand_1990').click();
  await page.getByRole('textbox', { name: 'Click to view Break Details' }).first().click();
  await page.getByRole('button', { name: 'Approve Revoke' }).click();







});