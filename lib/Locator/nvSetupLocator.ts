export const getCellByAttributeAndValue = (attribute: string, value: string) => {
  return `//span[contains(@id,'cell-${attribute}') and normalize-space()='${value}']`;
};

export const selectFilterByAttributeName = ( attribute: string) => {
    return `//div[contains(@id,'floatingFilter_${attribute}')]//span[contains(@title,'Select')]`;
}

export const overllapedAttributescheckbox = (attribute:string) => {
    return `//div[@id='NormalizedViewSelectorsOptionName' and normalize-space()='${attribute}'] /preceding-sibling::div//input[@type='checkbox']`;
}

export const selectDebtByAttributeOnNv = (attribute:string) => {
    return `(//div[contains(@class, 'wow_ReportsAndViewsField')][.//span[text()='${attribute}']]//input)[1]`;
}

export const selectEquitiesByAttributeOnNv = (attribute:string) => {
    return `(//div[contains(@class, 'wow_ReportsAndViewsField')][.//span[text()='${attribute}']]//input)[2]`;
}  

export const toggleOnForReconciledRecordsOnNV = ()=>{
    return `//div[@id="NormalizedViewCheckboxesWrapperTitle" and text()="View Reconciled Records"] /following::input[@type="checkbox"]`
}

export const toggleOnForClosedBreaksOnNV = ()=>{
    return `(//div[@id="NormalizedViewCheckboxesWrapperTitle" and text()="View Closed Records"] /following::input[@type="checkbox"])[1]`;
}
export const dropdownButtonNvOnReconMapping = () => {
    return `//div[contains(@class,'AvailableMappedNvDropdown')]//button`;
}