import type { Alignment } from '@/components/enum/page'

export interface IndentInterface {
  StrDocId?: string | null
  StrV_Type?: string
  StrDescription?: string
  StrV_No?: string
  StrRecId?: string
  V_Date?: string // ISO date string
  StrV_Prefix?: string
  StrReqDocId?: string
  StrReqno?: string
  StrDepartment?: string
  StrDepartmentName?: string
  StrIndenter?: string
  StrIndenterName?: string
  StrSite_Code?: string | number | true | object | null
  StrPreparedBy?: string | null
  U_EntDt?: string // ISO datetime string
  StrU_AE?: string
  StrTransactionType?: string
  StrTransactionTypeName?: string
  StrTansType_Category?: string
  StrCostCenter?: string
  StrCostCenterName?: string
  StrItemcode?: string
  StrItemName?: string
  Remark?: string // Optional remark
  StrModifiedBy?: string | null
  StrHOD?: string | null
  StrHODName?: string | null
  ISAutoIndent?: number // 0 or 1 (assuming boolean stored as number)
}

export interface EditIndentInterfaceDetail {
  RowID?: string
  StrDocId?: string | null
  StrV_Type?: string
  StrRecId?: string
  IntV_SNo?: number
  V_Date?: string // ISO date string
  StrItemcode?: string
  StrItemName?: string
  StrCostCenter?: string
  StrCostCenterName?: string
  StrMake?: string
  StrMakeName?: string
  StrICode?: string
  MinStock?: number
  MaxStock?: number
  Reorder?: number
  StrUnit?: string
  IndQty?: number
  StrRemark?: string // Optional remark
  StrSite_Code?: string | number | true | object | null
  ReqDate?: string // ISO date string
  StrClosed?: string // e.g. "N"
  StrVerifiedBy?: string | null
  VerifiedDate?: string | null // ISO date string or null
  StrApprovedBy?: string | null
  ApprovedDate?: string | null // ISO date string or null
  StrPreVerifiedBy?: string | null
  dblAprQty?: number
  currentStock?: number
}

export type PostFormData = {
  clsIndHeader: IndentInterface[]
  clsIndDetail: EditIndentInterfaceDetail[]
}

export interface AddIndent {
  success: boolean
  data: PostFormData
  error?: string
}

export interface ApiResponse {
  success: boolean
  data: IndentInterface[] // Assuming the data property contains the array
}

export interface ApiResponseDetail {
  success: boolean
  data: EditIndentInterfaceDetail[] // Assuming the data property contains the array
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
