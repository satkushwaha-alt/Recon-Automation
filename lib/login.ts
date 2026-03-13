import { Page } from '@playwright/test';

export async function login(page: Page, email: string, password: string) {
  await page.goto('https://li-reconqaautomation.ivp.in/IVPRecon/DashboardHandler');

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
}
