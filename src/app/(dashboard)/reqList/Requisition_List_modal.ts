export interface ReqInterface {
  strDocId?: string;
  strRecId?: string;
  strV_No?: string;
  strV_Date?: string;
  strV_Type?: string;
  strV_TypeName?: string;
  strV_Prefix?: string;
  strDepartmentCode?: string;
  strDepartment?: string;
  strReqCode?: string;
  strReqBy?: string;
  strPreparedBy?: string;
  strModifiedBy?: string;
  strDesignation?: string;
  strApprovalId?: string;
  strVerifiedBy?: string;
  strVerifiedDate?: string;
  strApprovedDate?: string;
  strApprovedBy?: string;
  strApprovalStatus?: string;
  strSite_Code?: string;
  strU_EntDt?: string;
  strU_AE?: string;
  strTransfered?: string;
}

export interface ReqApiResponse {
  success: boolean;
  data: ReqInterface[]; 
  error: string
}

export interface ReportFile {
  FilePath: string;  // The file path where the report is stored
  FileBytes: string; // The Base64-encoded PDF content
}
