export interface ReportFile {
  FilePath: string;  // The file path where the report is stored
  FileBytes: string; // The Base64-encoded PDF content
}

export interface MTD {
  Docid: string
  V_Type: string
  OrderNo: string
  OrderDate: string
  Party: string
  DBName: string
  Form_Desc: string
  TransactionTypeName: string
  AmdNo: string
  EnqNo: string
  QuotNo: string
  CRName: string
  CreditDays: number
  VerifiedBy: string
}
