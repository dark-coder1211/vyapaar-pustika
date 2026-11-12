

export interface RecidInterface {
  success: boolean;
  data: string;
  error: string
}

// export interface VisitorGatePass {
//   GateOutBy: string;
//   DocId: string;
//   V_Type: string;
//   V_No: string;
//   V_Date: string;          // formatted date dd/MMM/yyyy
//   V_Prefix: string;
//   InTime: string;
//   OutDate: string;  // formatted date dd/MMM/yyyy
//   OutTime: string;
//   Purpose: string;
//   Name: string;
//   Address: string;
//   CityCode: string;
//   CityName: string;
//   PhMob: string;
//   PersonToMeet: string;
//   Vehicle: string;
//   Site_Code: string;
//   PreparedBy: string;
//   ModifiedBy: string;
//   U_EntDt: string;  // formatted date dd/MMM/yyyy
//   U_AE: string;
//   RecId: string;
//   GateOut: boolean;   // for checkbox UI

// }

export interface VisitorGatePass {
  strDocId: string;
  strV_Type: string;
  IntV_No: number;
  StrV_Date: string;
  IntV_Prefix: number;
  StrRecId: string;
  StrInTime: string;
  StrPurpose: string;
  StrName: string;
  StrAddress: string;
  StrCity: string;
  StrCityName: string;
  StrPhMob: string;
  StrPersonToMeet: string;
  StrVehicle: string;
  StrPreparedBy: string;
}



export interface VGPApiResponse {
  success: boolean
  data: PostFormData // Assuming the data property contains the array
  error?: string

}

export type PostFormData = {
  clsVisitoGatePassEntry: VisitorGatePass[]
}
