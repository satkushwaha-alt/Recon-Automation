import { Page } from "@playwright/test";
import { selectFilterByAttribute } from "../Locator/signoffLocator";

//  Status
type Status = "Open" | "Pending" | "Blanks" |"Closed";

//  Open actions
type OpenAction =
  | "Match"
  | "Update Remarks"
  | "Close Break"
  | "Workflow Actions";
//close actions
type CloseAction = "Open Break" | "Workflow Actions";
// Workflow actions
type WorkflowActionMap = {
  Open: "Assign Break";
  Pending: "Approve Break" | "Reject Break" | "Change Approver";
  Closed:"Approve Break" | "Reject Break" | "Change Approver";
};

// Conditional Params
type Params<T extends Status> =
  T extends "Open"
    ? {
        action: OpenAction;
        workflowAction?: "Assign Break"; // only for Workflow Actions
      }
    : T extends "Pending"
    ? {
        workflowAction: WorkflowActionMap["Pending"];
      }
    : T extends "Closed"
    ? {
        action:CloseAction;
        workflowAction?: WorkflowActionMap["Closed"];
    }:{};

// Main Function
export async function performActionOnCell<T extends Status>(
  page: Page,
  status: T,
  value: string,
  params: Params<T>,
  Remarks:string
) {
  try {
    // Open Status filter
    await page.locator(selectFilterByAttribute("Status")).click();

    // Filter by Status
    if (status === "Open") {
      await page.getByLabel("", { exact: true }).nth(1).check();
    } else if (status === "Pending") {
      try{
      await page.getByLabel('', { exact: true }).nth(2).check();
      }catch(error){
        await page.getByLabel("", { exact: true }).nth(1).check();
      }
     
    }

    // Wait for filter apply (better replace with waitForLoadState if possible)
    await page.waitForTimeout(2000);

    // Filter by Value
    const searchBox = page.getByRole("textbox", { name: "Quick Search" });
    await searchBox.fill(value);
    await page.waitForTimeout(2000);

    // Right click on row (dynamic value)
    await page.getByText(value).click({ button: "right" });

    //  Pending Flow
    if (status === "Pending") {
      await page.getByText("Workflow Actions").hover();
      const pendingParams = params as Params<"Pending">;
      await page.getByText(pendingParams.workflowAction).click();

      await page.getByRole("combobox", { name: "Remarks" }).fill(Remarks);
      await page.getByRole("button", { name: "Update" }).click();
    }

    // Open Flow
    if (status === "Open") {
      const { action, workflowAction } = params as Params<"Open">;

      // Direct actions
      if (action !== "Workflow Actions") {
        await page.getByText(action).click();
        await page.getByRole("combobox", { name: "Remarks" }).fill(Remarks);
      await page.getByRole("button", { name: "Update" }).click();
      }

      // Workflow Action → only Assign Break
      if (action === "Workflow Actions") {
        await page.getByText("Workflow Actions").hover();

        if (!workflowAction) {
          throw new Error("workflowAction is required when action is 'Workflow Actions'");
        }

        await page.getByText(workflowAction).click();
        await page.getByRole("combobox", { name: "Remarks" }).fill(Remarks);
      await page.getByRole("button", { name: "Update" }).click();
      }
    }
    //close Flow
    if(status == "Closed"){
         const { action, workflowAction } = params as Params<"Closed">;
      if(action !== "Open Break"){
        await page.getByText("Workflow Actions").hover();
      
      if (!workflowAction) {
          throw new Error("workflowAction is required when action is 'Workflow Actions'");
      }
      await page.getByText(workflowAction!).click();

      await page.getByRole("combobox", { name: "Remarks" }).fill(Remarks);
      await page.getByRole("button", { name: "Update" }).click();
      }else if(action == "Open Break"){
             await page.getByText(action).click();
        await page.getByRole("combobox", { name: "Remarks" }).fill(Remarks);
      await page.getByRole("button", { name: "Update" }).click();
      }else{
        console.log("please update your Action");
      }
      }
  
     
      console.log(`Action performed successfully on ${value} with status ${status}`);
      await page.waitForTimeout(3000);  
  } catch (error) {
    console.error("Error in PerformActionOnCell:");
  
  }
}