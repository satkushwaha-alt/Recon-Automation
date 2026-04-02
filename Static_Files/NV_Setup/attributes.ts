import { Attribute } from "../../lib/NV_Setup/addnewAttributeNV";

export const attributes: Attribute[] = [
  {
    name: "attribute-1",
    description: "varchar attribute for edit check",
    dataType: "Varchar",
  },
  {
    name: "Test Date",
    description: "TestDescription  date check",
    dataType: "DateTime",
    format: "Long Date Format",
  },
  {
    name: "date",
    description: "For delete check",
    dataType: "DateTime",
    format: "Short Date Format",
  },

  {
    name: "Amount_Spread",
    description: "",
    dataType: "Decimal",
  },
  {
    name: "Due Date",
    description: "",
    dataType: "DateTime",
    format: "Long Date Format",
  },
  {
    name: "Account ID",
    description: "",
    dataType: "Varchar",
  },
  {
    name: "Currency",
    description: "",
    dataType: "Varchar",
  },
  {
    name: "LIBOR Floor",
    description: "",
    dataType: "Decimal",
  },
  {
    name: "Contract Amount",
    description: "",
    dataType: "Decimal",
  },
  {
    name: "Portfolio",
    description: "",
    dataType: "Varchar",
  },
  {
    name: "Trade Date",
    description: "Trade Date",
    dataType: "DateTime",
    format: "Short Date Format",
  },
];

