import { test, expect } from '@playwright/test';
import { login } from '../lib/login';

test('validate grid cell color', async ({ page }) => {
  await login(page, 'mayadav_reconsignoff@ivp.in', 'Ivp@123');

  //open recon
  await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).fill('Copy of Break_Management_Position');
  await page.getByText('Copy of Break_Management_Position').click();

  
  await page.locator('#btnExpand_1990').click();
  await page.getByRole('textbox', { name: 'Click to view Break Details' }).first().click();

//   const cell = page.locator('.ag-row-even.ag-row-no-focus > div:nth-child(4) > .ag-cell-wrapper').first();
await page.getByRole('button', { name: 'Sign off' }).click();
  const cell = page.locator('#signOffApproveButton').getByRole('button', { name: 'Sign off' });

  const bgColor = await cell.evaluate(el => 
    window.getComputedStyle(el).backgroundColor
  );
  console.log(bgColor);

  expect(bgColor).toBe('rgb(219, 134, 57)');
});