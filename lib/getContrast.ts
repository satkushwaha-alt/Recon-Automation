import  { Locator } from "@playwright/test";


export async function getContrast(locator: Locator) {
  try{

  const result = await locator.first().evaluate((el) => {

    function luminance(r: number, g: number, b: number) {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928
          ? v / 12.92
          : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    }

    function getRGB(color: string) {
      const match = color.match(/\d+/g);
      return match ? match.slice(0, 3).map(Number) : [0, 0, 0];
    }

    function getRealBackground(el: SVGElement | Element) {
      while (el) {
        const bg = getComputedStyle(el).backgroundColor;
        if (bg !== 'rgba(0, 0, 0, 0)') return bg;
        const parent = el.parentElement;
        if (!parent) break;
        el = parent;
      }
      return 'rgb(255,255,255)';
    }

    const style = getComputedStyle(el);

    const textColor = style.color;
    const bgColor = getRealBackground(el);

    const [r1, g1, b1] = getRGB(textColor);
    const [r2, g2, b2] = getRGB(bgColor);

    const lum1 = luminance(r1, g1, b1);
    const lum2 = luminance(r2, g2, b2);

    const contrast =
      (Math.max(lum1, lum2) + 0.05) /
      (Math.min(lum1, lum2) + 0.05);

    return {
      textColor,
      bgColor,
      contrast: Number(contrast.toFixed(2))
    };
  });

  console.log(" Text Color:", result.textColor);
  console.log(" Background Color:", result.bgColor);
  console.log("Contrast Ratio:", result.contrast);

  return result;
}catch(error){
  console.error(`Error in getContrast`);
}
}