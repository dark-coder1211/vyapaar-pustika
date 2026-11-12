import type { Alignment } from '@/components/enum/page'

export interface StockISUHeaderInterface {
  strDocId: string
  strV_Type: string
  strV_TypeDesc: string
  IntV_No: number
  StrV_Date: string
  IntV_Prefix: number
  StrRecId: string
  StrStaff: string
  StrStaffName: string
  StrLocationCode: string
  StrLocationName: string
  StrPlantCode: string
  StrPlantName: string
  StrPreparedBy: string
  StrReqDocId: string
  StrReqNo: string
  clsStoreIssueDetail: StockissueInterfaceDetail[]
}

export interface StockissueInterfaceDetail {
  strDocId: string
  strV_Sno: string
  strManualCode: string
  strItemCode: string
  strMakeCode: string
  strMakeName: string
  dblIssueQty: number
  dblReqQty: number
  dblRate: number
  StrItemDesc: string
  StrItemGroupCode?: string
  StrItemGroupName?: string
  StrLotNo: string
  StrCostCenterDocID: string
  StrCostCenterName: string
  StrReqDocId: string
  StrReqNo: string
  StrGodownCode: string
  StrGodownName: string
  StrRemark: string
  StrDepartmentCode: string
  StrUnit: string
  StrDepartmentName: string
  DblLandedValue: number
  StrIssuedFor: string
  StrIssuedName: string
  StrIssuedType: string
  StrIssuedTypeName: string
  StrPurchaseAccount: string
  StrPurchaseAccountName: string
  StrConsumptionAccount: string
  StrConsumptionAccountName: string
  StrCurrentStock: number
}

export interface ApiResponse {
  success: boolean
  data: StockISUHeaderInterface[] // Assuming the data property contains the array
}

export interface ApiResponseDetail {
  success: boolean
  data: StockissueInterfaceDetail[] // Assuming the data property contains the array
}

export interface RecidInterface {
  success: boolean
  data: string
  error: string
}

export interface AddressBookData {
  Code: string
  Name: string
  CityName: string
  Pin: string
  State: string
  ADD1: string
  ADD2: string
}

export interface ColumnConfig<T> {
  index: number
  label: string
  width: number
  align: Alignment
  visible: boolean
  field: keyof T
}

export interface Product {
  Reqdocid: string
  Reqno: string
  ReqDate: string
}

export interface StoreGetStock {
  StrItemCode: string
  StrItemName: string
  DblBalanceStock: number
  DblMinStock: number
  DblMaxStock: number
  DblReOrder: number
}

export interface GetStockResponse {
  success: boolean
  message: string
  data: StoreGetStock[]
}

// Define the Godown type
export interface Godown {
  GodCode: string
  GodName: string
}
