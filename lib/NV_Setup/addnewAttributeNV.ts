import { Page } from "@playwright/test";

export type Attribute = {
  name: string;
  description: string;
  dataType: string;
  format?: "Short Date Format" | "Long Date Format"; // only for DateTime
};

export async function addNewAttributes(page: Page, attributes: Attribute[]) {
  for (const attr of attributes) {
    try {
      await page.getByRole("button", { name: "Add New Attribute" }).click();

      // Name
      await page.getByRole("textbox", { name: "Name" }).click();
      await page.getByRole("textbox", { name: "Name" }).fill(attr.name);

      // Description
      await page.getByRole("textbox", { name: "Description" }).click();
      await page
        .getByRole("textbox", { name: "Description" })
        .fill(attr.description);

      // Data Type

      await page.getByRole("textbox", { name: "Data Type" }).click();
      await page
        .getByRole("tooltip", { name: "Varchar" })
        .getByRole("combobox")
        .fill(attr.dataType);
      //   await page.getByRole('combobox').fill(attr.dataType);
      try{
      await page.getByRole("option", { name: attr.dataType }).click();
      }catch(error){
        await page
        .getByRole("tooltip", { name: "Varchar" })
        .getByRole("combobox")
        .click();
        
        await page
        .getByRole("tooltip", { name: "Varchar" })
        .getByRole("combobox")
        .fill('');

        await page
        .getByRole("tooltip", { name: "Varchar" })
        .getByRole("combobox")
        .fill(attr.dataType);
        await page.getByRole("option", { name: attr.dataType }).click();
      }

      //  Special handling for DateTime
      if (attr.dataType === "DateTime") {
        await page.getByRole("textbox", { name: "Length" }).click();

        if (attr.format) {
          await page
            .getByRole("tooltip", { name: "Long Date Format" })
            .getByRole("combobox")
            .fill(attr.format);

          await page.getByRole("option", { name: attr.format }).click();

          await page
            .getByRole("button", { name: "DropdownArrowBtn" })
            .nth(1)
            .click();
          await page.locator("#AddNormalizedViewHeader").click();
        }
      }

      // Add button
      if (attr.dataType !== "DateTime") {
        await page.getByRole("button", { name: "DropdownArrowBtn" }).click();
        await page.locator("#AddNormalizedViewHeader").click();
      }
      await page.waitForTimeout(500);

      await page.getByRole("button", { name: "Add", exact: true }).click();

      console.log(`Attribute '${attr.name}' created`);
    } catch (error) {
      console.error(` Failed to create attribute '${attr.name}'`, error);
      throw error;
    }
  }
}

// import { Page } from "@playwright/test";

// // ✅ Type Definition
// export type Attribute = {
//   name: string;
//   description: string;
//   dataType: "Varchar" | "Decimal" | "DateTime";
//   format?: "Short Date Format" | "Long Date Format";
// };

// // ✅ Reusable Stable Dropdown Handler
// // async function selectDropdown(page: Page, fieldName: string, value: string) {
// //   // Click field
// //   await page.getByRole('textbox', { name: fieldName }).click();

// //   // Target ONLY visible combobox
// //   const input = page.locator('input[role="combobox"]:visible');
// //   await input.fill(value);

// //   // Wait for correct option
// //   const option = page.getByRole('listbox')
// //     .getByRole('option', { name: value });

// //   await option.waitFor({ state: 'visible' });
// //   await option.scrollIntoViewIfNeeded();

// //   // Click option
// //   await option.click();

// //   // Blur to commit selection
// //   await page.locator('body').click();
// // }

// // async function selectDropdown(page: Page, fieldName: string, value: string) {
// //   // 🔹 Step 1: Click correct field
// //   const field = page.getByRole('textbox', { name: fieldName });
// //   await field.click();

// //   // 🔥 Step 2: Get combobox INSIDE that field (IMPORTANT FIX)
// //   const input = field.locator('xpath=following::input[@role="combobox"][1]');

// //   await input.waitFor({ state: 'visible' });
// //   await input.fill(value);

// //   // 🔹 Step 3: Select from correct dropdown
// //   const option = page.getByRole('listbox')
// //     .getByRole('option', { name: value })
// //     .first();

