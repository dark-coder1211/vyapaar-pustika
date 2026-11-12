import type  { clsDMSSordOH, clsSaleOrderItemDetail } from '@/app/(dashboard)/saleOrderEntry/SaleOrder_Entry_modal'
import type { Alignment } from '@/components/enum/page'



export interface MultiHelpProps<T> {
  defaultSearch?: string
  open: boolean
  onClose: () => void
  onSelect: (selectedItem: any) => void
  fetchItems: () => Promise<any[]>
  columnsConfig: ColumnConfig<T>[] // Use the generic type here
  title: string
  searchField?: keyof T
}

export interface OHHeaderProps<T> {
  fetchItems: () => Promise<any[]>
  columnsConfig: ColumnConfig<T>[] // Use the generic type here
}

export interface OHLineProps<T> {
  defaultSearch?: string
  open: boolean
  onClose: () => void
  fetchItems: () => Promise<any[]>
  columnsConfig: ColumnConfig<T>[] // Use the generic type here
  title: string
}

export interface ShowHeaderOHProps<T> {
  open: boolean
  onClose: () => void
  fetchItems: () => Promise<T[]>
  columnsConfig: ColumnConfig<T>[]
  title: string
  dialogWidth?: string
  selectedItem?: T // Add this line
}

export interface POReportinterface {
  Orddate: string // Date in the format "/Date(timestamp)/"
  Ordno: string // Order Number
  party: string // Supplier or Vendor Name
  Item: string // Item description
  make: string | null // Item make, can be null
  OrdQty: number // Ordered Quantity
  Closed: string | null // Status of the order (Closed or null)
  RecQty: number // Quantity sold (default is 0)
  unit: string // Unit of measurement
  Vtype: string // Voucher Type (POGST for purchase orders, etc.)
  DocId: string // Document ID for the transaction
  Pending: number // Pending Quantity
  GroupByField: string // Any field to group by, empty by default
  Rate: number // Price per item
  TransactionType: string // Type of transaction (e.g., Opex-PM4-ELC)
}

export interface SOTrackingDispInterface {
  DocId: string // Document ID
  V_Prefix: number // Voucher Prefix
  SOV_SNo: number // Serial Number
  SaleV_SNo: number | null // Sale Voucher Serial Number (null if not available)
  OrderNo: string // Order Number
  OrderDate: string // Date in the format "/Date(timestamp)/"
  PartyOrdNo: string // Party's Order Number
  PartyOrdDt: string // Party's Order Date
  Distributor: string // Distributor code
  DealerName: string // Name of the dealer
  PartyCode: string // Party Code
  Consignee: string // Consignee code
  DelAt: string // Delivery location
  PartyName: string // Supplier or Vendor Name
  ConsigneeName: string // Consignee Name
  DeliveryAt: string // Delivery Location
  Zone: string // Zone (e.g., NORTH ZONE)
  ItemCode: string // Item Code
  ItemName: string // Item Name
  SizeUnit: string // Unit of measurement (e.g., Inch)
  BF: string // Some field value (BF)
  GSM: string // GSM (e.g., 120)
  BFName: string // Field BF Name
  GSMName: string // Field GSM Name
  SizeReel: number // Reel size
  SizeHeight: number // Reel height
  OrdQty: number // Ordered Quantity
  TransactionType: string // Type of transaction (e.g., Kraft Paper)
  InvoiceNo: string | null // Invoice number (null if not available)
  InvoiceDate: string | null // Invoice date (null if not available)
  InvoiceQty: number | null // Invoice quantity (null if not available)
  Site_Code: string // Site code
  SOV_Type: string // SOV type (e.g., WSOGS)
  SaleV_Type: string | null // Sale Voucher Type (null if not available)
  SaleV_Prefix: string | null // Sale Voucher Prefix (null if not available)
  SaleDocId: string | null // Sale Document ID (null if not available)
  SaleSite_Code: string | null // Sale Site Code (null if not available)
}

export interface RRFilterData {
  FromDate: string
  ToDate: string
  Itemcode: string
  ItemName: string
  ItemGroupcode: string
  ItemGroupName: string
  departmentname: string
  departmentcode: string
  sitecode: string
  sitename: string
}

export interface GateInL {
  FromDate: string
  ToDate: string
}

export interface GateInU {
  FromDate: string
  ToDate: string
}

