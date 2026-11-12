export interface GateEntryInterface {
  strDocId?: string
  strV_Type?: string
  strV_TypeName?: string
  IntV_No?: number | string
  StrV_Date?: string
  IntV_Prefix?: number | string
  StrRecId?: string
  StrV_Time?: string
  StrPartyCode?: string
  StrPartyName?: string
  StrRemark?: string
  StrGateInBy?: string
  StrLoadUnLoad?: string
  StrLoadUnLoadName?: string
  StrVehicleType?: string
  StrVehicleTypeName?: string
  StrVehicleNo?: string
  StrSaleInvNo?: string
  StrWeighYN?: string
  StrWeighYNName?: string
  StrTransporter?: string
  StrTransporterName?: string
  StrDriver?: string
  StrWeighType?: string
  StrWeighTypeName?: string
  StrLabTestDependOn?: string
  StrLabTestDependOnName?: string
  StrStockDependOn?: string
  StrStockDependOnName?: string
  strSite_Code?: string
  strU_EntDt?: string
  strU_AE?: string
  clsGatePassEntryDetail: GateEntryDetailInterface[]
}

export interface GateEntryDetailInterface {
  strDocId?: string
  strItemDesc?: string
  dblQty?: string | number
  StrRemark?: string
}

export interface PostFormData {
  clsSaveGatePassEntry: GateEntryInterface
  clsSaveGatePassDetailEntry: GateEntryDetailInterface[]
}

export interface RecidInterface {
  success: boolean
  data: string
  error: string
}

export interface ApiResponse {
  success: boolean
  data: GateEntryInterface[] // Assuming the data property contains the array
}

export interface ApiResponseDetail {
  success: boolean
  data: GateEntryDetailInterface[] // Assuming the data property contains the array
}

export interface ReportFile {
  FilePath: string;  // The file path where the report is stored
  FileBytes: string; // The Base64-encoded PDF content
}
