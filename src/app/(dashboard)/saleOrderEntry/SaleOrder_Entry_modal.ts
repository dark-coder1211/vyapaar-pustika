import type { Dispatch, SetStateAction } from 'react'

export interface DMSSordItemDetailUpdatePostData {
  intdocId: string
  intv_SNo: number | 0 | null
  stritemCode: string
  strItemName: string
  stritemDesc: string
  strbf: string
  strBFValue: string
  dblwidth: number | null
  dbllength: number | null
  strsizeUnit: string
  strgsm: string
  strGsmValue: string
  strgrain: string
  strgrainValue: string
  dblqty: number | 0
  strtl_ExcessPer: string
  dbltl_ExcessQty: number
  dblreel: number | 0
  dblrate: number | null
  dblamount: number | null
  strclosed: string
  dbloh_Amt_Gross: number | null
  dbloh_At_Addition: number | null
  dbloh_Amt_Addition: number | null
  dbloh_At_Discount: number | null
  dbloh_Amt_Discount: number | null
  dbloh_Amt_Net: number | null
  strpldDocId: string
  intpldV_SNo: number
  strpldRateApplicableOn: string
  dbloh_Amt_AgreedRate: number | null
  strcontractSoDocId: string
  intcontractSoV_Sno: number
  intcontractSo_Sno: number
  strsizeUnitName: string
  strPackingType?: string
  strPackingTypeName?: string
  dblCGSTAmt?: number
  dblCGST_Per?: number
  dblSGSTAmt?: number
  dblSGST_Per?: number
  dblIGSTAmt?: number
  dblIGST_Per?: number
  clsItemDmsOH?: clsDMSSordOH[]
}

export interface PriceDetails {
  DblFinalRate: number | null
  DblMRP: number | undefined 
  DblAgreedRate: number | undefined
  StrV_date: string
  Str_RefNo: string
  StrUserCode: string
  StrOrdDocId: string
  IntOrdV_SNo: number | null
  StrPL_DocId: string
  IntPLV_SNo: number | null
  StrRateApplicable: string
  blnPricelistApplicable: boolean | null
}

export interface ContractData {
  DocId: string // Document ID (e.g., "DHOCORD  2024       1")
  OrderNo: string // Order number (e.g., "27120001-HO")
  V_Date: string // Date of order in Unix timestamp format (e.g., "/Date(1735237800000)/")
  Party: string // Party name (e.g., "ANIL PAPERSBANGALORE")
  PartyOrdno: string // Party order number (e.g., "123")
  DelDate: string // Delivery date in Unix timestamp format (e.g., "/Date(1735497000000)/")
  DelAt: string // Delivery location (e.g., "HO1005")
  DelName: string // Delivery name (e.g., "ANIL PAPERS")
  Distributor: string | null // Distributor name, nullable (e.g., null)
  ConCode: string // Contact code (e.g., "HO1005")
  ConName: string // Contact name (e.g., "ANIL PAPERS")
  OrderType: string // Order type (e.g., "R")
  PartyOrdDt: string // Party order date in Unix timestamp format (e.g., "/Date(1735065000000)/")
  Form_Code: string | null // Form code, nullable (e.g., null)
  Form_Desc: string | null // Form description, nullable (e.g., null)
}

export interface Contract {
  success: boolean
  data: ContractData[]
  error: string
}

export interface cosnoData {
  ConCode: string // "HO1005"
  ConName: string // "ANIL PAPERS"
  DelAt: string // "HO1005"
  DelDate: string // "/Date(1735497000000)/"
  DelName: string // "ANIL PAPERS"
  Distributor: string | null // null
  DocId: string // "DHOCORD  2024       1"
  Form_Code: string | null // null
  Form_Desc: string | null // null
  OrderNo: string // "27120001-HO"
  OrderType: string // "R"
  Party: string // "ANIL PAPERSBANGALORE"
  PartyOrdDt: string // "/Date(1735065000000)/"
  PartyOrdno: string // "123"
  V_Date: string // "/Date(1735237800000)/"
  V_SNo: number // 3
  dbllength: number // 0
  dblqty: number | null // 300
  dblreel: number // 0
  dblwidth: number // 0
  strBFValue: string // "0"
  strGsmValue: string // "180"
  strItemName: string // "ICONIC CREMA - (MIX)"
  strbf: string // "HO1"
  strgrain: string // "L"
  strgrainValue: string // "Long"
  strgsm: string // "10"
  stritemCode: string // "HO140"
  stritemDesc: string // "\r\n"
  strsizeUnit: string | null
  strsizeUnitName: string
  AgreRate: number // null
}

