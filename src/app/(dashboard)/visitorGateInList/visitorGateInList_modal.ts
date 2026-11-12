export interface MTD {
  strDocId: string
  strV_Type: string
  IntV_No: number
  StrV_Date: string
  IntV_Prefix: number
  StrRecId: string
  StrInTime: string
  StrPurpose: string
  StrName: string
  StrAddress: string
  StrCity: string
  StrCityName: string
  StrPhMob: string
  StrPersonToMeet: string
  StrVehicle: string
  StrPreparedBy: string
  GateOut?: boolean // optional since not present in JSON
}

export interface VGPIn {
  success: boolean
  data: MTD[]
  message: string
}

export interface VisitorGateOutDetail {
  strDocId: string
  strOutDate: string
  StrOutTime: string
  StrOutByUser: string
}

export interface ReportFile {
  FilePath: string // The file path where the report is stored
  FileBytes: string // The Base64-encoded PDF content
}
