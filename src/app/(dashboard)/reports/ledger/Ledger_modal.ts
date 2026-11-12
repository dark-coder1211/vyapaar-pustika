export interface LedgerData {
  V_Type: string
  V_No: number
  V_Date: string
  V_Prefix: string
  PName: string
  SubCode: string
  Narration: string
  AmtDr: number
  AmtCr: number
  AmtDr_OP: number
  AmtCr_OP: number
  SNo: number
  Division: string
  ContraName: string
  Chq_No: string
  Chq_Date: string
  BR_Clg_Date: string
  PCity: string
  Site_Code: string
  ManualCode: string
  LedgerStatus: string
  Narration1: string
  WithNarrationYN: string
  docid: string
  V_Sno: number
  WithAdjustmentYN: string
  CountADJ: number
  CumulativeBalance: number
}

export interface LedgerFilters {
  StrFromDate: string
  StrToDate: string
  Site_Code: string
  Site_Name: string
  StrDistributorCode: string
  StrDistributorName: string
  AccountCode: string
  AccountName: string
  AccountGroupCode: string
  AccountGroupName: string
}

export interface ReportFile {
  FilePath: string // The file path where the report is stored
  FileBytes: string // The Base64-encoded PDF content
}

export interface GenericOrder {
  [key: string]: any // Allow any key with any value type
}