export interface cosno {
  success: boolean
  data: cosnoData[]
  error: string
}

export interface ItemNameData {
  Code: string
  Name: string
  ManualCode: string
  SKU: string
  Name1: string
  Name2: string
}

export interface ItemName {
  success: boolean
  data: ItemNameData[]
  error: string
}

export interface BfData {
  code: string
  Name: string
}

export interface Bf {
  success: boolean
  data: BfData[]
  error: string
}

export interface GsmData {
  code: string
  Name: string
}

export interface Gsm {
  success: boolean
  data: GsmData[]
  error: string
}

export interface DMSSordHeader {
  intdocId?: string
  strSite_Code?: string
  strSite_Name?: string
  strV_Type?: string
  intV_No?: number
  strRecId?: string
  strrecIdPrefix?: string
  strV_Date?: string // ISO format date
  intv_Prefix?: number
  strorderType?: string
  strorderTypeName?: string
  strpartyCode?: string
  strpartyName?: string
  strdelAt?: string
  strdelAtName?: string
  strdelDate?: string // ISO format date
  dbloh_Amt_Gross?: number
  dbloh_Amt_Total?: number
  dbloh_Amt_RoundOff?: number
  dbloh_Amt_Net?: number
  dbloh_Amt_Addition?: number
  dblCMN_Addition?: number
  dblCMN_Deduction?: number
  dbloh_Amt_Discount?: number
  strremark?: string
  strconsignee?: string
  strconsigneeName?: string
  strtoPlace?: string
  strdistributor?: string
  strdistributorName?: string
  strtransfered?: string // could be a boolean (true/false)
  strnotification?: string
  strnotificationDate?: string // ISO format date
  intisClosed?: number // could be a boolean (0/1)
  stru_EntDt_LatestLine?: string // ISO format date
  strPreparedBy?: string
  stru_Name?: string
  strapprovedBy?: string
  strapprovedDate?: string // ISO format date
  strcancelledBy?: string
  strcancelledDate?: string // ISO format date
  intwtaCode?: number
  intwtaVSno?: number
  strpartyOrdNo?: string
  strpartyOrdDt?: string // ISO format date
  struserVerifiedBy?: string
  struserVerifiedDate?: string // ISO format date
  strtoplaceCity?: string
  strT_Type?: string
  strT_TypeName?: string
  strholdRemark?: string
  strContractSalesOrder?: string
  strContractSalesOrderValue?: string
  strRemarks?: string
  strToPlaceValue?: string
  strplaceOfSupplyName?: string
  strplaceOfSupply?: string
  strRole?: string

  strConsiaddressbook?: string
  strConsiaddressbookName?: string
  strConsiaddress1?: string
  strConsiaddress2?: string

  strdeladdressbook?: string
  strdeladdressbookName?: string
  strdeladdress1?: string
  strdeladdress2?: string

  strPartyaddressbook?: string
  strPartyaddressbookName?: string
  strPartyaddress1?: string
  strPartyaddress2?: string

  // strOrderNumber?: number;

  // strholdDate?: string,

  strFreightType?: string
  strFreightTypeName?: string
  TansType_Category?: string
  strReviewRemark?: string
  strSalesPersonCode?: string
  strSalesPersonName?: string
  strFormCode?: string
  strFormCodeValue?: string
  dblCGSTAmt?: number
  dblSGSTAmt?: number
  dblIGSTAmt?: number
}

export interface Props {
  isAddModalActive?: boolean
  toggleAddModal?: () => void
  onFormSubmit?: (formData: clsSaleOrderItemDetail) => void
  ordertype?: string
  relatedOrders?: Contract[] // Assuming Contract is the type of objects in the relatedOrders array

