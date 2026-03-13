import { test, expect } from '@playwright/test';
import { login } from '../lib/login';
import fs from 'fs';
const PNG = require('pngjs');

test('validate grid cell color', async ({ page }) => {
  await login(page, 'mayadav_reconsignoff@ivp.in', 'Ivp@123');

  //open recon
  await page.getByRole('textbox', { name: 'Search Text here...' }).click();
  await page.getByRole('textbox', { name: 'Search Text here...' }).fill('Copy of Break_Management_Position');
  await page.getByText('Copy of Break_Management_Position').click();

    const signOffBtn1 = page.getByRole("button", {
    name: "Revoke Signed off is pending for approval",
  });
  const baselinePath1 = "./Screenshots/RevokeSignoffPending.png";
  await signOffBtn1.waitFor({ state: "visible" });
  // take screenshot
  const currentScreenshot1 = await signOffBtn1.screenshot({
    animations: "disabled",
  });
  if (!fs.existsSync(baselinePath1)) {
    fs.writeFileSync(baselinePath1, currentScreenshot1);
    console.log("Baseline image created for Signoff done");
  } else {
    const baselineImage1 = PNG.sync.read(fs.readFileSync(baselinePath1));
    const currentImage1 = PNG.sync.read(currentScreenshot1);
    const totalPixels = baselineImage1.width * baselineImage1.height;
    let diffPixels = 0;
    for (let i = 0; i < baselineImage1.data.length; i++) {
      const diff = Math.abs(baselineImage1.data[i] - currentImage1.data[i]);
      if (diff > 10) {
        //  per-channel tolerance
        diffPixels++;
      }
    }
    const diffPercentage = (diffPixels / baselineImage1.data.length) * 100;
    if (diffPercentage < 20) {
      //  overall tolerance (20%)
      console.log(`Signoff logo matches baseline with ${diffPercentage}`);
    } else {
      console.error(
        ` Screenshot mismatch: ${diffPercentage.toFixed(2)}% difference`,
      );
      fs.writeFileSync("./Screenshots/Signoff2_failed.png", currentScreenshot1);
      throw new Error("Screenshot comparison failed");
    }
  }




});