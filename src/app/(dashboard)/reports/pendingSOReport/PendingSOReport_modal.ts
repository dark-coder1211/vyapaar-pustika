export interface PendingOrderData {
  SO_DocId: string
  OrderType: string
  Party: string
  orderno: string
  order_date: string
  PCode: string
  Distributor: string
  DCode: string
  ItemName: string
  ItemCode: string
  SO_Weight: number
  Sale_Weight: number
  PendingWeight: number
  DeliDate: string
  Sale_InvoiceNo: string
  SO_OrdNo: string
  SO_Date: string
  Closed: string
  SizeReel: number
  SizeHeight: number
  SizeUnit: string
  SizeUnitName: string
  GSM: string
  SKU: string
  GSMCode: string
  Ord_V_SNo: number
  BFCode: string
  BF: string
  ConsigneeName: string
  CCode: string
  ProdQty: number | null
  Rate: number
  DelDays: number
  ODateDays: number
  PendingPer: number
  OrderCloseRemark: string
  PartyOrdNo: string
  PartyOrdDt: string
  SO_Reel: string
  Sale_Reel: string
  PendingReel: string
}

export interface PendingOrder {
  success: boolean
  data: PendingOrderData[]
  error: string
}

export interface PSOFilterData {
  StrVDate: string
  StrSaleOrderNo: string
  StrOrderNoValue: string
  StrPartyCode: string
  StrPartyName: string
  StrDealerCode: string
  StrDealerName: string
  StrConsignee: string
  StrConsigneeName: string
  StrItemCode: string
  StrItemName: string
  StrBFCode: string
  StrBFName: string
  StrGSMCode: string
  StrGSMName: string
  StrZoneF: string
  StrZoneValue: string
  StrStatus: string
  StrStatusValue: string
  StrReportFor: string
  StrReportForValue: string
  StrOrderStatus: string
  StrOrderStatusValue: string
  StrSizeUnit: string
  StrSizeUnitValue: string
  StrOrderType: string
  StrOrderTypeValue: string
  StrTransactionType: string
  StrTransactionTypeValue: string
  StrSiteName: string
  StrSiteNameValue: string
  StrWidth: string
}
