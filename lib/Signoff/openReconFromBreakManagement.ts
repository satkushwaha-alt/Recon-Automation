import { Page } from "@playwright/test";

// Escape regex (safe for dynamic text)
function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function openFromBreakManagement(
  page: Page,
  name: string,                // e.g. "Position_NV_Automation"
  type: "Recon" | "View"      // choose dropdown type
) {
  // Open menu
  try{
     await page.getByTestId('menu-icon').click();
  await page.getByRole('button', { name: 'Break Management' }).click();

  // Dropdown
  const dropdown = page.getByRole('textbox', { name: 'Select any Recon' });

  await dropdown.click();
  await dropdown.type(name, { delay: 100 });

  // Wait for options to load
  await page.getByRole('option').first().waitFor({ state: 'visible' });

  //  Build exact match dynamically
  const fullText = `${type} - ${name}`;
  // console.log(fullText);

  //  Click exact match (handles duplicates safely)
  await page.getByRole('option', {
    name: new RegExp(`^${escapeRegex(fullText)}$`)
  }).click();

  // Generate
  await page.getByRole('button', { name: 'Generate', exact: true }).click();
  console.log(`opened ${fullText}`);
  }catch(error){
    console.error('Error in opening View/recon from Break Management');
  }
 
}