export interface MTD {
    Docid: string
    V_Type: string
    IndNO: string
    IndDt: string
    Reqno: string
    Department: string
    IndenterName: string
    transactionTypeName: string
    HODName: string
}


export interface ReportFile {
  FilePath: string;  // The file path where the report is stored
  FileBytes: string; // The Base64-encoded PDF content
}