export interface HeaderOHData {
  Vtype: string
  SNo: number
  ExpCode: string
  Per: number
  Account: string | null
  ContraExp: string
  ExpType: string
  CalcOn: string | null
  OnAmt: number | null
  FormulaString: string
  DrCr: string
  Per_SaveIn: string | null
  Amt_SaveIn: string
  TableName: string
  PerEditable: 'Y' | 'N'
  AmtEditable: 'Y' | 'N'
  AcEditable: 'Y' | 'N'
  FullValue: 'Y' | 'N'
  RoundOff: 'Y' | 'N'
  CalLValOn: 'Y' | 'N'
  UniqueId: string
  MandatoryPer: 'Y' | 'N'
  MandatoryAmt: 'Y' | 'N'
  Transfered: string | null
  TransferDt: string | null
  TDSDeductFrom: 'Y' | 'N'
  TDSCategory: string | null
  IsSync: number
  Expense: string
  HeadSN: string
  ACName: string | null
  Amount: number
  MA_YN: 'Y' | 'N'
  ActualFormula: string
  ExcludeFormula: string
  IsMandatoryAmt: 'Y' | 'N'
  IsMandatoryPer: 'Y' | 'N'
  TDSCategoryName: string | null
}

export interface HeaderOH {
  success: boolean
  data: HeaderOHData[]
  error: string
}

export interface LineOHData {
  Vtype: string
  SNo: number
  ExpCode: string
  Per: number
  ExpType: string
  CalcOn: string | null
  OnAmt: number | null
  FormulaString: string
  Per_SaveIn: string | null
  Amt_SaveIn: string
  TableName: string
  PerEditable: 'Y' | 'N'
  AmtEditable: 'Y' | 'N'
  FullValue: 'Y' | 'N'
  RoundOff: 'Y' | 'N'
  MandatoryPer: 'Y' | 'N'
  MandatoryAmt: 'Y' | 'N'
  Transfered: string | null
  Ac_SaveIn: string
  Exp_SaveIn: string
  ExpText: string | null
  ExpEditable: 'Y' | 'N'
  SynAcYN: 'Y' | 'N'
  IsSync: number
  Expense: string
  HeadSN: string
  Account: string | null
  ACName: string | null
  Amount: number
  IsMandatoryAmt: 'Y' | 'N'
  IsMandatoryPer: 'Y' | 'N'
  ExpText1: string | null
  SynAcYN1: 'Y' | 'N'
}

export interface LineOH {
  success: boolean
  data: LineOHData[]
  error: string
}

export interface OrderTrackData {
  SaleOrderDocID: string
  SaleOrderV_Sno: number
  SaleOrderNo: string
  SaleOrderDate: string
  PartyOrdNo: string
  PartyOrdDt: string
  ERPRefNo: string
  ERPRefDt: string
  PartyNAme: string
  ConsigneeName: string
  DistributorName: string
  ItemName: string
  BFName: string
  GsmName: string
  SizeReel: number
  SizeHeight: number
  SizeUnit: string
  SaleOrderWeight: number | null
  WorkOrderWeight: number | null
  ProductionWeight: number | null
  dispatchWeight: number | null
  dispatchBalance: number | null
  Size: string
}

export interface OrderTrack {
  success: boolean
  data: OrderTrackData[]
  error: string
}

// export interface IndentInterface {
//   Docid?: string;
//   V_Type?: string;
//   Description?: string;
//   IndNO?: number;
//   IndDt?: string;
//   ReqDocId?: string;
//   Reqno?: string;
//   DeptCode?: string;
//   Department?: string;
//   Indentercode?: string; // ISO format date
//   IndenterName?: string; // ISO format date
//   Transactiontype?: number;
//   transactionTypeName?: string;
//   HOD?: string;
//   HODName?: string;
//   Item: string;
//   Itemcode: string;
//   icode?: string;
//   Make?: string;
//   RowID?: string;
//   MinStock?: string;
//   MaxStock?: string; // ISO format date
//   ReOrder?: number;
//   ReqQty?: number;
//   IndQty?: number;
//   Sku?: string;
//   CostCentreCode: string;
//   CostCentre?: string;
//   ReqDate?: string;
//   Remark?: string
// }

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

export interface ReportFile {
  FilePath: string // The file path where the report is stored
  FileBytes: string // The Base64-encoded PDF content
}

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
  StrSite_Code?: string | number | true | object
  StrPreparedBy?: string
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
  StrSite_Code?: string | number | true | object
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

export type PostPOFormData = {
  clsHeader: POInterface[]
  clsItemDetail: PoDetailInterface[]
  clsPordNotification: clsPordNotification[]
  clsMainOH: clsPordOH[]
  clsTermCondition: ClsPordTermCondition[]
}

export interface AddPO {
  success: boolean
  data: PostPOFormData
  error?: string
}

export type PostReqFormData = {
  clsRequHeader: ReqInterface[]
  clsRequDetail: EditReqInterfaceDetail[]
}

