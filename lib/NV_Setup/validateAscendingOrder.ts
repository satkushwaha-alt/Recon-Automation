import { expect, Page } from '@playwright/test';
// validate Ascending Order in View List
export async function validateAscendingOrder(
  page: Page,
  selector: string
) {
    try{
  const locator = page.locator(selector);

  // Wait for at least one element
  await locator.first().waitFor();

  // Extract text
  const names = await locator.allTextContents();

  // Clean values
  const trimmedNames = names.map(n => n.trim());

//   console.log("UI Names:", trimmedNames);

  // Sort copy
  const sortedNames = [...trimmedNames].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );

//   console.log("Sorted Names:", sortedNames);

  // Debug mismatch
  trimmedNames.forEach((val, i) => {
    if (val !== sortedNames[i]) {
      console.log(`❌ Mismatch at index ${i}: UI='${val}' | Expected='${sortedNames[i]}'`);
    }
  });

  // Assertion
  expect(trimmedNames, 'List is not in ascending order').toEqual(sortedNames);
}catch(error){
    console.error(`Error During Validate Ascending Order`);
}
}