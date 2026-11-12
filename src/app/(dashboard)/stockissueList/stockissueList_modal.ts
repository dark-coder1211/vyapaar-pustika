export interface MTD {
  strDocId: string;
  strV_Type: string;
  strV_TypeDesc: string;
  IntV_No: number;
  StrV_Date: string;
  IntV_Prefix: number;
  StrRecId: string;
  StrStaff: string;
  StrStaffName: string;
  StrLocationCode: string;
  StrLocationName: string;
  StrPlantCode: string;
  StrPlantName: string;
  StrPreparedBy: string;
}


export interface StockIssueHeader{
  success:boolean
  message:string
  data:MTD[]
  error:string 
}


export interface ReportFile {
  FilePath: string;  // The file path where the report is stored
  FileBytes: string; // The Base64-encoded PDF content
}