export interface AddRequisition {
  success: boolean
  data: PostReqFormData
  error?: string
}

// export interface EditIndentInterfaceDetail {
//   RowID?: string;
//   Item: string;
//   Itemcode: string;
//   icode?: string;
//   Make?: string;
//   MinStock?: string;
//   MaxStock?: string; // ISO format date
//   ReOrder?: number | null;
//   ReqQty?: number | null;
//   IndQty?: number | null;
//   Sku?: string;
//   CostCentreCode: string;
//   CostCentre?: string;
//   ReqDate?: string;
//   Remark?: string
// }

export interface ApiResponse {
  success: boolean
  data: IndentInterface[] // Assuming the data property contains the array
}

export interface ApiResponseDetail {
  success: boolean
  data: EditIndentInterfaceDetail[] // Assuming the data property contains the array
}

// export interface ReqInterface {
//   Docid?: string;
//   V_Type?: string;
//   Description?: string;
//   Category?: string;
//   V_No?: string;
//   V_prefix?: string;
//   ReqNO?: string;
//   ReqDt?: string;
//   DeptCode?: string;
//   Department?: string;
//   ReqByCode?: string;
//   ReqBy?: string;
//   Itemcode?: string;
//   Item?: string;
//   Makecode?: string;
//   Make?: string;
//   ReqQty?: number;
//   Sku?: string;
//   CostCentreCode?: string;
//   CostCentre?: string;
//   DesignationCode?: string;
//   Designation?: string;
//   Remark?: string;
//   ReqOnDate?: string;
//   Site_Code?: string;
//   PreparedBy?: string;
//   ModifiedBy?: string;
//   U_EntDt?: string;
//   U_AE?: string;
// }

export interface ReqInterface {
  strDocId?: string
  strRecId?: string
  strV_No?: string
  strV_Date?: string
  strV_Type?: string
  strV_TypeName?: string
  strV_Prefix?: string
  strDepartmentCode?: string
  strDepartment?: string
  strReqCode?: string
  strReqBy?: string
  strPreparedBy?: string
  strModifiedBy?: string
  strDesignation?: string
  strApprovalId?: string
  strVerifiedBy?: string
  strVerifiedDate?: string
  strApprovedDate?: string
  strApprovedBy?: string
  strApprovalStatus?: string
  strSite_Code?: string
  strU_EntDt?: string
  strU_AE?: string
  strTransfered?: string
}

// export interface EditReqInterfaceDetail {
//   RowID?: string;
//   Itemcode?: string;
//   Item?: string;
//   Makecode?: string;
//   Make?: string;
//   ReqQty?: number;
//   Sku?: string;
//   CostCentreCode?: string;
//   CostCentre?: string;
//   Remark?: string;
//   ReqOnDate?: string;
//   DesignationCode?: string;
//   Designation?: string;
// }

export interface EditReqInterfaceDetail {
  RowID?: string
  strDocId?: string
  strRecId?: string
  strV_No?: string
  strV_Sno?: number
  strV_Date?: string
  strV_Type?: string
  strV_TypeName?: string
  strItemCode?: string
  strItem?: string
  strMakeCode?: string
  strMakeName?: string
  strSKU?: string
  strReqQty?: number
  strReqDate?: string
  strCCCode?: string
  strCostCenter?: string
  strRemark?: string
  strClosed?: string
  strSite_Code?: string
  currentStock?: number
}

export interface ReqApiResponse {
  success: boolean
  data: ReqInterface[] // Assuming the data property contains the array
  error: string
}

export interface ReqApiResponseDetail {
  success: boolean
  data: EditReqInterfaceDetail[] // Assuming the data property contains the array
  error: string
}

