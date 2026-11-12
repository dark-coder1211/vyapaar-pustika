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
  strPreparedBy?: string | null;
  strModifiedBy?: string | null;
  strDesignation?: string;
  strApprovalId?: string;
  strVerifiedBy?: string | null;
  strVerifiedDate?: string;
  strApprovedDate?: string;
  strApprovedBy?: string | null;
  strApprovalStatus?: string;
  strSite_Code?: string | null;
  strU_EntDt?: string;
  strU_AE?: string;
  strTransfered?: string;
}

export interface EditReqInterfaceDetail {
  RowID?: string;
  strDocId?: string;
  strRecId?: string;
  strV_No?: string;
  strV_Sno?: number;
  strV_Date?: string;
  strV_Type?: string;
  strV_TypeName?: string;
  strItemCode?: string;
  strItem?: string;
  strMakeCode?: string;
  strMakeName?: string;
  strSKU?: string;
  strReqQty?: number;
  strReqDate?: string;
  strCCCode?: string;
  strCostCenter?: string;
  strRemark?: string;
  strClosed?: string;
  strSite_Code?: string | null;
  currentStock?: number
}

export type PostReqFormData = {
  clsRequHeader: ReqInterface[],
  clsRequDetail: EditReqInterfaceDetail[]
};

export interface AddRequisition {
  success: boolean;
  data: PostReqFormData;
  error?: string;
}

export interface RecidInterface {
  success: boolean;
  data: string;
  error: string
}

export interface ReqApiResponse {
  success: boolean;
  data: ReqInterface[]; // Assuming the data property contains the array
  error: string
}

export interface ReqApiResponseDetail {
  success: boolean;
  data: EditReqInterfaceDetail[]; // Assuming the data property contains the array
  error: string
}