// //   await option.waitFor({ state: 'visible' });
// //   await option.scrollIntoViewIfNeeded();
// //   await option.click();

// //   // 🔹 Step 4: Commit selection
// //   await page.locator('body').click();
// // }


// // async function selectDropdown(page: Page, fieldName: string, value: string) {
// //   // Step 1: Click field
// //   await page.getByRole('textbox', { name: fieldName }).click();

// //   // Step 2: Use LAST combobox (active one)
// //   const input = page.locator('input[role="combobox"]').last();
// //   await input.fill(value);

// //   // 🔥 Step 3: Wait for listbox fresh render
// //   const listbox = page.getByRole('listbox').last();
// //   await listbox.waitFor({ state: 'visible' });

// //   // 🔥 Step 4: CLICK using fresh locator (NO variable reuse)
// //   await page.getByRole('option', { name: value }).last().click();

// //   // Step 5: Commit
// //   await page.locator('body').click();
// // }

// async function selectDropdown(page: Page, fieldName: string, value: string) {
//   // Step 1: Click correct field
//   const field = page.getByRole('textbox', { name: fieldName });
//   await field.click();

//   // Step 2: Type using keyboard (VERY IMPORTANT for your UI)
//   await page.keyboard.type(value, { delay: 50 });

//   // Step 3: Wait for dropdown list (visible only)
//   const listbox = page.locator('[role="listbox"]:visible').last();
//   await listbox.waitFor({ state: 'visible' });

//   // Step 4: Select option INSIDE this dropdown
//   const option = listbox.getByRole('option', { name: value }).first();

//   await option.waitFor({ state: 'visible' });

//   // Step 5: Click with retry (handles re-render)
//   for (let i = 0; i < 3; i++) {
//     try {
//       await option.click();
//       break;
//     } catch (e) {
//       if (i === 2) throw e;
//     }
//   }

//   // Step 6: Close dropdown safely
//   await page.keyboard.press('Escape');
// }

// // ✅ Main Function
// export async function addNewAttributes(page: Page, attributes: Attribute[]) {
//   for (const attr of attributes) {
//     try {
//       // Open form
//       await page.getByRole("button", { name: "Add New Attribute" }).click();

//       // Fill Name
//       await page.getByRole("textbox", { name: "Name" }).fill(attr.name);

//       // Fill Description
//       await page.getByRole("textbox", { name: "Description" }).fill(attr.description);

//       // Select Data Type
//       await selectDropdown(page, "Data Type", attr.dataType);

//       // If DateTime → select format
//       if (attr.dataType === "DateTime" && attr.format) {
//         await selectDropdown(page, "Length", attr.format);
//       }

//       // Ensure Add button is enabled (stability)
//       await page.getByRole("button", { name: "Add", exact: true }).waitFor({ state: "visible" });

//       // Click Add
//       await page.getByRole("button", { name: "Add", exact: true }).click();

//       console.log(`✅ Attribute '${attr.name}' created`);

//     } catch (error) {
//       console.error(`❌ Failed to create attribute '${attr.name}'`, error);
//       throw error;
//     }
//   }
// }







































































































// import { Page, expect, Locator } from "@playwright/test";

// export type Attribute = {
//   name: string;
//   description: string;
//   dataType: string;
//   format?: string; // only for DateTime
// };

// /**
//  * 🔥 Safe Click (handles overlay issues)
//  */
// async function safeClick(locator: Locator) {
//   await locator.waitFor({ state: "visible", timeout: 10000 });

//   try {
//     await locator.click({ timeout: 5000 });
//   } catch {
//     // fallback if intercepted
//     await locator.click({ force: true });
//   }
// }

// /**
//  * 🔥 Select Dropdown (Data Type)
//  */
// async function selectDataType(page: Page, value: string) {
//   const dropdown = page.getByLabel("Data Type");

//   // reset any open popups
//   await page.keyboard.press("Escape").catch(() => {});
//   await page.waitForTimeout(200);

//   await safeClick(dropdown);

//   const listbox = page.locator('[role="listbox"]');
//   await expect(listbox).toBeVisible({ timeout: 5000 });

//   // 🔥 use contains instead of exact match (fix for Decimal issue)
//   const option = listbox.locator(`text=${value}`).first();

