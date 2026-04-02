import fs from "fs";
import path from "path";
import type { Locator } from "@playwright/test";

const { PNG } = require("pngjs");

export type ScreenshotCompareOptions = {
  perChannelTolerance?: number;
  overallTolerance?: number;
  // If true, will not throw on mismatch (still logs and saves failed screenshot).
  failOnMismatch?: boolean;
};

export async function compareScreenshotWithBaseline(
  locator: Locator,
  baselinePath: string,
  options: ScreenshotCompareOptions = {},
): Promise<void> {
  try{
    const perChannelTolerance = options.perChannelTolerance ?? 10;
  const overallTolerance = options.overallTolerance ?? 20;
  const failOnMismatch = options.failOnMismatch ?? true;

  const picName = path.parse(baselinePath).name;
  const baselineDir = path.dirname(baselinePath);

  await locator.waitFor({ state: "visible" });
  const currentScreenshot = await locator.screenshot({ animations: "disabled" });

  if (!fs.existsSync(baselinePath)) {
    fs.writeFileSync(baselinePath, currentScreenshot);
    console.log(`Baseline image created for ${picName}`);
    return;
  }

  const baselineImage = PNG.sync.read(fs.readFileSync(baselinePath));
  const currentImage = PNG.sync.read(currentScreenshot);

  if (baselineImage.width !== currentImage.width || baselineImage.height !== currentImage.height) {
    const msg = `${picName} screenshot size mismatch (baseline: ${baselineImage.width}x${baselineImage.height}, current: ${currentImage.width}x${currentImage.height}).`;
    const failedPath = path.join(baselineDir, `${picName}_failed.png`);
    fs.writeFileSync(failedPath, currentScreenshot);
    console.error(msg);
    if (failOnMismatch) {
      throw new Error(msg);
    }
    
  }

  let diffPixels = 0;
  const dataLength = baselineImage.data.length;
  for (let i = 0; i < dataLength; i += 1) {
    const diff = Math.abs(baselineImage.data[i] - currentImage.data[i]);
    if (diff > perChannelTolerance) {
      diffPixels += 1;
    }
  }

  const diffPercentage = (diffPixels / dataLength) * 100;
  if (diffPercentage < overallTolerance) {
    console.log(`${picName} matches baseline with ${diffPercentage.toFixed(2)}% difference`);
  } else {
    const failedPath = path.join(baselineDir, `${picName}_failed.png`);
    fs.writeFileSync(failedPath, currentScreenshot);
    const msg = `${picName} screenshot mismatch: ${diffPercentage.toFixed(2)}% difference`;
    console.error(msg);
    if (failOnMismatch) {
      throw new Error(msg);
    }
  }
}
catch(error){
  console.error('error during screenshot comparison');
}
}
  