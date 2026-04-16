import { Page } from "@playwright/test";
export const agregateAndSameSideMatchTogle = () => {
    return `//*[@class='bmContextMenuToggleHeadings' and text()='Aggregate and Same Side Match']/parent::*//input`;
}

