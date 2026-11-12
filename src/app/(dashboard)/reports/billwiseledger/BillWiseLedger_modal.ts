export interface BillWiseLedgerData {
  AdjustedAmt: number
  BillAmount: number
  BillDate: string
  BillNo: string
  CreditDays: number
  Description: string
  DocId: string
  Email: string
  NetReceiveable: number
  OverDueDays: number
  PartyName: string
  PaymentDueDate: string
  RefDate: string | null
  RefNo: string | number | null
  Site_Code: string
  SubCode: string
  TotUnAdjusted: number
  V_No: number
  V_Prefix: number
  V_SNo: number
  V_Type: string
}

export interface BillWiseLedgerFilters {
  AsOnDate: string
  Site_Code: string
  Site_Name: string
  DistributorCode: string
  DistributorName: string
  AccountCode: string
  AccountName: string
  AccountGroupCode: string
  AccountGroupName: string
  ReportOn: string
  ReportOnName: string
}

export interface GenericOrder {
  [key: string]: any // Allow any key with any value type
}