export interface POInterface {
  strDocId?: string
  strV_Type?: string
  strV_TypeDesc?: string
  intV_No?: number
  strRecId?: string
  strV_Date?: string
  strV_Prefix?: string
  strPartyCode?: string
  strPartyName?: string
  strDistributor?: string
  strLocation?: string
  strCurrencyCode?: string
  strCurrencyCodeName?: string
  strQuotDocId?: string
  strQuotNo?: string
  strIndDocId?: string
  strIndNo?: string
  strAmdOrdDocId?: string
  strRefDate?: string
  strRefNo?: string
  strRemark?: string
  strTerms?: string
  strRemark_2?: string
  dblGAmount?: number
  dblExciseAmt?: number
  dblCessAmt?: number
  dblEduCessAmt?: number
  dblSHCessAmt?: number
  dblTaxAmt?: number
  dblTotalAmt?: number
  dblROffAmt?: number
  dblNAmount?: number
  strSite_Code?: string | number | true | object
  strApprovedBy?: string
  strPreparedBy?: string
  strModifiedBy?: string
  strU_EntDt?: string
  strU_AE?: string
  strTransfered?: string
  strDocGUID?: string
  dblCMN_Addition?: number
  dblCMN_Deduction?: number
  strVerifiedBy?: string
  strApprovedDate?: string
  dblAdditionAmt?: number
  dblPackFwdAmt?: number
  dblDiscAmt?: number
  dblFreight?: number
  dblInsurance?: number
  dblServiceValue?: number
  dblTaxableValue?: number
  dblCGSTAmt?: number
  dblSGSTAmt?: number
  dblUGSTAmt?: number
  dblIGSTAmt?: number
  strAgtForm?: string
  strAgtFormName?: string
  strVerifiedDate?: string
  strDocumentVPrefix?: string
  strDocumentFormat?: string
  strDocumentVoucherNo?: string
  dblCurrRateInr?: number
  strToleranceBy?: string
  strToleranceDate?: string
  strApprovalID?: string
  strTransactionType?: string
  strTransactionTypeName?: string
  strApprovalStatus?: string
  strFMID?: string
  strCurrencyDependOn?: string
  strRevNo?: string
  strAmdOrdRecId?: string
  intCreditDays?: number
  strUpdateSupplierUserName?: string
  strUpdateSupplierDate?: string
  strFromWeb?: string
}

export const getDefaultPO = (): POInterface => ({
  strDocId: '',
  strV_Type: '',
  strV_TypeDesc: '',
  intV_No: 0,
  strRecId: '',
  strV_Date: new Date().toISOString().split('T')[0], // today's date
  strV_Prefix: '',
  strPartyCode: '',
  strPartyName: '',
  strDistributor: '',
  strLocation: '',
  strCurrencyCode: '',
  strCurrencyCodeName: '',
  strQuotDocId: '',
  strQuotNo: '',
  strIndDocId: '',
  strIndNo: '',
  strAmdOrdDocId: '',
  strRefDate: '', // cleared as needed
  strRefNo: '',
  strRemark: '',
  strTerms: '',
  strRemark_2: '',
  dblGAmount: 0,
  dblExciseAmt: 0,
  dblCessAmt: 0,
  dblEduCessAmt: 0,
  dblSHCessAmt: 0,
  dblTaxAmt: 0,
  dblTotalAmt: 0,
  dblROffAmt: 0,
  dblNAmount: 0,
  strSite_Code: '',
  strApprovedBy: '',
  strPreparedBy: '',
  strModifiedBy: '',
  strU_EntDt: new Date().toISOString(),
  strU_AE: '',
  strTransfered: '',
  strDocGUID: '',
  dblCMN_Addition: 0,
  dblCMN_Deduction: 0,
  strVerifiedBy: '',
  strApprovedDate: '',
  dblAdditionAmt: 0,
  dblPackFwdAmt: 0,
  dblDiscAmt: 0,
  dblFreight: 0,
  dblInsurance: 0,
  dblServiceValue: 0,
  dblTaxableValue: 0,
  dblCGSTAmt: 0,
  dblSGSTAmt: 0,
  dblUGSTAmt: 0,
  dblIGSTAmt: 0,
  strAgtForm: '',
  strAgtFormName: '',
  strVerifiedDate: '',
  strDocumentVPrefix: '',
  strDocumentFormat: '',
  strDocumentVoucherNo: '',
  dblCurrRateInr: 0,
  strToleranceBy: '',
  strToleranceDate: '',
  strApprovalID: '',
  strTransactionType: '',
  strTransactionTypeName: '',
  strApprovalStatus: '',
  strFMID: '',
  strCurrencyDependOn: '',
  strRevNo: '',
  strAmdOrdRecId: '',
  intCreditDays: 0,
  strUpdateSupplierUserName: '',
  strUpdateSupplierDate: '',
  strFromWeb: 'Y'
})

export interface POApiResponse {
  success: boolean
  data: POInterface[] // Assuming the data property contains the array
  error: string
}

export interface POApiResponseDetail {
  success: boolean
  data: PoDetailInterface[] // Assuming the data property contains the array
  error: string
}

export interface StrucIndentResponseDetail {
  success: boolean
  data: StrucIndent[] // Assuming the data property contains the array
  error: string
}

export interface StrucQcResponseDetail {
  success: boolean
  data: StrucQCNew[] // Assuming the data property contains the array
  error: string
}

export interface TCT {
  strTCManualCode: string
  strValue: string
  strTCName: string
  strValue_Code: string
}

export interface TermsAndConditionsProps {
  TCT: TCT[]
  onTCTChange: (index: number, value: string) => void
  title?: string
}

