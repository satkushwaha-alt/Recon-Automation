export const closeFilter = (colId: string) =>
  `//div[contains(@id,'floatingFilter') and contains(@id,'${colId}')]//button[@data-name='clear-filter']`;

export const getCellByIdAndText = (colId: string, value: string) =>
  `//span[contains(@id,'cell-${colId}') and normalize-space(text())='${value}']`;

export const selectFilterByAttribute = (Attribute: string) =>
  `//*[@id="floatingFilter_${Attribute}_adaptableId"]//span[contains(text(),"Select")]`;

export const signoffStatusLogo =() => `//input[@type='button'    and contains(@class,'SignOffPendingApprove')    and contains(@title,'pending for approval')]`;