//   await expect(option).toBeVisible({ timeout: 5000 });
//   await safeClick(option);

//   // close dropdown properly
//   await page.keyboard.press("Escape");
//   await expect(listbox).toBeHidden({ timeout: 5000 });
// }

// /**
//  * 🔥 Select Date Format (ONLY for DateTime)
//  */
// async function selectDateFormat(page: Page, format: string) {
//   // 🔥 IMPORTANT: wait until second dropdown actually appears
//   const formatDropdown = page.locator('input[role="combobox"]').nth(1);

//   await expect(formatDropdown).toBeVisible({ timeout: 10000 });

//   await safeClick(formatDropdown);

//   const listbox = page.locator('[role="listbox"]');
//   await expect(listbox).toBeVisible({ timeout: 5000 });

//   const option = listbox.locator(`text=${format}`).first();

//   await expect(option).toBeVisible({ timeout: 5000 });
//   await safeClick(option);

//   await page.keyboard.press("Escape");
//   await expect(listbox).toBeHidden({ timeout: 5000 });
// }

// /**
//  * 🔥 MAIN FUNCTION
//  */
// export async function addNewAttributes(page: Page, attributes: Attribute[]) {
//   for (const attr of attributes) {
//     try {
//       console.log(`➡️ Creating: ${attr.name}`);

//       // 🔥 Step 1: Open Add Attribute Modal (IMPORTANT - you were missing stability here)
//       await safeClick(page.getByRole("button", { name: "Add New Attribute" }));

//       // 🔥 Step 2: Wait for modal/form
//       await expect(page.getByRole("textbox", { name: "Name" }))
//         .toBeVisible({ timeout: 10000 });

//       // 🔥 Step 3: Fill Name
//       await page.getByRole("textbox", { name: "Name" }).fill(attr.name);

//       // 🔥 Step 4: Fill Description
//       await page.getByRole("textbox", { name: "Description" })
//         .fill(attr.description);

//       // 🔥 Step 5: Select Data Type
//       await selectDataType(page, attr.dataType);

//       // 🔥 Step 6: Handle DateTime format
//       if (attr.dataType.toLowerCase().includes("date")) {
//         if (attr.format) {
//           await selectDateFormat(page, attr.format);
//         }
//       }

//       // 🔥 Step 7: Click Add
//       const addBtn = page.getByRole("button", { name: "Add", exact: true });
//       await safeClick(addBtn);

//       // ❌ REMOVE WRONG LOGIC:
//       // ❌ DO NOT wait for Add button hidden (it stays visible in your UI)

//       // 🔥 Step 8: Wait for modal close instead
//       await expect(page.getByRole("textbox", { name: "Name" }))
//         .toBeHidden({ timeout: 10000 });

//       // 🔥 Step 9: Verify in grid (VERY IMPORTANT FIX)
//       const searchBox = page.locator('#Attributes')
//         .getByRole('textbox', { name: 'Quick Search' });

//       await searchBox.fill(attr.name);
//       await page.waitForTimeout(1000);

//       const row = page.locator(
//         `//span[contains(@id,'cell-attribute_name') and normalize-space()='${attr.name}']`
//       );

//       await expect(row).toBeVisible({ timeout: 15000 });

//       console.log(`✅ Attribute '${attr.name}' created`);

//     } catch (error) {
//       console.log(`❌ Failed to create '${attr.name}'`, error);

//       // 🔥 Recovery (VERY IMPORTANT)
//       await page.keyboard.press("Escape").catch(() => {});
//       await page.waitForTimeout(1000);

//       // DO NOT reload (causing instability earlier)
//       break;
//     }
//   }
// }








// import { Page, expect, Locator } from "@playwright/test";
// export type Attribute = {
//   name: string;
//   description: string;
//   dataType: string;
//   format?: "Short Date Format" | "Long Date Format";
// };

// // 🔥 SAFE CLICK (handles overlay / retry)
// async function safeClick(locator: Locator) {
//   await locator.waitFor({ state: "visible", timeout: 10000 });

//   for (let i = 0; i < 3; i++) {
//     try {
//       await locator.click({ timeout: 3000 });
//       return;
//     } catch {
//       await locator.page().keyboard.press("Escape").catch(() => {});
//       await locator.page().waitForTimeout(300);
//     }
//   }