export interface TCTData {
  success: boolean
  data: TCT[]
}

export interface StrucTolerance {
  Int_Tl_Shortage: number
  Int_TL_Excess: number
}

export interface StrucQCNew {
  StrImpCode: string
  StrImpName: string
  DBlRange1: number
  DBlRange2: number
  StrRangeInfo: string
  StrFormulaQty: string
  StrFormulaAMt: string
  StrFormulaDeduction: string
  strStrUnit: string
  DblStdValue: number
  DblTolrencePlus: number
  DblTolrenceNegative: number
  DblDeductionOn: number
  DblRejectOn: number
  StrOnAboveBelow: string
  StrNetWeightCalcYN: string
  StrDed_ASpersheet: string
  StrRejectYn: string
  StrBillPurityYn: string
  StrDeductionCalcOn: string
  SNo: number
}

export interface StrucIndent {
  StrDocId?: string
  StrItemCode?: string
  StrItemName?: string
  StrIndDocId?: string
  StrIndNo?: string
  StrIndDate?: string
  StrIndCostCenter?: string
  StrIndCostCenterName?: string
  StrPOCostCenter?: string
  StrPOCostCenterName?: string
  StrSiteCode?: string
  StrMode?: string
  DblOrdQty?: number
  DblCancelQty?: number
  DblIndQty?: number
  DblAdjQty?: number
  intVSNo?: number
  intIndV_SNo?: number
  intSNo?: number
  StrDefaultIndednt?: string
}

export interface StructParameter {
  StrSpeciCode: string
  StrSpeciName: string
  StrDefaultValue: string
  StrOrderValue: string
  StrRequiredValue: string
}

export interface ClsPordTermCondition {
  strTCManualCode: string
  strValue: string
  strValue_Code: string
}

export interface clsPordNotification {
  intdocId: number
  Intv_SNo: number
  strmsg: string
  stru_EntDt: string
}

export interface clsPordOH {
  intSno: number
  strExpShortCode: string
  dblPer: number
  dblAmount: number
  strFormulaString: string
}

export interface PoDetailInterface {
  RowID?: string
  strDocId?: string
  strV_Type?: string
  intRecId?: number
  intV_SNo?: number
  strV_Date?: string
  strItemCode?: string
  strItemDesc?: string
  strItmDsc?: string
  strManualCode?: string
  strMake?: string
  strMakeName?: string
  dblQtySKU?: number
  dblOrdQty?: number
  dblTL_ShortageQty?: number
  dblTL_ExcessQty?: number
  strUnit?: string
  strUnitName?: string
  strSKU?: string
  dblRate?: number
  LRate?: number
  dblAmount?: number
  strReqDate?: string
  strRemark?: string
  dblDisc?: number
  dblExciseAmt?: number
  dblCessAmt?: number
  dblEduCessAmt?: number
  dblSHCessAmt?: number
  dblTaxAmt?: number
  blnClosed?: boolean
  strSite_Code?: string
  dblDiscAmt?: number
  dblIGST_Per?: number
  dblIGSTAmt?: number
  dblUGST_Per?: number
  dblUGSTAmt?: number
  dblCGST_Per?: number
  dblCGSTAmt?: number
  dblSGST_Per?: number
  dblSGSTAmt?: number
  dblAdditionAmt?: number
  dblPackFwdAmt?: number
  dblDiscPer?: number
  dblPackFwdPer?: number
  dblFreightPer?: number
  dblFreight?: number
  dblInsurance?: number
  dblInsuPer?: number
  dblServiceValue?: number
  dblTaxableValue?: number
  dblCessPer?: number
  dblItemNetValue?: number
  dblItemValue?: number
  dblAdditionPer?: number
  strGoodsServices?: string
  strCloseRemark?: string
  strPIDocId?: string
  intPIV_SNo?: number
  dblFcRate?: number
  dblPIQty?: number
  dblExchangeRate?: number
  dblFCAmount?: number
  strLocalCurrency?: string
  strForeignCurrency?: string

  // Related structures - optional, can define interfaces for them if needed
  clsItemOH?: clsPordOH[]
  StructParameter?: StructParameter[]
  clsIndent?: StrucIndent[]
  clsQcNew?: StrucQCNew[]
  clsTolerance?: StrucTolerance[]
}

export interface PartyData {
  SubCode: string
  Name: string
  ManualCode: string
  City: string
  CityCode: number
  stateCode: number
  State: string
  Nature: string
  GSTINNo: string
}

export interface OrderData {
  DocId: string
  RecId: string
}

// export interface TypeData {
//   Code: string;
//   Name: string;
//   Width: string;
//   Length: string
// }

// Define the type for the option object
export interface Option {
  value: string
  label: string
}