  isEditModalActive?: boolean
  toggleEditModal?: () => void
  editItem?: clsSaleOrderItemDetail | null
  editIndex: number | null
  contractDocId: string | undefined
  transTypeCat: string | undefined
  cosono: cosno[]
  setCosono: Dispatch<SetStateAction<cosno[]>>
  StrConsignee: string
  isPriceListApplicable: number
  item: ItemName[]
  setItem: Dispatch<SetStateAction<ItemName[]>>
  bf: Bf[]
  setBf: Dispatch<SetStateAction<Bf[]>>
  gsm: Gsm[]
  setGsm: Dispatch<SetStateAction<Gsm[]>>
  setIsSelect: Dispatch<SetStateAction<boolean>>
  detail: clsSaleOrderItemDetail[]
  setDetail: Dispatch<SetStateAction<clsSaleOrderItemDetail[]>>
  header: clsSaleOrderHeader
  setHeader: Dispatch<SetStateAction<clsSaleOrderHeader>>
  ohList: clsDMSSordOH[]
  setOHList: Dispatch<SetStateAction<clsDMSSordOH[]>>
  fetchOHLineData: () => Promise<void>
}

export interface SizeUnitData {
  Code: string
  Unit: string
}

export interface SizeUnit {
  success: boolean
  data: SizeUnitData[]
  error: string
}

export interface FormData {
  intdocId: string
  intv_SNo: number | 0 | null
  stritemCode: string
  strItemName: string
  stritemDesc: string
  strbf: string
  strBFValue: string
  dblwidth: number | null
  dbllength: number | null
  strsizeUnit: string
  strgsm: string
  strGsmValue: string
  strgrain: string
  strgrainValue: string
  dblqty: number | 0
  strtl_ExcessPer: string
  dbltl_ExcessQty: number | 0
  dblreel: number | 0
  dblrate: number | null
  dblamount: number | null
  strclosed: string
  dbloh_Amt_Gross: number | null
  dbloh_At_Addition: number | null
  dbloh_Amt_Addition: number | null
  dbloh_At_Discount: number | null
  dbloh_Amt_Discount: number | null
  dbloh_Amt_Net: number | null
  strpldDocId: string
  intpldV_SNo: number | 0
  strpldRateApplicableOn: string
  dbloh_Amt_AgreedRate: number | null
  strcontractSoDocId: string
  intcontractSoV_Sno: number | 0
  intcontractSo_Sno: number | 0
  strsizeUnitName: string
  dblCGSTAmt?: number
  dblCGST_Per?: number
  dblSGSTAmt?: number
  dblSGST_Per?: number
  dblIGSTAmt?: number
  dblIGST_Per?: number
}

export interface ApiResponse {
  success: boolean
  data: clsSaleOrderHeader[] // Assuming the data property contains the array
}

export interface ApiResponseDetail {
  success: boolean
  data: clsSaleOrderItemDetail[] // Assuming the data property contains the array
}

// export interface TransactionTypeData {
//   ManualCode: string;
//   Name: string;
//   code: string;
//   TansType_Category: string;

// }

// export interface TransactionType {
//   success: boolean;
//   data: TransactionTypeData[];
//   error: string
// }

export interface TransactionType {
  Code: string
  Name: string
  ManualCode: string
  TansType_Category: string
}

export interface TransactionTypeDataforSale {
  ManualCode: string
  Name: string
  Code: string
  TansType_Category: string
}

export interface TransactionTypeforSale {
  success: boolean
  data: TransactionTypeDataforSale[]
  error: string
}

export interface TypeData {
  Code: string
  Name: string
}

export interface Type {
  success: boolean
  data: TypeData[]
}

export interface IsPriceListResponse {
  statusCode: number
  message: string
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

export interface AddressBook {
  success: boolean
  data: AddressBookData[]
  error: string
}

export interface DeliveryData {
  Code: string
  Name: string
  ManualCode: string
  CityCode: string
  City: string
  State: string
  stateCode: string
  ADD1: string
  ADD2: string
}

export interface Delivery {
  success: boolean
  data: DeliveryData[]
  error: string
}

export interface ConsigneeData {
  Code: string
  Name: string
  ManualCode: string
  CityCode: string
  stateCode: string
  City: string
  State: string
  Address: string
  gsTin: string
  ADD1: string
  ADD2: string
}

export interface Consignee {
  success: boolean
  data: ConsigneeData[]
  error: string
}

export interface ConsigneeDataForSale {
  Address: string
  CityCode: string
  CityName: string
  DISCity: string
  DistributorName: string
  DistributorZone: string
  DistributorCode: string
  GSTINNo: string
  Location: string
  LocationType: string
  ManualCode: string
  Name: string
  SubCode: string
  UTYN: string
  Zone: string
}

export interface PartyDataforSale {
  City: string
  ManualCode: string
  Name: string
  State: string
  Code: string