//mapping of attributes for recon mapping update in NV
export const attributeMappings = {
  Position_Recon_NV_1: [
    {
      attribute_name: "Account ID",
      debt: "Facility ID",
      equities: "Facility ID",
    },
    { attribute_name: "Amount_Spread", debt: "Spread", equities: "Spread" },
    // { "attribute_name": "attribute-1", "debt": "Facility ID", "equities": "Facility ID" },
    {
      attribute_name: "Contract Amount",
      debt: "Contract Amount",
      equities: "Contract Amount",
    },
    { attribute_name: "Currency", debt: "Currency", equities: "Currency" },
    {
      attribute_name: "date",
      debt: "Maturity Date",
      equities: "Maturity Date",
    },
    // { "attribute_name": "Due Date", "debt": "Maturity Date", "equities": "Maturity Date" },
    {
      attribute_name: "LIBOR Floor",
      debt: "LIBOR Floor",
      equities: "LIBOR Floor",
    },
    { attribute_name: "Portfolio", debt: "Portfolio", equities: "Portfolio" },
    // { "attribute_name": "Test Date", "debt": "Maturity Date", "equities": "Maturity Date" },
    // { "attribute_name": "Trade Date", "debt": "Maturity Date", "equities": "Maturity Date" }
  ],
  Position_Recon_NV_2: [
    {
      attribute_name: "Account ID",
      debt: "Facility Type",
      equities: "Facility Type",
    },
    { attribute_name: "Amount_Spread", debt: "Spread", equities: "Spread" },
    {
      attribute_name: "attribute-1",
      debt: "Fitch Rating",
      equities: "Fitch Rating",
    },
    {
      attribute_name: "Contract Amount",
      debt: "Current Amount",
      equities: "Current Amount",
    },
    {
      attribute_name: "Currency",
      debt: "Local Currency",
      equities: "Local Currency",
    },
    {
      attribute_name: "date",
      debt: "Maturity Date",
      equities: "Maturity Date",
    },
    // { "attribute_name": "Due Date", "debt": "Maturity Date", "equities": "Maturity Date" },
    {
      attribute_name: "LIBOR Floor",
      debt: "LIBOR Floor",
      equities: "LIBOR Floor",
    },
    { attribute_name: "Portfolio", debt: "Portfolio", equities: "Portfolio" },
    // { "attribute_name": "Test Date", "debt": "Maturity Date", "equities": "Maturity Date" },
    // { "attribute_name": "Trade Date", "debt": "Maturity Date", "equities": "Maturity Date" }
  ],
  Position_Recon_NV_3: [
    {
      attribute_name: "Account ID",
      debt: "Account ID",
      equities: "Account ID",
    },
    {
      attribute_name: "Amount_Spread",
      debt: "Current Spread",
      equities: "Current Spread",
    },
    // { "attribute_name": "attribute-1", "debt": "Account ID", "equities": "Account ID" },
    {
      attribute_name: "Contract Amount",
      debt: "Contract Amount",
      equities: "Contract Amount",
    },
    {
      attribute_name: "Currency",
      debt: "Security Currency",
      equities: "Security Currency",
    },
    {
      attribute_name: "date",
      debt: "Maturity Date",
      equities: "Maturity Date",
    },
    // { "attribute_name": "Due Date", "debt": "Maturity Date", "equities": "Maturity Date" },
    {
      attribute_name: "LIBOR Floor",
      debt: "Account LIBOR Floor",
      equities: "Account LIBOR Floor",
    },
    { attribute_name: "Portfolio", debt: "Portfolio", equities: "Portfolio" },
    // { "attribute_name": "Test Date", "debt": "Maturity Date", "equities": "Maturity Date" },
    // { "attribute_name": "Trade Date", "debt": "Maturity Date", "equities": "Maturity Date" }
  ],
  Position_Recon_NV_4: [
    { attribute_name: "Account ID", debt: "Loan XID", equities: "Loan XID" },
    { attribute_name: "Amount_Spread", debt: "Spread", equities: "Spread" },
    {
      attribute_name: "attribute-1",
      debt: "Facility ID",
      equities: "Facility ID",
    },
    {
      attribute_name: "Contract Amount",
      debt: "Contract Amount",
      equities: "Contract Amount",
    },
    { attribute_name: "Currency", debt: "Currency", equities: "Currency" },
    {
      attribute_name: "date",
      debt: "Maturity Date",
      equities: "Maturity Date",
    },
    // { "attribute_name": "Due Date", "debt": "Maturity Date", "equities": "Maturity Date" },
    {
      attribute_name: "LIBOR Floor",
      debt: "LIBOR Floor",
      equities: "LIBOR Floor",
    },
    { attribute_name: "Portfolio", debt: "Portfolio", equities: "Portfolio" },
    // { "attribute_name": "Test Date", "debt": "Maturity Date", "equities": "Maturity Date" },
    // { "attribute_name": "Trade Date", "debt": "Maturity Date", "equities": "Maturity Date" }
  ],
  Position_Recon_NV_5: [
    {
      attribute_name: "Account ID",
      debt: "Facility ID",
      equities: "Facility ID",
    },
    {
      attribute_name: "Amount_Spread",
      debt: "Base Rate",
      equities: "Base Rate",
    },
    {
      attribute_name: "attribute-1",
      debt: "Facility Type",
      equities: "Facility Type",
    },
    {
      attribute_name: "Contract Amount",
      debt: "Contract Amount",
      equities: "Contract Amount",
    },
    {
      attribute_name: "Currency",
      debt: "Currency",
      equities: "Currency",
    },
    {
      attribute_name: "date",
      debt: "Maturity Date",
      equities: "Maturity Date",
    },
    // {
    //   "attribute_name": "Due Date",
    //   "debt": "Maturity Date",
    //   "equities": "Maturity Date"
    // },
    {
      attribute_name: "LIBOR Floor",
      debt: "LIBOR Floor",
      equities: "LIBOR Floor",
    },
    {
      attribute_name: "Portfolio",
      debt: "Portfolio",
      equities: "Portfolio",
    },
    // {
    //   "attribute_name": "Test Date",
    //   "debt": "Maturity Date",
    //   "equities": "Maturity Date"
    // },
    // {
    //   "attribute_name": "Trade Date",
    //   "debt": "Maturity Date",
    //   "equities": "Maturity Date"
    // }
  ],
   Cash_Recon_1_Automation: [
    {
      attribute_name: "Account ID",
      debt: "AccountID",
      equities: "AccountID",
    },
    {
      attribute_name: "Amount_Spread",
      debt: "Closing Balance",
      equities: "Closing Balance",
    },
    {
      attribute_name: "attribute-1",
      debt: "Asset Category",
      equities: "Asset Category",
    },
    {
      attribute_name: "Contract Amount",
      debt: "Transaction_Amount",
      equities: "Transaction_Amount",
    },
    {
      attribute_name: "Currency",
      debt: "Currency- Mapped",
      equities: "Currency- Mapped",
    },
    {
      attribute_name: "date",
      debt: "Future_Settle_Date_1",
      equities: "Future_Settle_Date_1",
    },
    // {
    //   "attribute_name": "Due Date",
    //   "debt": "Maturity Date",
    //   "equities": "Maturity Date"
    // },
    {
      attribute_name: "LIBOR Floor",
      debt: "Quantity_Total",
      equities: "Quantity_Total",
    },
    {
      attribute_name: "Portfolio",
      debt: "Portfolio- Mapped",
      equities: "Portfolio- Mapped",
    },
    // {
    //   "attribute_name": "Test Date",
    //   "debt": "Maturity Date",
    //   "equities": "Maturity Date"
    // },
    // {
    //   "attribute_name": "Trade Date",
    //   "debt": "Maturity Date",
    //   "equities": "Maturity Date"
    // }
  ],
};