// Define the type for the filter object
export interface POFilterData {
  StrOrderNo: string
  StrOrderNoValue: string
  StrPartyCode: string
  StrPartyName: string
  StrItemCode: string
  StrItemName: string
  StrItemGroup: string
  StrItemGroupName: string
  StrItemCat: string
  StrItemCatName: string
  StrTransactionType: string
  StrTransactionTypeValue: string
  StrSiteName: string
  StrSiteNameValue: string
  StrAsOnDate: string
}

export interface SOFilterData {
  StrfromDate: string
  StrToDate: string
  StrSaleOrderNo: string
  StrOrderNoValue: string
  StrPartyCode: string
  StrPartyName: string
  StrDealerCode: string
  StrDealerName: string
  StrConsigneeCode: string
  StrConsigneeName: string
  StrItemCode: string
  StrItemName: string
  StrBFCode: string
  StrBFName: string
  StrGSMCode: string
  StrGSMName: string
  StrWidth: string
  StrLength: string
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

export interface ColumnConfig<T> {
  index: number
  label: string
  width: number
  align: Alignment
  visible: boolean
  field: keyof T
  className?: string // Add className as an optional field
}

export interface Reciddata {
  Code: string
}

export interface RecidInterface {
  success: boolean
  data: string
  error: string
}

export interface Product {
  Reqdocid: string
  Reqno: string
  ReqDate: string
}

export interface ItemOption {
  Code: string
  Name: string
  ManualCode: string
  SKU: string
  Skucode: string
  ItemGroup: string
  ItemCat: string
  MinStock: number
  maxStock: number
  Reorder: number
  ItemDesc: string
  LeadDays: number
  LRate: number
  HSN: string
}

export interface GateNoType {
  GateEntryDate: string
  GateEntryDocID: string
  GateEntryNo: string
  LabTestDependOn: string | null
  LabTestDependOnName: string 
  PartyName: string
  Partycode: string
  StockDependOn : string | null
  StockDependOnName : string
}


export interface CostCenter {
  Code: string
  Name: string
  ManualCode: string
}

export interface Party {
  SubCode: string
  Name: string
  Designation: string
  DistributorName: string
  Location: string
  ManualCode: string
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

export interface Supplier {
  SubCode: string
  Name: string
  Designation: string
  DistributorName: string
  Location: string
  ManualCode: string
  GSTINNo: string
  City: string
  Address: string
}

export interface AgainstForm {
  Form_Code: string
  Form_Desc: string
  Tax_Per: number
}

export interface PendingIndentHelp {
  IndentDocID: string
  IndentNo: string
  DATE: string
}

export interface FilterComponentProps {
  searchTerm?: string
  StrAsOnDate?: string
  StrFromDate?: string
  StrToDate?: string
  selectedParty: string
  selectedPendingorder?: string
  parties: PartyDataforSale[]
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAsOnDateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFromDateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onToDateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPartyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onPendingOrderChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void

