import { test, expect } from '@playwright/test';
import { login } from '../../lib/login';

test('signoff7', async ({ page }) => {
  await login(page, 'mayadav_reconsignoff@ivp.in', 'Ivp@123');

  //open recon
  await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).fill('Signoff Automation WA Break_Management_Position');
  await page.locator('#btnExpand_1991').click();
  await page.getByRole('textbox', { name: 'Click to view Break Details' }).first().click();
  await expect(page.locator('#signOffIcon')).toContainText('Sign off');


  await page.locator('#floatingFilter_Status_adaptableId').getByText('Select...').click();
  await page.getByRole('textbox', { name: 'Search...' }).fill('Pending');
  await expect(page.locator('.InfiniteVirtualScrollContainer')).toBeVisible();
  await page.locator('#quickAction_Undo').click();
  await expect(page.locator('#noDataUndoActions')).toContainText('No manual action is available for undo.');
  //close Break
  await page.getByRole('textbox', { name: 'Quick Search' }).click();
  await page.getByRole('textbox', { name: 'Quick Search' }).fill('17358570074838');
  await page.getByText('17358570074838').click({
    button: 'right'
  });
  await page.getByText('Close Break').click();
  await page.getByRole('combobox', { name: 'Remarks' }).click();
  await page.getByRole('combobox', { name: 'Remarks' }).fill('Breakss');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.locator('#signOffIcon')).toContainText('Sign off');
  await page.getByRole('button', { name: 'Sign off' }).click();
  await page.locator('#signOffApproveButton').getByRole('button', { name: 'Sign off' }).click();
  //Eror on signoff when breaks are pending
  await expect(page.locator('#root')).toContainText('Error while SignoffResolve Pending breaks before sign off');
  await page.getByRole('button', { name: 'toast' }).first().click();
  await page.getByRole('rowgroup').filter({ hasText: 'CCC+' }).click();

  await page.getByText('Pending', { exact: true }).click();
  await page.getByRole('button', { name: 'Click to get actions for undo' }).click();
  await expect(page.getByTestId('UndoActiveActionRow0Data')).toContainText('Close Breaks 1 Breakss');
  await page.getByRole('rowgroup').filter({ hasText: 'CCC+' }).click();
  await page.getByRole('textbox', { name: 'Quick Search' }).click();
  await page.getByRole('textbox', { name: 'Quick Search' }).fill('');
  await page.locator('#floatingFilter_Status_adaptableId').getByText('Select...').click();
  // 1 pending breaks in status
  await page.getByRole('textbox', { name: 'Search...' }).fill('Pending');
  await expect(page.locator('body')).toContainText('Pending (1)');
  await page.getByRole('button', { name: 'Signoff Automation WA' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending Breaks Initiator : reconSign Off Date');
  await page.getByTestId('runSatusClose').click();
  await page.getByRole('button', { name: 'Click to get actions for undo' }).click();
  await page.getByTestId('UndoActiveActionRow0Data').click();
  await page.getByRole('button', { name: 'cancel' }).click();
  await page.getByRole('button', { name: 'Sign off' }).click();
  await page.locator('#signOffApproveButton').getByRole('button', { name: 'Sign off' }).click();
  await expect(page.getByLabel('Error while Signoff')).toContainText('Error while SignoffResolve Pending breaks before sign off');
  await page.getByRole('button', { name: 'Click to get actions for undo' }).click();
  await page.getByTestId('UndoActiveActionRow0Data').click();
  await page.getByRole('button', { name: 'ok' }).click();
  await page.getByRole('button', { name: 'Signoff Automation WA' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Pending Breaks Initiator : reconSign Off Date :');
  await page.getByTestId('runSatusClose').click();
  await page.locator('#floatingFilter_Status_adaptableId').getByText('Select...').click();
  await page.getByRole('textbox', { name: 'Search...' }).fill('Pending');
  await expect(page.locator('.InfiniteVirtualScrollContainer')).toBeVisible();
  await page.getByRole('button', { name: 'Sign off' }).click();
  await page.locator('#signOffApproveButton').getByRole('button', { name: 'Sign off' }).click();
  await expect(page.getByLabel('SignOff', { exact: true })).toContainText('SignOffRecon Signoff successfull');
  await page.getByRole('button', { name: 'Signoff Automation WA' }).click();
  await expect(page.locator('#RS_FirstRow')).toContainText('Sign off Status : Signed Off >Sign off by : reconSign Off Date :');
  await expect(page.locator('#RS_FirstRow')).toContainText('Revoke Sign Off');
  await page.getByRole('button', { name: 'Revoke Sign Off' }).click();


});