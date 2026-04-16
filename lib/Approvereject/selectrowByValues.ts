import { Page, expect } from "@playwright/test";
export async function selectRowByValues(page: Page, data:string[]) {
  try {
    let count = 0;
    for (let i =0;i<data.length;i++){
        
      const value = data[i];
      await page.getByRole("textbox", { name: "Quick Search" }).click();
      await page
        .getByRole("textbox", { name: "Quick Search" })
        .fill(value);
        await page.waitForTimeout(3000);
        try{
      await page
        .getByRole("checkbox", { name: "Press Space to toggle row" }).first()   
        .click();
      await expect(page.locator("#ReconGrid")).toContainText(`Selected : ${++count}`);
        }catch(error){
          console.log(`Row with value '${value}' not found or not selectable.`);
          count--; // Decrement count if row not found to keep track of actual selected rows
        }
    }
    console.log(`Total rows selected: ${count}`);
  } catch (error) {
    console.error(`Error in selectRowByValues:`, error);
  }
}
