import { attributeMappings } from "../../Static_Files/NV_Setup/attributes";
import { dropdownButtonNvOnReconMapping, selectDebtByAttributeOnNv, selectEquitiesByAttributeOnNv } from "../Locator/nvSetupLocator";
export const updateReconMappingInNV = async (page:any,nv_name:string,recon_name:string) => {
try{
    await page.getByTestId('menu-icon').click();
    await page.getByRole('button', { name: 'Configurations', exact: true }).click();
    await page.getByRole('button', { name: 'Update Recon' }).click();
    await page.getByRole('button', { name: 'DropdownArrowBtn' }).nth(1).click();
    await page.getByRole('combobox').fill(recon_name);
    // await page.mouse.move(200,200);
    // const element = page.getByRole('option', { name: recon_name });
    // await element.hover();
    const option = page.getByRole('option', { name: recon_name }).first();



await option.waitFor({ state: 'attached' });

await page.evaluate((el: { scrollIntoView: (arg0: { block: string; }) => void; }) => {
  el.scrollIntoView({ block: 'center' });
}, await option.elementHandle());

// Direct DOM click (bypasses EVERYTHING)
await option.evaluate((el: any) => el.click());
    // await page.getByRole('option', { name: recon_name }).click();
    await page.getByTestId('SettingsIcon').click();
    await page.getByRole('button', { name: 'Reports & Views' }).click();
    await page.getByRole('tab', { name: 'Normalized Views' }).click();
    await page.waitForTimeout(7000);
    //add nv in Normalized view dropdown
    try{
        await page.getByRole('button', { name: 'Add', exact: true }).click();
   
    }catch(error){
         await page.getByRole('button', { name: '+ Add', exact: true }).click();
        console.error(`Error Clicking on Add button to add NV in Recon mapping`);
    
    
    }
    await page.locator('#wow_RV_NV_container').getByRole('button', { name: 'DropdownArrowBtn' }).click();
    await page.getByRole('combobox').fill(nv_name);
    
    await page.getByRole('option', { name: nv_name }).click();
    
    await page.locator('#wow_RV_NV_container').getByRole('button', { name: 'DropdownArrowBtn' }).click();
    await page.locator('#wow_RV_NV_container').getByRole('button', { name: 'Done' }).click();
    await page.waitForTimeout(3000);
    //select added nv from dropdown
    await page.locator(dropdownButtonNvOnReconMapping()).click();
    // try{
    //       await page.getByLabel('Position_NV_Setup_Automation').getByRole('button', { name: 'DropdownArrowBtn' }).click();
           
    // }catch(error){
    //         await page.getByLabel('BM_Action_On_Position_Recon_NV').getByRole('button', { name: 'DropdownArrowBtn' }).click();
    //         console.error(`Error Clicking on Dropdown to select NV for mapping in Recon`);
    // }
  
    
    await page.getByRole('combobox').fill(nv_name);
        const option1 = page.getByRole('option', { name: nv_name }).first();



await option1.waitFor({ state: 'attached' });

await page.evaluate((el: { scrollIntoView: (arg0: { block: string; }) => void; }) => {
  el.scrollIntoView({ block: 'center' });
}, await option1.elementHandle());
// Direct DOM click (bypasses EVERYTHING)
await option1.evaluate((el: any) => el.click());
    // await page.getByRole('option', { name: nv_name }).click();
     await page.waitForTimeout(3000);
   
    
    //Mapped Attribute 
    const mappingKey = `${recon_name}` as keyof typeof attributeMappings;
    const mappings = attributeMappings[mappingKey];
    for(let i=0;i<mappings.length;i++){
    //For Debt
       await page.waitForTimeout(500);
    await page.locator(selectDebtByAttributeOnNv(`${mappings[i].attribute_name}`)).click();
    await page.getByRole('combobox').fill(`${mappings[i].debt}`);
    await page.mouse.move(100,100);
    await page.getByRole('option', { name: `${mappings[i].debt}` }).click();
       await page.waitForTimeout(500);
    //for Equities
    await page.locator(selectEquitiesByAttributeOnNv(`${mappings[i].attribute_name}`)).click();
    await page.getByRole('combobox').fill(`${mappings[i].equities}`);
    await page.getByRole('option', { name: `${mappings[i].equities}` }).click();
    }
   
   
    // await page.getByText('Reporting AttributesNormalized ViewsReporting Configuration To pick up a').click();
    // await page.getByText('Reports & ViewReporting').click();
    
    await page.getByRole('button', { name: 'Done' }).click();
    await page.waitForTimeout(3000);
   
   
    await page.getByRole('button', { name: 'Save', exact: true }).click();

    await page.getByRole('button', { name: 'Confirm deletion' }).click();
    const status= await Promise.all([page.waitForResponse((resp: { url: () => string | string[]; status: () => number; }) => resp.url().includes('https://li-reconqaautomation.ivp.in/RSetup/api/SaveChangesInCache') && resp.status() === 200)]);

    console.log(`Recon mapping updated in NV successfully for ${nv_name} and ${recon_name} and status = ${status}`);
    await page.waitForTimeout(3000);
}catch(error){
    console.error(`Error During update ${recon_name} in NV`,error);
}

}