  ADD1: string
  ADD2: string
  Address: string
  CityCode: string
  gsTin: string
  distributorCode: string
  distributorName: string
}

export interface PartyDataforSaleOrder {
  CityName: string
  DISCity: string
  DistributorName: string | undefined
  DistributorZone: string | undefined
  DistributorCode: string | undefined
  GSTINNo: string
  Location: string
  LocationType: string
  ManualCode: string
  Name: string
  SubCode: string
  UTYN: string
  Zone: string
  Address: string
  CityCode: string
}


export interface PartyforSale {
  success: boolean
  data: PartyDataforSale[]
  error: string
}


export interface OrderTypeForSale {
  Code: string
  Name: string
}


export interface orderNoInterface {
  success: boolean
  data: string
  error: string
}

export interface SiteData {
  Code: string
  Name: string
}

export interface Site {
  success: boolean
  data: SiteData[]
  error: string
}

export interface TCT {
  strTCManualCode: string
  strValue: string
  strTCName: string
  strValue_Code: string
}

export type PostFormData = {
  clsHeader: DMSSordHeader[]
  clsItemDetail: DMSSordItemDetailUpdatePostData[]
  clsTermCondition: TCT[]
  clsDMSMainOH: clsDMSSordOHHeader[]
}

export interface Add_PlaceOrder {
  success: boolean
  message?: string
  data?: PostFormData
  error?: string
}

export interface TCTData {
  success: boolean
  data: TCT[]
}

export interface EnviroData {
  PU_CalcOnChallan: string
  SordDeliveryDays: number
  Barcode_App: string
}

export interface clsDMSSordOH {
  intV_Sno: number
  intSno: number
  strExpCode: string
  Expense: string
  strExpShortCode: string
  dblPer: number
  dblAmount: number
  strFormulaString: string
  Per_SaveIn: string | null
  Amt_SaveIn: string
  FullValue: 'Y' | 'N'
  PerEditable: 'Y' | 'N'
  AmtEditable: 'Y' | 'N'
  SynAcYN: 'Y' | 'N'
  RoundOff: 'Y' | 'N' | null
}

export interface LineOH {
  success: boolean
  data: clsDMSSordOH[]
  error: string
}

export interface clsDMSSordOHHeader {
  // intV_Sno: number
  intSno?: number
  strExpCode?: string
  Expense?: string
  strExpShortCode: string
  dblPer?: number
  dblAmount?: number
  strFormulaString?: string
  Per_SaveIn?: string 
  Amt_SaveIn?: string
  FullValue?: 'Y' | 'N'
  PerEditable?: 'Y' | 'N'
  AmtEditable?: 'Y' | 'N'
  SynAcYN?: 'Y' | 'N' | null
  // RoundOff: 'Y' | 'N'
}

export interface HeaderOH {
  success: boolean
  data: clsDMSSordOHHeader[]
  error: string
}

export interface OHLineProps {
  ohList: clsDMSSordOH[]
  grossamount: number
  Qty: number
  igstper: number
  cgstper: number
  sgstper: number
  rate?: number
  millrate?: number
}

export interface OHHeaderProps<T = any> {
  ohHeaderList: clsDMSSordOHHeader[]
  detail: T[]
  onUpdateHeader: (list: clsDMSSordOHHeader[]) => void
  isPaste?: boolean
}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

export interface clsSaleOrderHeader {
  StrDocID?: string
  StrV_Type?: string
  StrV_TypeDesc?: string
  StrTransactionTypeCode?: string
  StrTransactionTypeName?: string
  StrRecId?: string
  StrV_Date?: string
  StrSiteList_Code?: string
  StrSiteList_Name?: string
  IntV_No?: number
  StrRecIdPrefix?: string
  IntV_Prefix?: number
  StrPartyCode?: string
  StrPartyName?: string
  StrDistributor?: string
  StrDistributorName?: string
  StrSalesPersonCode?: string
  StrSalesPersonName?: string
  strSaleInvoiceV_Type?: string
  StrSaleInvoiceV_TypeDesc?: string
  StrContractSalesOrderDocID?: string
  StrContractSalesOrderNo?: string
  StrPartyOrdNo?: string
  StrPartyOrdDt?: string
  StrConsignee?: string
  StrConsigneeName?: string
  StrPerformaInvoiceDocid?: string
  StrPerformaInvoiceNo?: string
  StrAgainstFormCode?: string
  StrAgainstFormName?: string
  StrExcisableCode?: string
  StrExcisableName?: string
  StrOrderTypeCode?: string
  StrOrderTypeName?: string
  StrDelAt?: string
  StrDelAtName?: string
  StrDelDate?: string
  StrDelDateBeforEdit?: string
  StrToPlace?: string
  StrToPlaceName?: string
  StrPriceListDocID?: string
  StrPriceListNo?: string
  StrPolicyApplyYN?: string
  StrPolicyApplicableOnCode?: string
  strPolicyDocID?: string
  strPolicyNo?: string
  strCurrencyDependOn?: string
  strCurrencyDependOnName?: string
  ImportOrderYN?: string
  StrRevisionNo?: string
  StrTransfered?: string
  strAmendmentOrderDocID?: string
  strAmendmentOrderNo?: string
  IntCreditDays?: number
  StrCurrencyCode?: string
  StrCurrencyName?: string
  StrPreparedBy?: string
  StrModifiedBy?: string
  StrModifiedDate?: string
  StrApprovedBy?: string
  StrApprovedDate?: string
  StrVerifiedBy?: string
  StrVerifiedDate?: string
  StrRemarks?: string
  StrToleranceModifiedBy?: string
  StrToleranceModifiedDate?: string
  StrDiscountBy?: string
  StrDiscountDate?: string
  DblIGSTAMT?: number
  DblCGSTAMT?: number
  DblSGSTAMT?: number
  DblUGSTAMT?: number
  DblCESSAMT?: number
  DblGAmount?: number
  DblTotalAmt?: number
  DblNAmount?: number
  DblROffAmt?: number
  DblAdditionAmt?: number
  DblDiscAmt?: number
  DblTaxableValue?: number
  dblCMN_Addition?: number
  dblCMN_Deduction?: number
  StrGSTApplyYN?: string
  StrPartyZone?: string
  StrSalesPersonManualCode?: string
  StrConsigneeZone?: string
  StrDistributorZone?: string
  StrPriceListDate?: string
  StrRateApplicableOn?: string
  StrPolicyApplyYNName?: string
  StrPolicyApplicableOnName?: string
  StrPreparedDate?: string
  dblInsurance?: number
  dblFreight?: number
  dblServiceValue?: number

