import type { clsDMSSordOH, clsDMSSordOHHeader } from "../saleOrderEntry/SaleOrder_Entry_modal";

export interface POInterface {
  strDocId?: string;
  strV_Type?: string;
  strV_TypeDesc?: string;
  intV_No?: number;
  strRecId?: string;
  strV_Date?: string;
  strV_Prefix?: string;
  strPartyCode?: string;
  strPartyName?: string;
  strDistributor?: string;
  strLocation?: string;
  strCurrencyCode?: string;
  strCurrencyCodeName?: string;
  strQuotDocId?: string;
  strQuotNo?: string;
  strIndDocId?: string;
  strIndNo?: string;
  strAmdOrdDocId?: string;
  strRefDate?: string;
  strRefNo?: string;
  strRemark?: string;
  strTerms?: string;
  strRemark_2?: string;
  dblGAmount?: number;
  dblExciseAmt?: number;
  dblCessAmt?: number;
  dblEduCessAmt?: number;
  dblSHCessAmt?: number;
  dblTaxAmt?: number;
  dblTotalAmt?: number;
  dblROffAmt?: number;
  dblNAmount?: number;
  strSite_Code?: string | number | true | object | null;
  strApprovedBy?: string;
  strPreparedBy?: string;
  strModifiedBy?: string;
  strU_EntDt?: string;
  strU_AE?: string;
  strTransfered?: string;
  strDocGUID?: string;
  dblCMN_Addition?: number;
  dblCMN_Deduction?: number;
  strVerifiedBy?: string;
  strApprovedDate?: string;
  dblAdditionAmt?: number;
  dblPackFwdAmt?: number;
  dblDiscAmt?: number;
  dblFreight?: number;
  dblInsurance?: number;
  dblServiceValue?: number;
  dblTaxableValue?: number;
  dblCGSTAmt?: number;
  dblSGSTAmt?: number;
  dblUGSTAmt?: number;
  dblIGSTAmt?: number;
  strAgtForm?: string;
  strAgtFormName?: string;
  strVerifiedDate?: string;
  strDocumentVPrefix?: string;
  strDocumentFormat?: string;
  strDocumentVoucherNo?: string;
  dblCurrRateInr?: number;
  strToleranceBy?: string;
  strToleranceDate?: string;
  strApprovalID?: string;
  strTransactionType?: string;
  strTransactionTypeName?: string
  strApprovalStatus?: string;
  strFMID?: string;
  strCurrencyDependOn?: string;
  strRevNo?: string;
  strAmdOrdRecId?: string;
  intCreditDays?: number;
  strUpdateSupplierUserName?: string;
  strUpdateSupplierDate?: string;
  strFromWeb?: string;
}

export interface PoDetailInterface {
  RowID?: string;
  strDocId?: string;
  strV_Type?: string;
  intRecId?: number;
  intV_SNo?: number;
  strV_Date?: string;
  strItemCode?: string;
  strItemDesc?: string;
  strItemName?: string;
  strManualCode?: string;
  strMake?: string;
  strMakeName?: string;
  dblQtySKU?: number;
  dblOrdQty?: number;
  dblTL_ShortageQty?: number;
  dblTL_ExcessQty?: number;
  strUnit?: string;
  strUnitName?: string;
  strSKU?: string;
  dblRate?: number;
  LRate?: number;
  dblAmount?: number;
  strReqDate?: string;
  strRemark?: string;
  dblDisc?: number;
  dblExciseAmt?: number;
  dblCessAmt?: number;
  dblEduCessAmt?: number;
  dblSHCessAmt?: number;
  dblTaxAmt?: number;
  blnClosed?: boolean;
  strSite_Code?: string | null;
  dblDiscAmt?: number;
  dblIGST_Per?: number;
  dblIGSTAmt?: number;
  dblUGST_Per?: number;
  dblUGSTAmt?: number;
  dblCGST_Per?: number;
  dblCGSTAmt?: number;
  dblSGST_Per?: number;
  dblSGSTAmt?: number;
  dblAdditionAmt?: number;
  dblPackFwdAmt?: number;
  dblDiscPer?: number;
  dblPackFwdPer?: number;
  dblFreightPer?: number;
  dblFreight?: number;
  dblInsurance?: number;
  dblInsuPer?: number;
  dblServiceValue?: number;
  dblTaxableValue?: number;
  dblCessPer?: number;
  dblItemNetValue?: number;
  dblItemValue?: number;
  dblAdditionPer?: number;
  strGoodsServices?: string;
  strCloseRemark?: string;
  strPIDocId?: string;
  intPIV_SNo?: number;
  dblFcRate?: number;
  dblPIQty?: number;
  dblExchangeRate?: number;
  dblFCAmount?: number;
  strLocalCurrency?: string;
  strForeignCurrency?: string;

  // Related structures - optional, can define interfaces for them if needed
  clsItemOH?: clsDMSSordOH[];
  StructParameter?: StructParameter[];
  clsIndent?: StrucIndent[];
  clsQcNew?: StrucQCNew[];
  clsTolerance?: StrucTolerance[];
}

export interface StrucTolerance {
  Int_Tl_Shortage: number;
  Int_TL_Excess: number;
}

