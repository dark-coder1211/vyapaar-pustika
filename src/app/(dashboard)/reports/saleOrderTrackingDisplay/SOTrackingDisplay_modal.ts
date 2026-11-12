export interface OrderTrackData {
  SaleOrderDocID: string;
  SaleOrderV_Sno: number;
  SaleOrderNo: string;
  SaleOrderDate: string;
  PartyOrdNo: string;
  PartyOrdDt: string;
  ERPRefNo: string;
  ERPRefDt: string;
  PartyNAme: string;
  ConsigneeName: string;
  DistributorName: string;
  ItemName: string;
  BFName: string;
  GsmName: string;
  SizeReel: number;
  SizeHeight: number;
  SizeUnit: string;
  SaleOrderWeight: number | null;
  WorkOrderWeight: number | null;
  ProductionWeight: number | null;
  dispatchWeight: number | null;
  dispatchBalance: number | null;
  Size: string;
}

export interface OrderTrack {
  success: boolean;
  data: OrderTrackData[];
  error: string
}

export interface SOFilterData {
  StrfromDate: string;
  StrToDate: string;
  StrSaleOrderNo: string;
  StrOrderNoValue: string;
  StrPartyCode: string;
  StrPartyName: string;
  StrDealerCode: string;
  StrDealerName: string;
  StrConsigneeCode: string;
  StrConsigneeName: string;
  StrItemCode: string;
  StrItemName: string;
  StrBFCode: string;
  StrBFName: string;
  StrGSMCode: string;
  StrGSMName: string;
  StrWidth: string;
  StrLength: string;
}