  clsSaleOrderItemDetail?: clsSaleOrderItemDetail[]
  clsSaleOrderOH?: clsDMSSordOHHeader[]
  clsTermCondition?: ClsSordTermCondition[]
}

// export interface clsSaleOrderHeader {
//   StrDocID: string
//   StrV_Type: string
//   StrV_TypeDesc: string
//   StrTransactionTypeCode: string
//   StrTransactionTypeName: string
//   StrRecId: string
//   StrV_Date: string
//   StrSiteList_Code: string
//   StrSiteList_Name: string
//   IntV_No: number
//   StrRecIdPrefix: string
//   IntV_Prefix: number
//   StrPartyCode: string
//   StrPartyName: string
//   StrDistributor: string
//   StrDistributorName: string
//   StrSalesPersonCode: string
//   StrSalesPersonName: string
//   strSaleInvoiceV_Type: string
//   StrSaleInvoiceV_TypeDesc: string
//   StrContractSalesOrderDocID: string
//   StrContractSalesOrderNo: string
//   StrPartyOrdNo: string
//   StrPartyOrdDt: string
//   StrConsignee: string
//   StrConsigneeName: string
//   StrPerformaInvoiceDocid: string
//   StrPerformaInvoiceNo: string
//   StrAgainstFormCode: string
//   StrAgainstFormName: string
//   StrExcisableCode: string
//   StrExcisableName: string
//   StrOrderTypeCode: string
//   StrOrderTypeName: string
//   StrDelAt: string
//   StrDelAtName: string
//   StrDelDate: string
//   StrDelDateBeforEdit: string
//   StrToPlace: string
//   StrToPlaceName: string
//   StrPriceListDocID: string
//   StrPriceListNo: string
//   StrPolicyApplyYN: string
//   StrPolicyApplicableOnCode: string
//   strPolicyDocID: string
//   strPolicyNo: string
//   strCurrencyDependOn: string
//   strCurrencyDependOnName: string
//   ImportOrderYN: string
//   StrRevisionNo: string
//   StrTransfered: string
//   strAmendmentOrderDocID: string
//   strAmendmentOrderNo: string
//   IntCreditDays: number
//   StrCurrencyCode: string
//   StrCurrencyName: string
//   StrPreparedBy: string
//   StrModifiedBy: string
//   StrModifiedDate: string
//   StrApprovedBy: string
//   StrApprovedDate: string
//   StrVerifiedBy: string
//   StrVerifiedDate: string
//   StrRemarks: string
//   StrToleranceModifiedBy: string
//   StrToleranceModifiedDate: string
//   StrDiscountBy: string
//   StrDiscountDate: string
//   DblIGSTAMT: number
//   DblCGSTAMT: number
//   DblSGSTAMT: number
//   DblUGSTAMT: number
//   DblCESSAMT: number
//   DblGAmount: number
//   DblTotalAmt: number
//   DblNAmount: number
//   DblROffAmt: number
//   DblAdditionAmt: number
//   DblDiscAmt: number
//   DblTaxableValue: number
//   dblCMN_Addition: number
//   dblCMN_Deduction: number

//   clsSaleOrderItemDetail: clsSaleOrderItemDetail[]
//   clsSaleOrderOH: clsSaleOrderOH[]
//   clsTermCondition: ClsSordTermCondition[]
// }

// export interface clsSaleOrderItemDetail {
//   StrDocID: string
//   Intv_SNo: number
//   StrGoodsServices: string
//   StrGoodsServicesName: string
//   StrClosed: string
//   strOrderCloseRemark: string
//   IntcontractSoV_Sno: number
//   IntCO_ItemRateSNo: number
//   StrItemCode: string
//   StrItemName: string
//   StritemDesc: string
//   StrBf: string
//   StrBFName: string
//   DblWidth: number
//   DblLength: number
//   StrSizeUnit: string
//   StrSizeUnitName?: string
//   DblSizeInch: number
//   DblSizeCm: number
//   StrGrain: string
//   StrGrainName: string
//   StrGsm: string
//   StrGsmName: string
//   StrCorePipeCode: string
//   StrCorePipeName: string
//   DblOuterDIA: number
//   DblInnerDIA: number
//   DblBulk: number
//   DblPerReelWeight: number
//   DblReel: number
//   DblWeightSDU: number
//   StrSDU: string
//   DblConverstionRate: number
//   DblWeight: number
//   DblShortWeight: number
//   Dtrtl_ExcessPer: number
//   Dbltl_ExcessQty: number
//   StrSKU: string
//   DblRate: number
//   DblAmount: number
//   StrLocalCurrencyCode: string
//   StrLocalCurrencyName: string
//   DblRateFC: number
//   DblAmountFC: number
//   DblCurrencyExchangeRate: number
//   StrForeignCurrencyCode: string
//   StrForeignCurrencyName: string
//   DblOrderNetValue: number
//   DblLineDiscount: number
//   DblItemNetAmount: number
//   DblAgreedRate: number
//   StrItemGroupCode: string
//   StrItemGroupName: string
//   strPackingType: string
//   strPackingTypeName: string
//   StrStatus: string
//   StrStatusName: string
//   DblExchangeRate: number
//   DblTaxableValue: number
//   DblItemNetValue: number
//   DblIGST_Per: number
//   DblCGST_Per: number
//   DblSGST_Per: number
//   DblUGST_Per: number
//   DblCess_Per: number
//   DblIGSTAmt: number
//   DblCGSTAmt: number
//   DblSGSTAmt: number
//   DblUGSTAmt: number
//   DblCessAmt: number
//   DblAdditionAmt: number
//   DblDiscAmt: number
//   DblItemValue: number
//   DblServiceValue: number
//   DblInsuranceValue: number
//   DblFreightValue: number

//   clsSaleOrderOHLine: clsDMSSordOH[]
// }

export interface clsSaleOrderItemDetail {
  StrDocID?: string
  Intv_SNo?: number
  StrGoodsServices?: string
  StrGoodsServicesName?: string
  StrClosed?: string
  strOrderCloseRemark?: string
  IntcontractSoV_Sno?: number
  IntCO_ItemRateSNo?: number
  StrItemCode?: string
  StrItemName?: string
  StritemDesc?: string
  StrBf?: string
  StrBFName?: string
  DblWidth?: number
  DblLength?: number
  StrSizeUnit?: string
  // StrSizeUnitName?: string
  DblSizeInch?: number
  DblSizeCm?: number
  StrGrain?: string
  StrGrainName?: string
  StrGsm?: string
  StrGsmName?: string
  StrCorePipeCode?: string
  StrCorePipeName?: string
  DblOuterDIA?: number
  DblInnerDIA?: number
  DblBulk?: number
  DblPerReelWeight?: number
  DblReel?: number
  DblWeightSDU?: number
  StrSDU?: string
  DblConverstionRate?: number
  DblWeight?: number
  DblShortWeight?: number
  Dtrtl_ExcessPer?: number
  Dbltl_ExcessQty?: number
  StrSKU?: string
  DblRate?: number
  DblAmount?: number
  StrLocalCurrencyCode?: string
  StrLocalCurrencyName?: string
  DblRateFC?: number
  DblAmountFC?: number
  DblCurrencyExchangeRate?: number
  StrForeignCurrencyCode?: string
  StrForeignCurrencyName?: string
  DblOrderNetValue?: number
  DblLineDiscount?: number
  DblItemNetAmount?: number
  DblAgreedRate?: number
  StrItemGroupCode?: string
  StrItemGroupName?: string
  strPackingType?: string
  strPackingTypeName?: string
  StrStatus?: string
  StrStatusName?: string
  DblExchangeRate?: number
  DblTaxableValue?: number
  DblItemNetValue?: number
  DblIGST_Per?: number
  DblCGST_Per?: number
  DblSGST_Per?: number
  DblUGST_Per?: number
  DblCess_Per?: number
  DblIGSTAmt?: number
  DblCGSTAmt?: number
  DblSGSTAmt?: number
  DblUGSTAmt?: number
  DblCessAmt?: number
  DblAdditionAmt?: number
  DblDiscAmt?: number
  DblItemValue?: number
  DblServiceValue?: number
  DblInsuranceValue?: number
  DblFreightValue?: number
  DblCorePipeValue?: number

  clsSaleOrderOHLine?: clsDMSSordOH[]
}


export interface clsSaleOrderOH {
  intV_Sno: number
  intSno: number
  strExpCode: string
  Expense: string
  strExpShortCode: string
  dblPer: number
  dblAmount: number
  strFormulaString: string
  Per_SaveIn: string
  Amt_SaveIn: string
  FullValue: string
  PerEditable: string
  AmtEditable: string
  SynAcYN: string
}

export interface clsSaleOrderOHLine {
  intV_Sno: number
  intSno: number
  strExpCode: string
  Expense: string
  strExpShortCode: string
  dblPer: number
  dblAmount: number
  strFormulaString: string
  Per_SaveIn: string
  Amt_SaveIn: string
  FullValue: string
  PerEditable: string
  AmtEditable: string
  SynAcYN: string
}

export interface ClsSordTermCondition {
  strTCManualCode: string
  strValue: string
  strValue_Code: string
  strTCName: string
}

export interface ToPlaceHelpInterface {
  CityCode: string
  CityName: string
  State: string
}

export interface ExcisableInterface {
  Code: string
  Name: string
}

export interface NotificationInterface {
  intdocId: number
  Intv_SNo: number
  strmsg: string
  stru_EntDt: string
}