//   await locator.click({ force: true });
// }

// // 🔥 SELECT DROPDOWN
// async function selectDropdown(page: Page, label: string, value: string) {
//   await page.keyboard.press("Escape").catch(() => {});
//   await page.waitForTimeout(300);

//   const dropdown = page.getByRole("textbox", { name: label });
//   await safeClick(dropdown);

//   const listbox = page.locator('[role="listbox"]');
//   await expect(listbox).toBeVisible({ timeout: 5000 });

//   const option = listbox.getByRole("option", { name: value }).first();
//   await expect(option).toBeVisible({ timeout: 5000 });

//   await safeClick(option);

//   await page.keyboard.press("Escape").catch(() => {});
//   await page.waitForTimeout(300);
// }

// // 🔥 SELECT DATE FORMAT (NO nth() BUG)
// async function selectDateFormat(page: Page, format: string) {
//   const formatField = page.getByRole("textbox", { name: "Format" });

//   await expect(formatField).toBeVisible({ timeout: 7000 });
//   await safeClick(formatField);

//   const listbox = page.locator('[role="listbox"]');
//   await expect(listbox).toBeVisible({ timeout: 5000 });

//   const option = listbox.getByRole("option", { name: format }).first();
//   await safeClick(option);

//   await page.keyboard.press("Escape").catch(() => {});
//   await page.waitForTimeout(300);
// }

// // 🔥 VERIFY ATTRIBUTE (REAL CHECK)
// async function verifyAttribute(page: Page, name: string) {
//   const search = page.getByRole("textbox", { name: "Quick Search" });

//   await safeClick(search);
//   await search.fill("");
//   await search.fill(name);

//   const cell = page.locator(
//     `//span[contains(@id,'cell-attribute_name') and normalize-space()='${name}']`
//   );

//   await expect
//     .poll(async () => await cell.count(), { timeout: 15000 })
//     .toBeGreaterThan(0);
// }

// // 🔥 MAIN FUNCTION
// export async function addNewAttributes(page: Page, attributes: Attribute[]) {
//   for (const attr of attributes) {
//     try {
//       console.log(`➡️ Creating: ${attr.name}`);

//       // 🔥 OPEN POPUP EVERY TIME
//       await safeClick(page.getByRole("button", { name: "Add New Attribute" }));

//       // Name
//       const nameField = page.getByRole("textbox", { name: "Name" });
//       await safeClick(nameField);
//       await nameField.fill(attr.name);

//       // Description
//       const descField = page.getByRole("textbox", { name: "Description" });
//       await safeClick(descField);
//       await descField.fill(attr.description);

//       // Data Type
//       await selectDropdown(page, "Data Type", attr.dataType);

//       // DateTime format
//       if (attr.dataType === "DateTime") {
//         if (!attr.format) {
//           throw new Error("Format missing for DateTime");
//         }
//         await selectDateFormat(page, attr.format);
//       }

//       // 🔥 CLOSE ANY OPEN DROPDOWN (CRITICAL)
//       await page.keyboard.press("Escape").catch(() => {});
//       await page.waitForTimeout(300);

//       // 🔥 CLICK ADD + WAIT FOR API (FINAL FIX)
//       const addBtn = page.getByRole("button", { name: "Add", exact: true });

//       const [response] = await Promise.all([
//         page.waitForResponse(res =>
//           res.url().toLowerCase().includes("attribute") &&
//           res.request().method() === "POST"
//         ),
//         addBtn.click()
//       ]);

//       if (!response.ok()) {
//         throw new Error(`API failed: ${response.status()}`);
//       }

//       // Wait UI render
//       await page.waitForTimeout(1000);

//       // 🔥 VERIFY REAL CREATION
//       await verifyAttribute(page, attr.name);

//       console.log(`✅ Attribute '${attr.name}' created`);

//       await page.waitForTimeout(500);

//     } catch (error) {
//       console.log(`❌ Failed to create '${attr.name}'`, error);

//       // 🔥 RECOVERY
//       await page.keyboard.press("Escape").catch(() => {});
//       await page.waitForTimeout(500);

//       await page.reload();

//       break;
//     }
//   }
// }