  onFilter?: () => void
  onAddOrder: () => void
  data?: any[] // Data passed from parent (to be displayed in the table)
  columns?: any[] // Columns passed for the table
  filename?: string
  sheetName?: string
  reportTitle?: string
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

export interface SaleReportInterfaceData {
  Driver: null
  docID: string
  V_SNo: number
  V_Type: string
  date: string
  invoiceNo: string
  billQty: number
  billAmount: number
  itemName: string
  itemQty: number
  itemAmount: number
  sno: number
  partyName: string
  consignee: string
  bfName: string
  gsmName: string
  SizeUnit: string
  width: number
  length: number
  rate: number
  pOdate: string
}

export interface SaleReportInterface {
  success: boolean
  data: SaleReportInterfaceData[]
  error: string
}

export interface OrderStatusData {
  docid: number
  partyOrdNo: string
  pOdate: string
  pOrderNo: string
  erpRefNo: string | null
  erpRefDate: string | null
  partyname: string
  status: string
  VerifiedBy: string | null
  v_No: string
  v_Type: string
  ConsigneeName: string
  ordqty: number | null
  notification: string | null
  notificationDate: string | null
  toPlaceCode: string
  toPlace: string
  orderType: string
}

export interface OrderStatus {
  success: boolean
  data: OrderStatusData[]
  error: string
}

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
  Size: string
}

export interface PendingOrder {
  success: boolean
  data: PendingOrderData[]
  error: string
}

export interface ProductType {
  Code: string
  Name: string
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

export interface EnquiryType {
  ncat: string
  Category: string
  V_Type: number
  Description: string
}

export interface CustomerPrevEnquiryDetail {
  IntdocId: string // 64-bit integer (Int64 in C#)
  strV_Type: number // Integer
  IntV_No: number // Integer
  StrRecIdPrefix: string // String
  StrRecId: string // String
  IntV_Prefix: number // Integer
  StrV_Date: string // String (date represented as a string)
  StrCutomerName: string // String (note: it seems like there's a typo, it should be "CustomerName")
  StrPhone: string // String     // New field for phone name
  StrMobile: string // String
  StrGsTin: string // String
  StrGstinDate: string // String (date represented as a string)
  StrCityCode: string // String (city code is represented as a string)
  StrAdd1: string // String (address line 1)
  StrAdd2: string // String (address line 2)
  StrEmail: string // String
  IntStatusCode: number // Integer
  IntProductType: number // Integer
  StrEnquiry: string // String
  StrRemark: string // String
  StrFilterRemark: string // String
  StrPriceList: string // String (comma-separated values or other formatted string)
  IntSubCode: number // Integer
  strStateCode: string
  StrStateName: string
  strSalesEnquiryNo: string
  StrCityName: string
  CountryName: string
  Site_Name: string
  ProductTypeName: string
  description: string
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

export interface SearchFilterListDetails {
  GroupName: string
  ItemCategoryName: string
  ItemCode: string
  ItemName: string
  PartyName: string
  PriceListName: string
  SiteName: string
  SubCode: string
  UnitName: string
  applicableFrom: Date
  applicableTo: Date
  cmn_Addition: number
  cmn_Deduction: number
  entryFrom: number
  entryFromNature: number
  estdLandedRate: number
  fromBfCode: number
  fromGsmCode: number
  nature: number
  priceListCode: number
  priceListType: number
  priceListTypeName: string
  printSno: number | null
  rate: number
  refSubCode: number | null
  site_code: number
  toBfCode: number
  toGsmCode: number
  transferDt: Date | null
  unitCode: number
  v_SNo: number
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

export interface AddSaleEnquiry {
  IntdocId: string | null // 64-bit integer (Int64 in C#)
  strV_Type: number // Integer
  IntV_No: number // Integer
  StrRecIdPrefix: string // String
  StrRecId: string // String
  IntV_Prefix: number // Integer
  StrV_Date: string // String (date represented as a string)
  StrCutomerName: string // String (note: it seems like there's a typo, it should be "CustomerName")
  StrPhone: string // String     // New field for phone name
  StrMobile: string // String
  StrGsTin: string // String
  StrGstinDate: string // String (date represented as a string)
  StrCityCode: string // String (city code is represented as a string)
  StrAdd1: string // String (address line 1)
  StrAdd2: string // String (address line 2)
  StrEmail: string // String
  IntStatusCode: number // Integer
  IntProductType: number // Integer
  StrEnquiry: string // String
  StrRemark: string // String
  StrFilterRemark: string // String
  StrPriceList: string // String (comma-separated values or other formatted string)
  IntSubCode: number // Integer
  strStateCode: string
  StrStateName: string
  strSalesEnquiryNo: string
  StrCityName: string
  CountryName: string
  Site_Name: string
  ProductTypeName: string
  description: string
}

export interface AddNewPartyInterface {
  code: string
  strname: string
  stradd1: string
  stradd2: string
  cityCode: string
  cityName: string
  stateName: string
  stateCode: string
  countryCode: string
  countryName: string
  strpin: string
  strmobile: string
  streMail: string
  strpartyType: string
  partyCode: number
  strgstinNo: string
  strgstinDate: string
  strrejectRemark: string
  strverifyBy: string
  strvarifyDate: string
  strapprovedBy: string
  strapprovalDate: string
  isStatus: number
}

export interface CityData {
  State: string
  State_Code: string
  cityName: string
  citycode: string
}

export interface City {
  success: boolean
  data: CityData[]
  error: string
}

export interface CountryData {
  Code: string
  Name: string
}

export interface Country {
  success: boolean
  data: CountryData[]
  error: string
}

export interface PartyRequestNameData {
  code: string
  name: string
  add1: string
  add2?: string // Optional if it might be undefined
  cityCode: number
  cityname: string
  countryCode: number
  pin: string
  mobile: string
  eMail: string
  partyType: string // Consider using a union type if you have specific values
  gstinNo: string
  gstinDate: string // You might want to use Date type if handling dates
  partyCode: number
  rejectRemark?: string // Optional if it might be undefined
  verifyBy?: string // Optional if it might be undefined
  varifyDate: string // Consider using Date type if handling dates
  approvedBy?: string // Optional if it might be undefined
  approvalDate: string // Consider using Date type if handling dates
  isStatus: number // Assuming this is an integer representing a status
}

export interface PartyRequestName {
  success: boolean
  data: PartyRequestNameData[]
  error: string
}

export interface VerifiedOrderStatus {
  docid: string // Changed to string
  partyOrdNo: string
  pOdate: string // Keep as string (consider parsing as needed)
  pOrderNo: string
  erpRefNo: string | null
  erpRefDate: string | null
  partyname: string
  status: string
  VerifiedBy: string | null
  v_No: number // Changed to number
  v_Type: number // Changed to number
  ConsigneeName: string
  ordqty: number | null
  notification: string | null
  notificationDate: string | null
  toPlaceCode: number // Changed to number
  toPlace: string
  orderType: string
  ordertype1?: string // Optional, include if needed
}

export interface BalanceEntryData {
  V_Type: string
  VTypeShortName: string
  RecID: number | null
  V_Date: string | null
  V_Prefix: string | null
  PName: string
  SubCode: number
  Narration: string
  AmtDr: number
  AmtCr: number
  AmtDr_OP: number
  AmtCr_OP: number
  SNo: number
  siteName: string
  ContraText: string
  Chq_No: string
  Chq_Date: string | null
  PCity: string
  Site_Code: number | null
  ManualCode: string
  Add1: string
  Add2: string
  SGCName: string
  refNo: number | null
  refDate: string | null
  v_no: number | null
  docId: number | null
  V_SNO: number
  SerialNo: number
  balanceType: string
}

export interface BalanceEntry {
  success: boolean
  data: BalanceEntryData[]
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

export interface TypeData {
  Code: string
  Name: string
}

export interface Type {
  success: boolean
  data: TypeData[]
}

export interface StockData {
  ItemCode: string
  ItemName: string
  BF: string
  GSMName: string
  SizeReel: number
  SizeHeight: number
  Grain: string
  CloseQty: number
  DATE: string
  WithOrderQty: number
  WithOutOrderQty: number
}

export interface LedgerData {
  V_Type: string
  V_No: number
  V_Date: string
  V_Prefix: string
  PName: string
  SubCode: string
  Narration: string
  AmtDr: number
  AmtCr: number
  AmtDr_OP: number
  AmtCr_OP: number
  SNo: number
  Division: string
  ContraName: string
  Chq_No: string
  Chq_Date: string
  BR_Clg_Date: string
  PCity: string
  Site_Code: string
  ManualCode: string
  LedgerStatus: string
  Narration1: string
  WithNarrationYN: string
  docid: string
  V_Sno: number
  WithAdjustmentYN: string
  CountADJ: number
  CumulativeBalance: number
}

export interface PartyRequestByDocIdData {
  code: string
  name: string
  add1: string
  add2: string
  cityCode: string
  cityname: string
  countryCode: string
  Country: string
  STATE: string
  pin: string
  mobile: string
  eMail: string
  gstinNo: string
  gstinDate: string // Consider using Date type if you want to handle date objects
  partyCode: number
  rejectRemark: string
  verifyBy: string
  varifyDate: string // Consider using Date type if you want to handle date objects
  approvedBy: string
  approvalDate: string // Consider using Date type if you want to handle date objects
  isStatus: number
  partyType: string
  PartyTypeName: string
}

export interface MakeToOrderData {
  ItemCode: string
  ItemName: string
  Unit: string
  ItemNameWithUnit: string
  CloseQty: number
  GSMName: string
  SizeReel: number
  SizeHeight: number
  RimWeight: number
  SaleType: string
  BF: string
  Sizeunit: string
  ItemID: string
  Reels: number
  Sheets: number
  RimPerBndl: number
  Grain: string
  Bundles: number
  WithOrderQty: number
  SordNo: string
}

export interface Taxes {
  Expense: string
  ECode: string
  ExpCode: string
  SubGroup: string | null
  PostAc: string | null
  Per: number
}

export interface FSizeConversionResponse {
  success: boolean
  Weight: number
  Reel: number
  SizeInch: string
  SizeCM: string
}

export interface AgtFormUsingParty {
  FormCode: string
  FormName: string
}

export interface AgtForm {
  Form_Code: string
  Form_Desc: string
}
export interface AgtFormres {
  success: boolean
  data: AgtForm[]
}

export interface ViewModalProps {
  isViewModalOpen: boolean
  viewItem: clsSaleOrderItemDetail | null
  setIsViewModalOpen: (isOpen: boolean) => void // Add setter function prop
  // detailsOrderData: DMSSordItemDetail[] | null;
}

export interface Requisition {
  SearchCode: string
  ReqNo: string
  Date: string
}

// API return type
export interface LotNoType {
  SearchCode: string
  LotNo: string
  LotDate: string
  Balance: number
}