export interface StrucQCNew {
  StrImpCode: string;
  StrImpName: string;
  DBlRange1: number;
  DBlRange2: number;
  StrRangeInfo: string;
  StrFormulaQty: string;
  StrFormulaAMt: string;
  StrFormulaDeduction: string;
  strStrUnit: string;
  DblStdValue: number;
  DblTolrencePlus: number;
  DblTolrenceNegative: number;
  DblDeductionOn: number;
  DblRejectOn: number;
  StrOnAboveBelow: string;
  StrNetWeightCalcYN: string;
  StrDed_ASpersheet: string;
  StrRejectYn: string;
  StrBillPurityYn: string;
  StrDeductionCalcOn: string;
  SNo: number;
}

export interface StrucIndent {
  StrDocId?: string;
  StrItemCode?: string;
  StrItemName?: string;
  StrIndDocId?: string;
  StrIndNo?: string;
  StrIndDate?: string;
  StrIndCostCenter?: string;
  StrIndCostCenterName?: string;
  StrPOCostCenter?: string;
  StrPOCostCenterName?: string;
  StrSiteCode?: string;
  StrMode?: string;
  DblOrdQty?: number;
  DblCancelQty?: number;
  DblIndQty?: number;
  DblAdjQty?: number;
  intVSNo?: number;
  intIndV_SNo?: number;
  intSNo?: number;
  StrDefaultIndednt?: string
}

export interface StructParameter {
  StrSpeciCode: string;
  StrSpeciName: string;
  StrDefaultValue: string;
  StrOrderValue: string;
  StrRequiredValue: string;
}

export interface clsPordNotification {
  intdocId: number;
  Intv_SNo: number;
  strmsg: string;
  stru_EntDt: string;
}

export interface clsPordOH {
  intSno: number;
  strExpShortCode: string;
  dblPer: number;
  dblAmount: number;
  strFormulaString: string;
}

export interface ClsPordTermCondition {
  strTCManualCode: string;
  strValue: string;
  strValue_Code: string;
}

export type PostPOFormData = {
  clsHeader: POInterface[],
  clsItemDetail: PoDetailInterface[]
  clsPordNotification: clsPordNotification[]
  clsMainOH: clsDMSSordOHHeader[]
  clsTermCondition: ClsPordTermCondition[]
};

export interface AddPO {
  success: boolean;
  data: PostPOFormData;
  error?: string;
}

export interface HeaderOHData {
  Vtype: string;
  SNo: number;
  ExpCode: string;
  Per: number;
  Account: string | null;
  ContraExp: string;
  ExpType: string;
  CalcOn: string | null;
  OnAmt: number | null;
  FormulaString: string;
  DrCr: string;
  Per_SaveIn: string | null;
  Amt_SaveIn: string;
  TableName: string;
  PerEditable: "Y" | "N";
  AmtEditable: "Y" | "N";
  AcEditable: "Y" | "N";
  FullValue: "Y" | "N";
  RoundOff: "Y" | "N";
  CalLValOn: "Y" | "N";
  UniqueId: string;
  MandatoryPer: "Y" | "N";
  MandatoryAmt: "Y" | "N";
  Transfered: string | null;
  TransferDt: string | null;
  TDSDeductFrom: "Y" | "N";
  TDSCategory: string | null;
  IsSync: number;
  Expense: string;
  HeadSN: string;
  ACName: string | null;
  Amount: number;
  MA_YN: "Y" | "N";
  ActualFormula: string;
  ExcludeFormula: string;
  IsMandatoryAmt: "Y" | "N";
  IsMandatoryPer: "Y" | "N";
  TDSCategoryName: string | null;
}

export interface HeaderOH {
  success: boolean;
  data: HeaderOHData[];
  error: string
}

export interface LineOHData {
  Vtype: string;
  SNo: number;
  ExpCode: string;
  Per: number;
  ExpType: string;
  CalcOn: string | null;
  OnAmt: number | null;
  FormulaString: string;
  Per_SaveIn: string | null;
  Amt_SaveIn: string;
  TableName: string;
  PerEditable: "Y" | "N";
  AmtEditable: "Y" | "N";
  FullValue: "Y" | "N";
  RoundOff: "Y" | "N";
  MandatoryPer: "Y" | "N";
  MandatoryAmt: "Y" | "N";
  Transfered: string | null;
  Ac_SaveIn: string;
  Exp_SaveIn: string;
  ExpText: string | null;
  ExpEditable: "Y" | "N";
  SynAcYN: "Y" | "N";
  IsSync: number;
  Expense: string;
  HeadSN: string;
  Account: string | null;
  ACName: string | null;
  Amount: number;
  IsMandatoryAmt: "Y" | "N";
  IsMandatoryPer: "Y" | "N";
  ExpText1: string | null;
  SynAcYN1: "Y" | "N";
}

export interface LineOH {
  success: boolean;
  data: LineOHData[];
  error: string
}

export interface POApiResponse {
  success: boolean;
  data: POInterface[]; // Assuming the data property contains the array
  error: string
}

export interface POApiResponseDetail {
  success: boolean;
  data: PoDetailInterface[]; // Assuming the data property contains the array
  error: string
}

export interface RecidInterface {
  success: boolean;
  data: string;
  error: string
}

export interface TCT {
  strTCManualCode: string;
  strValue: string;
  strTCName: string;
  strValue_Code: string
}

export interface TCTData {
  success: boolean;
  data: TCT[];
}
