export interface OrderStatusData {
  docid: number;
  partyOrdNo: string;
  pOdate: string;
  pOrderNo: string;
  erpRefNo: string | null;
  erpRefDate: string | null;
  partyname: string;
  status: string;
  VerifiedBy: string | null;
  v_No: string;
  v_Type: string;
  ConsigneeName: string;
  ordqty: number | null;
  notification: string | null;
  notificationDate: string | null;
  toPlaceCode: string;
  toPlace: string;
  orderType: string;
}

export interface OrderStatus {
  success: boolean;
  data: OrderStatusData[];
  error: string
}

export interface DeleteOrderResponse {
  success: boolean;
  responseText: string;
  error?: string;
}

export interface PartyDataforSale {
  City: string;
  ManualCode: string;
  Name: string;
  State: string;
  Code: string;

  ADD1: string;
  ADD2: string;
  Address: string;
  CityCode: string;
  gsTin: string;
  distributorCode: string;
  distributorName: string;
}

export interface PartyforSale {
  success: boolean;
  data: PartyDataforSale[];
  error: string
}

export interface ReportFile {
  FilePath: string;  // The file path where the report is stored
  FileBytes: string; // The Base64-encoded PDF content
}

export interface OrderStatusParams {
  StrFromDate: string
  StrToDate: string
}

export interface DeleteOrderParams {
  UserName: string | null
  Site_Code: string | null
  companyid: string | null
  clientId: number
  LinkCode?: string | number | true | object
  StrToken: string | number | true | object
  clientCode: string | number | true | object
  bu: string | null
}
