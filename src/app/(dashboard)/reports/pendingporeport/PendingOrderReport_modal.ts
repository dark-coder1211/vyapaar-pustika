export interface POFilterData {
  StrOrderNo: string
  StrOrderNoValue: string
  StrPartyCode: string
  StrPartyName: string
  StrItemCode: string
  StrItemName: string
  StrItemGroup: string
  StrItemGroupName: string
  StrItemCat: string
  StrItemCatName: string
  StrTransactionType: string
  StrTransactionTypeValue: string
  StrSiteName: string
  StrSiteNameValue: string
  StrAsOnDate: string
}

export interface POReportinterface {
  Orddate: string // Date in the format "/Date(timestamp)/"
  Ordno: string // Order Number
  party: string // Supplier or Vendor Name
  Item: string // Item description
  make: string | null // Item make, can be null
  OrdQty: number // Ordered Quantity
  Closed: string | null // Status of the order (Closed or null)
  RecQty: number // Quantity sold (default is 0)
  unit: string // Unit of measurement
  Vtype: string // Voucher Type (POGST for purchase orders, etc.)
  DocId: string // Document ID for the transaction
  Pending: number // Pending Quantity
  GroupByField: string // Any field to group by, empty by default
  Rate: number // Price per item
  TransactionType: string // Type of transaction (e.g., Opex-PM4-ELC)
}
