import type {
  AddressBookData,
  AgainstForm,
  ColumnConfig,
  ConsigneeData,
  HeaderOHData,
  OrderTrackData,
  Party,
  PartyDataforSale,
  PendingIndentHelp,
  PendingOrderData,
  SOTrackingDispInterface,
  Supplier,
  TransactionType,
  POReportinterface,
  Product,
  ItemOption,
  CostCenter,
  Requisition,
  LotNoType,
  GateNoType
} from '../interfaces/page'
import  { Alignment } from '../enum/page'
import type { RRReportinterface } from '@/app/(dashboard)/reports/requisitionregister/ReqReg_modal'
import type { GateInInterface } from '@/app/(dashboard)/reports/gateinreport/GateInReport_modal'
import type { GateOutInterface } from '@/app/(dashboard)/reports/gateoutreport/GateOutReport_modal'
import type { FirstWeighInterface } from '@/app/(dashboard)/reports/firstweighment/FirstWeighment_modal'
import type { PendingIndentInterface } from '@/app/(dashboard)/reports/pendingindent/PendingIndentReport_modal'
import type { SecondWeighInterface } from '@/app/(dashboard)/reports/secondweighment/SecondWeighment_modal'
import type { StoreIssueReceiveInterface } from '@/app/(dashboard)/reports/storeissuereceive/StoreIssueReceive_modal'
import type { FinishStockSummaryInterface } from '@/app/(dashboard)/reports/finishstocksummary/FinishStock_modal'
import type { StockValReportInterface } from '@/app/(dashboard)/reports/stockreportval/StockReportVal_modal'
import type { StockQtyReportInterface } from '@/app/(dashboard)/reports/stockreportqty/StockReportQty_modal'
import type { GateVsInvoiceInterface } from '@/app/(dashboard)/reports/gatevsinvoice/GateVsInvoice_modal'
import type { clsDMSSordOH, clsDMSSordOHHeader, ConsigneeDataForSale, PartyDataforSaleOrder, ToPlaceHelpInterface } from '@/app/(dashboard)/saleOrderEntry/SaleOrder_Entry_modal'

// Consignee Columns Configuration

export const POColumnsConfig: ColumnConfig<POReportinterface>[] = [
  {
    index: 0,
    label: 'Order No.',
    width: 80,
    align: Alignment.Left, // Use enum
    visible: true,
    field: 'Ordno'
  },
  {
    index: 1,
    label: 'Order Date',
    width: 80,
    align: Alignment.Left,
    visible: true,
    field: 'Orddate'
  },
  {
    index: 2,
    label: 'Party Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'party'
  },
  {
    index: 3,
    label: 'Item Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'Item'
  },
  {
    index: 4,
    label: 'Unit',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'unit'
  },
  {
    index: 5,
    label: 'Make',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'make'
  },
  {
    index: 6,
    label: 'Order Qty',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'OrdQty'
  },
  {
    index: 7,
    label: 'Rec Qty',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'RecQty'
  },
  {
    index: 8,
    label: 'Pending Qty',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'Pending'
  }



]

export const GateInLColumnsConfig: ColumnConfig<GateInInterface>[] = [
  {
    index: 0,
    label: 'Gate In No.',
    width: 100,
    align: Alignment.Center, // Use enum
    visible: true,
    field: 'GateInNo'
  },
  {
    index: 1,
    label: 'Gate In Date',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'GateInDate'
  },
  {
    index: 8,
    label: 'Gate in Time',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'GateInTime'
  },
  {
    index: 2,
    label: 'Vehicle No.',
    width: 100,
    align: Alignment.Left,
    visible: true,
    field: 'VehicleNo'
  },
  {
    index: 3,
    label: 'Party Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'PartyName'
  },
  {
    index: 4,
    label: 'Description',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'ItemDescription'
  },
  {
    index: 5,
    label: 'L/U',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'LoadUn'
  },
  {
    index: 6,
    label: 'Driver Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'DriverName'
  },
  {
    index: 7,
    label: 'Driver Mob.',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'DriverMobileNo'
  }



]

export const GateOutLColumnsConfig: ColumnConfig<GateOutInterface>[] = [
  {
    index: 0,
    label: 'Gate In No.',
    width: 100,
    align: Alignment.Center, // Use enum
    visible: true,
    field: 'GateInNo'
  },
  {
    index: 1,
    label: 'Gate In Date',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'GateInDate'
  },
  {
    index: 8,
    label: 'Gate in Time',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'GateInTime'
  },
  {
    index: 9,
    label: 'Gate Out Date',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'GateOutDate'
  },
  {
    index: 10,
    label: 'Gate Out Time',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'GateOutTime'
  },
  {
    index: 2,
    label: 'Vehicle No.',
    width: 100,
    align: Alignment.Left,
    visible: true,
    field: 'VehicleNo'
  },
  {
    index: 3,
    label: 'Party Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'PartyName'
  },
  {
    index: 4,
    label: 'Description',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'ItemDescription'
  },
  {
    index: 5,
    label: 'L/U',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'LoadUn'
  },
  {
    index: 6,
    label: 'Driver Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'DriverName'
  },
  {
    index: 7,
    label: 'Driver Mob.',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'DriverMobileNo'
  }



]

export const FirstWeighLColumnsConfig: ColumnConfig<FirstWeighInterface>[] = [
  {
    index: 0,
    label: 'Date',
    width: 100,
    align: Alignment.Center, // Use enum
    visible: true,
    field: 'WeighmentDate'
  },
  {
    index: 1,
    label: '1st Weighment No.',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'FirstWeighmentNo'
  },
  {
    index: 3,
    label: 'Party Name',
    width: 150,
    align: Alignment.Center,
    visible: true,
    field: 'PartyName'
  },
  {
    index: 4,
    label: 'Item Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'ItemName'
  },
  {
    index: 5,
    label: 'L/U',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'LoadUn'
  },
  {
    index: 6,
    label: 'Vehicle No.',
    width: 150,
    align: Alignment.Center,
    visible: true,
    field: 'VehicleNo'
  },
  {
    index: 7,
    label: 'Party 1st Time Weighment',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'Party1stTimeWeighment'
  },
  {
    index: 8,
    label: '1st Weight',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'FirstWeight'
  }



]

export const SecondWeighLColumnsConfig: ColumnConfig<SecondWeighInterface>[] = [
  {
    index: 0,
    label: 'Date',
    width: 100,
    align: Alignment.Center, // Use enum
    visible: true,
    field: 'WeighmentDate'
  },
  {
    index: 1,
    label: '1st Weighment No.',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'FirstWeighmentNo'
  },
  {
    index: 3,
    label: 'Party Name',
    width: 150,
    align: Alignment.Center,
    visible: true,
    field: 'PartyName'
  },
  {
    index: 4,
    label: 'Item Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'ItemName'
  },
  {
    index: 5,
    label: 'L/U',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'LoadUn'
  },
  {
    index: 6,
    label: 'Vehicle No.',
    width: 150,
    align: Alignment.Center,
    visible: true,
    field: 'VehicleNo'
  },
  {
    index: 7,
    label: 'Party 1st Time Weighment',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'Party1stTimeWeighment'
  },
  {
    index: 8,
    label: '1st Weight',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'FirstWeight'
  },
  {
    index: 9,
    label: '2nd Weight',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'SecondWeight'
  },
  {
    index: 10,
    label: 'Net Weight',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'Net_Weight'
  },
  {
    index: 11,
    label: '1st Weight',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'FirstWeight'
  },
  {
    index: 12,
    label: 'Diff. Weight',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'DiffWeight'
  }



]
export const RRColumnsConfig: ColumnConfig<RRReportinterface>[] = [
  {
    index: 0,
    label: 'Requisition No.',
    width: 100,
    align: Alignment.Center, // Use enum
    visible: true,
    field: 'RequisitionNo'
  },
  {
    index: 1,
    label: 'Date',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'V_Date'
  },
  {
    index: 2,
    label: 'Requisition By',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'Requisitionby'
  },
  {
    index: 3,
    label: 'Item Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'ITEMNAME'
  },
  {
    index: 4,
    label: 'Make',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'MakeName'
  },
  {
    index: 5,
    label: 'Request Qty.',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'REQUESTQTY'
  },
  {
    index: 6,
    label: 'Department',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'Department'
  },
  {
    index: 7,
    label: 'Req. Date',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'REQDATE'
  },
  {
    index: 8,
    label: 'Cost Center',
    width: 150,
    align: Alignment.Center,
    visible: true,
    field: 'CostCenterName'
  },
  {
    index: 9,
    label: 'Remark',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'Remark'
  }



]

export const PendingIndentColumnsConfig: ColumnConfig<PendingIndentInterface>[] = [
  {
    index: 0,
    label: 'Indent No.',
    width: 80,
    align: Alignment.Center, // Use enum
    visible: true,
    field: 'Indno'
  },
  {
    index: 1,
    label: 'Indenter Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'PartyName'
  },
  {
    index: 2,
    label: 'Item Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'Item'
  },
  {
    index: 3,
    label: 'SKU',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'SKU'
  },
  {
    index: 4,
    label: 'Department',
    width: 150,
    align: Alignment.Center,
    visible: true,
    field: 'Department'
  },
  {
    index: 5,
    label: 'Indent Qty.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'indqty'
  },
  {
    index: 6,
    label: 'Approval Qty.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'Aprqty'
  },
  {
    index: 7,
    label: 'Order Qty.',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'OrdQty'
  },
  {
    index: 8,
    label: 'Pending Qty.',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'Pendingqty'
  }



]

export const StoreIssueReceiveColumnsConfig: ColumnConfig<StoreIssueReceiveInterface>[] = [
  {
    index: 0,
    label: 'Vr. No.',
    width: 80,
    align: Alignment.Center, // Use enum
    visible: true,
    field: 'RecID'
  },
  {
    index: 1,
    label: 'Date',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'V_Date'
  },
  {
    index: 2,
    label: 'Staff',
    width: 100,
    align: Alignment.Left,
    visible: true,
    field: 'Staff'
  },
  {
    index: 3,
    label: 'Item Name',
    width: 150,
    align: Alignment.Center,
    visible: true,
    field: 'ItemName'
  },
  {
    index: 4,
    label: 'Unit',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'Unit1'
  },
  {
    index: 5,
    label: 'Quantity',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'RQty'
  },
  {
    index: 6,
    label: 'Rate',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'Rate'
  },
  {
    index: 7,
    label: 'Value',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'Value'
  },
  {
    index: 8,
    label: 'Godown',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'Godown'
  },
  {
    index: 9,
    label: 'Remarks',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'Remarks'
  }



]

export const StockReportColumnsConfig: ColumnConfig<StockValReportInterface>[] = [
  {
    index: 0,
    label: 'Item Code',
    width: 80,
    align: Alignment.Center, // Use enum
    visible: true,
    field: 'ItemCode'
  },
  {
    index: 1,
    label: 'Item Name',
    width: 150,
    align: Alignment.Center,
    visible: true,
    field: 'ItemName'
  },
  {
    index: 2,
    label: 'Unit',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'Unit'
  },
  {
    index: 3,
    label: 'Opening Qty.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'OpeningQty'
  },
  {
    index: 4,
    label: 'Opening Val.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'OpeningValue'
  },
  {
    index: 5,
    label: 'Receive Qty.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'RecieveQty'
  },
  {
    index: 6,
    label: 'Receive Val.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'RecieveValue'
  },
  {
    index: 7,
    label: 'Cumml. Stock',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'CommuQty'
  },
  {
    index: 8,
    label: 'Cumml. Val.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'CommuValue'
  },
  {
    index: 9,
    label: 'Issue Qty.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'IssueQty'
  },
  {
    index: 10,
    label: 'Issue Val.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'IssueValue'
  },
  {
    index: 11,
    label: 'Closing Qty.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'ClosingQty'
  },
  {
    index: 12,
    label: 'Closing Val.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'ClosingValue'
  }



]

export const StockReportQtyColumnsConfig: ColumnConfig<StockQtyReportInterface>[] = [
  {
    index: 0,
    label: 'Item Code',
    width: 80,
    align: Alignment.Center, // Use enum
    visible: true,
    field: 'ItemCode'
  },
  {
    index: 1,
    label: 'Item Name',
    width: 150,
    align: Alignment.Center,
    visible: true,
    field: 'ItemName'
  },
  {
    index: 2,
    label: 'Unit',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'Unit'
  },
  {
    index: 3,
    label: 'Opening Qty.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'OpeningQty'
  },
  {
    index: 5,
    label: 'Receive Qty.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'RecieveQty'
  },
  {
    index: 7,
    label: 'Cumml. Stock',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'CommuQty'
  },
  {
    index: 9,
    label: 'Issue Qty.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'IssueQty'
  },
  {
    index: 11,
    label: 'Closing Qty.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'ClosingQty'
  }



]

export const FinishStockColumnsConfig: ColumnConfig<FinishStockSummaryInterface>[] = [
  {
    index: 0,
    label: 'Item Name',
    width: 100,
    align: Alignment.Center, // Use enum
    visible: true,
    field: 'ItemName'
  },
  {
    index: 1,
    label: 'Godown',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'Godown'
  },
  {
    index: 2,
    label: 'BF',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'BFName'
  },
  {
    index: 3,
    label: 'GSM',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'GSMName'
  },
  {
    index: 4,
    label: 'Size',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'Size'
  },
  {
    index: 5,
    label: 'Unit',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'SizeUnit'
  },
  {
    index: 6,
    label: 'Opening Pack',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'OpeningReel'
  },
  {
    index: 7,
    label: 'Opening Weight',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'OpeningQty'
  },
  {
    index: 8,
    label: 'Diff. Pack',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'ProductionReel'
  },
  {
    index: 9,
    label: 'Prod. Rec. Weight',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'ProductionQty'
  },
  {
    index: 10,
    label: 'Other Rec. Pack',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'OtherRecieveReel'
  },
  {
    index: 11,
    label: 'Other Rec. Weight',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'OtherRecieveQty'
  },
  {
    index: 12,
    label: 'Total Rec. Pack',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'TotalRecieveReel'
  },
  {
    index: 13,
    label: 'Total Rec. Weight',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'TotalRecieveQty'
  },
  {
    index: 14,
    label: 'Issue Sale Pack',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'IssueSaleReel'
  },
  {
    index: 15,
    label: 'Issue Sale Weight',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'IssueSaleQty'
  },
  {
    index: 16,
    label: 'Other Issue Pack',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'OtherIssueReel'
  },
  {
    index: 17,
    label: 'Other Issue Weight',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'OtherIssueQty'
  },
  {
    index: 18,
    label: 'Total Issue Pack',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'TotalIssueReel'
  },
  {
    index: 19,
    label: 'Total Issue Weight',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'TotalIssueQty'
  },
  {
    index: 20,
    label: 'Closing Pack',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'ClosingReel'
  },
  {
    index: 21,
    label: 'Closing Weight',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'ClosingQty'
  }
]

export const GateVsInvoiceColumnsConfig: ColumnConfig<GateVsInvoiceInterface>[] = [
  {
    index: 0,
    label: 'Invoice Type',
    width: 100,
    align: Alignment.Center, // Use enum
    visible: true,
    field: 'InvoiceType'
  },
  {
    index: 1,
    label: 'Invoice No.',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'InvoiceNo'
  },
  {
    index: 2,
    label: 'Invoice Date',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'InvoiceDate'
  },
  {
    index: 3,
    label: 'Party Name',
    width: 100,
    align: Alignment.Left,
    visible: true,
    field: 'PartyName'
  },
  {
    index: 4,
    label: 'Dealer Name',
    width: 100,
    align: Alignment.Left,
    visible: true,
    field: 'DealerName'
  },
  {
    index: 5,
    label: 'Consignee Name',
    width: 100,
    align: Alignment.Left,
    visible: true,
    field: 'ConsigneeName'
  },
  {
    index: 6,
    label: 'Invoice Weight(KG)',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'Invoiceweight'
  },
  {
    index: 7,
    label: 'Gate Entry No.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'GateEntryNo'
  },
  {
    index: 8,
    label: 'Gate Out Weight(KG)',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'GateOutWeight'
  },
  {
    index: 9,
    label: 'Diff. Weight(KG)',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'DiffrenceWeight'
  },
  {
    index: 10,
    label: 'Vehicle No.',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'VehicleNo'
  },
  {
    index: 11,
    label: 'Transporter',
    width: 100,
    align: Alignment.Left,
    visible: true,
    field: 'TransporterName'
  },
  {
    index: 12,
    label: 'E-Way Date',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'EWayBillDate'
  },
  {
    index: 13,
    label: 'E-Way Time',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'EWayBillTime'
  }
]

export const SOColumnsConfig: ColumnConfig<SOTrackingDispInterface>[] = [
  {
    index: 0,
    label: 'Order No.',
    width: 80,
    align: Alignment.Left, // Use enum
    visible: true,
    field: 'OrderNo'
  },
  {
    index: 1,
    label: 'Order Date',
    width: 80,
    align: Alignment.Left,
    visible: true,
    field: 'OrderDate'
  },
  {
    index: 2,
    label: 'Party Order No.',
    width: 80,
    align: Alignment.Left, // Use enum
    visible: true,
    field: 'PartyOrdNo'
  },
  {
    index: 3,
    label: 'Party Order Date',
    width: 80,
    align: Alignment.Left,
    visible: true,
    field: 'PartyOrdDt'
  },
  {
    index: 4,
    label: 'Party Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'PartyName'
  },
  {
    index: 5,
    label: 'Consignee',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'ConsigneeName'
  },
  {
    index: 6,
    label: 'Delivery At',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'DeliveryAt'
  },
  {
    index: 7,
    label: 'Item Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'ItemName'
  },
  {
    index: 5,
    label: 'BF',
    width: 50,
    align: Alignment.Left,
    visible: true,
    field: 'BFName'
  },
  {
    index: 6,
    label: 'GSM',
    width: 50,
    align: Alignment.Left,
    visible: true,
    field: 'GSMName'
  },
  {
    index: 6,
    label: 'Order Qty',
    width: 100,
    align: Alignment.Right,
    visible: true,
    field: 'OrdQty'
  },
  {
    index: 7,
    label: 'Width',
    width: 50,
    align: Alignment.Right,
    visible: true,
    field: 'SizeReel'
  },
  {
    index: 8,
    label: 'Length',
    width: 50,
    align: Alignment.Right,
    visible: true,
    field: 'SizeHeight'
  },
  {
    index: 9,
    label: 'Size Unit',
    width: 50,
    align: Alignment.Left,
    visible: true,
    field: 'SizeUnit'
  },
  {
    index: 10,
    label: 'Order Qty',
    width: 100,
    align: Alignment.Right,
    visible: true,
    field: 'OrdQty'
  },
  {
    index: 11,
    label: 'Invoice No.',
    width: 80,
    align: Alignment.Left,
    visible: true,
    field: 'InvoiceNo'
  },
  {
    index: 12,
    label: 'Invoice Date',
    width: 80,
    align: Alignment.Left, // Use enum
    visible: true,
    field: 'InvoiceDate'
  },
  {
    index: 13,
    label: 'Invoice Qty',
    width: 100,
    align: Alignment.Right,
    visible: true,
    field: 'InvoiceQty'
  }

]

export const PendingSaleOrderColumnsConfig: ColumnConfig<PendingOrderData>[] = [
  {
    index: 0,
    label: 'Order No.',
    width: 80,
    align: Alignment.Center, // Use enum
    visible: true,
    field: 'orderno'
  },
  {
    index: 1,
    label: 'Order Date',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'order_date'
  },
  {
    index: 2,
    label: 'P.O. No.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'PartyOrdNo'
  },
  {
    index: 3,
    label: 'P.O. Date',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'PartyOrdDt'
  },
  {
    index: 4,
    label: 'Party',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'Party'
  },
  {
    index: 5,
    label: 'Consignee',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'ConsigneeName'
  },
  {
    index: 6,
    label: 'Item',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'ItemName'
  },
  {
    index: 7,
    label: 'BF',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'BF'
  },
  {
    index: 8,
    label: 'GSM',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'GSM'
  },
  {
    index: 9,
    label: 'Size',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'Size'
  },
  {
    index: 16,
    label: 'Unit',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'SizeUnit'
  },
  {
    index: 10,
    label: 'Order Qty',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'SO_Weight'
  },
  {
    index: 11,
    label: 'Order Qty Reel',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'SO_Reel'
  },
  {
    index: 12,
    label: 'Sale Qty',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'Sale_Weight'
  },
  {
    index: 13,
    label: 'Sale Qty Reel',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'Sale_Reel'
  },
  {
    index: 14,
    label: 'Pending Qty',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'PendingWeight'
  },
  {
    index: 15,
    label: 'Pending Qty Reel',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'PendingReel'
  }

]

export const OrderColumnsConfig: ColumnConfig<OrderTrackData>[] = [
  // {
  //   index: 0,
  //   label: 'ERP Ref. No.',
  //   width: 100,
  //   align: Alignment.Left,
  //   visible: true,
  //   field: 'ERPRefNo'
  // },
  // {
  //   index: 1,
  //   label: 'ERP Ref. Date',
  //   width: 100,
  //   align: Alignment.Left,
  //   visible: true,
  //   field: 'ERPRefDt'
  // },
  {
    index: 2,
    label: 'SO No.',
    width: 100,
    align: Alignment.Left,
    visible: true,
    field: 'SaleOrderNo'
  },
  {
    index: 3,
    label: 'SO Date',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'SaleOrderDate'
  },
  {
    index: 4,
    label: 'Party Order No.',
    width: 120,
    align: Alignment.Center,
    visible: true,
    field: 'PartyOrdNo'
  },
  {
    index: 5,
    label: 'Party Order Date',
    width: 120,
    align: Alignment.Center,
    visible: true,
    field: 'PartyOrdDt'
  },
  {
    index: 6,
    label: 'Party Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'PartyNAme' // Double-check spelling, may need to be 'PartyName'
  },
  {
    index: 7,
    label: 'Dealer Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'DistributorName'
  },
  {
    index: 8,
    label: 'Consignee Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'ConsigneeName'
  },
  {
    index: 9,
    label: 'Item Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'ItemName'
  },
  {
    index: 10,
    label: 'BF',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'BFName'
  },
  {
    index: 11,
    label: 'GSM',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'GsmName'
  },
  {
    index: 12,
    label: 'Size',
    width: 70,
    align: Alignment.Center,
    visible: true,
    field: 'Size'
  },
  {
    index: 19,
    label: 'Unit',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'SizeUnit'
  },
  {
    index: 14,
    label: 'Order Weight',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'SaleOrderWeight'
  },
  {
    index: 15,
    label: 'Work Order Weight',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'WorkOrderWeight'
  },
  {
    index: 16,
    label: 'Production Rec.',
    width: 80,
    align: Alignment.Center,
    visible: true,
    field: 'ProductionWeight'
  },
  {
    index: 17,
    label: 'Dispatch Qty.',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'dispatchWeight'
  },
  {
    index: 18,
    label: 'Balance from Dispatch',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'dispatchBalance'
  }
]

export const HeaderOHColumnsConfig: ColumnConfig<clsDMSSordOHHeader>[] = [
  {
    index: 0,
    label: 'Heads',
    width: 20,
    align: Alignment.Left,
    visible: true,
    field: 'Expense'
  },
  {
    index: 1,
    label: 'HeadSN',
    width: 2,
    align: Alignment.Left,
    visible: false,
    field: 'strExpShortCode'
  },
  {
    index: 2,
    label: 'Formula',
    width: 2,
    align: Alignment.Left,
    visible: false,
    field: 'strFormulaString'
  },

  {
    index: 3,
    label: 'Amt_SaveIn',
    width: 2,
    align: Alignment.Left,
    visible: false,
    field: 'Amt_SaveIn'
  },

  {
    index: 4,
    label: 'Per_SaveIn',
    width: 2,
    align: Alignment.Left,
    visible: false,
    field: 'Per_SaveIn'
  },
  {
    index: 5,
    label: 'At Rate',
    width: 2,
    align: Alignment.Right,
    visible: true,
    field: 'dblPer'
  },
  {
    index: 6,
    label: 'Amount',
    width: 2,
    align: Alignment.Right,
    visible: true,
    field: 'dblAmount'
  },

  {
    index: 7,
    label: 'SynAc',
    width: 2,
    align: Alignment.Left,
    visible: false,
    field: 'SynAcYN'
  }
]

export const LineOHColumnsConfig: ColumnConfig<clsDMSSordOH>[] = [
  {
    index: 0,
    label: 'Heads',
    width: 20,
    align: Alignment.Left,
    visible: true,
    field: 'Expense'
  },
  {
    index: 1,
    label: 'HeadSN',
    width: 2,
    align: Alignment.Left,
    visible: false,
    field: 'strExpShortCode'
  },
  {
    index: 2,
    label: 'Formula',
    width: 2,
    align: Alignment.Left,
    visible: false,
    field: 'strFormulaString'
  },

  {
    index: 3,
    label: 'Amt_SaveIn',
    width: 2,
    align: Alignment.Left,
    visible: false,
    field: 'Amt_SaveIn'
  },

  {
    index: 4,
    label: 'Per_SaveIn',
    width: 2,
    align: Alignment.Left,
    visible: false,
    field: 'Per_SaveIn'
  },
  {
    index: 5,
    label: 'At Rate',
    width: 2,
    align: Alignment.Right,
    visible: true,
    field: 'dblPer'
  },
  {
    index: 6,
    label: 'Amount',
    width: 2,
    align: Alignment.Right,
    visible: true,
    field: 'dblAmount'
  },

  {
    index: 7,
    label: 'SynAc',
    width: 2,
    align: Alignment.Left,
    visible: false,
    field: 'SynAcYN'
  }
]

export const ShowHeaderOHColumnsConfig: ColumnConfig<HeaderOHData>[] = [
  {
    index: 0,
    label: 'Heads',
    width: 20,
    align: Alignment.Left,
    visible: true,
    field: 'Expense'
  },
  {
    index: 1,
    label: 'At Rate',
    width: 2,
    align: Alignment.Right,
    visible: true,
    field: 'Per'
  },
  {
    index: 2,
    label: 'Amount',
    width: 2,
    align: Alignment.Right,
    visible: true,
    field: 'Amount'
  },

  {
    index: 3,
    label: 'Account',
    width: 10,
    align: Alignment.Left,
    visible: true,
    field: 'ACName'
  }
]

export const ReqNocolumnsConfig: ColumnConfig<Product>[] = [
  {
    label: 'Req.DocId',
    field: 'Reqdocid',
    visible: false,
    index: 0,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Req.No',
    field: 'Reqno',
    visible: true,
    index: 1,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Req.Date',
    field: 'ReqDate',
    visible: true,
    index: 2,
    width: 80,
    align: Alignment.Left
  }
]

export const ItemHelpcolumnsConfig: ColumnConfig<ItemOption>[] = [
  {
    label: 'Item Code',
    field: 'Code',
    visible: false,
    index: 0,
    width: 80,
    align: Alignment.Left
  },
  {
    label: 'Item Name',
    field: 'Name',
    visible: true,
    index: 1,
    width: 80,
    align: Alignment.Left
  },
  {
    label: 'Manual Code',
    field: 'ManualCode',
    visible: true,
    index: 2,
    width: 80,
    align: Alignment.Left
  },
  {
    label: 'SKU',
    field: 'SKU',
    visible: true,
    index: 3,
    width: 80,
    align: Alignment.Left
  },
  {
    label: 'HSN',
    field: 'HSN',
    visible: true,
    index: 4,
    width: 80,
    align: Alignment.Left
  },
  {
    label: 'Group',
    field: 'ItemGroup',
    visible: true,
    index: 5,
    width: 80,
    align: Alignment.Left
  },
  {
    label: 'Category',
    field: 'ItemCat',
    visible: true,
    index: 6,
    width: 80,
    align: Alignment.Left
  },
  {
    label: 'Description',
    field: 'ItemDesc',
    visible: true,
    index: 7,
    width: 80,
    align: Alignment.Left
  }
]


export const GateNoHelpcolumnsConfig: ColumnConfig<GateNoType>[] = [
  {
    label: 'Gate No.',
    field: 'GateEntryNo',
    visible: true,
    index: 0,
    width: 50,
    align: Alignment.Center
  },
  {
    label: 'Entry Date',
    field: 'GateEntryDate',
    visible: true,
    index: 1,
    width: 50,
    align: Alignment.Center
  },
  {
    label: 'Party',
    field: 'PartyName',
    visible: true,
    index: 2,
    width: 100,
    align: Alignment.Center
  },
  {
    label: 'Stock Depend On',
    field: 'StockDependOnName',
    visible: true,
    index: 3,
    width: 50,
    align: Alignment.Center
  },
  {
    label: 'Lab Depend On',
    field: 'LabTestDependOnName',
    visible: true,
    index: 4,
    width: 50,
    align: Alignment.Center
  }
]
export const CostCentercolumnsConfig: ColumnConfig<CostCenter>[] = [
  {
    label: 'Code',
    field: 'Code',
    visible: false,
    index: 0,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Name',
    field: 'Name',
    visible: true,
    index: 1,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Manual Code',
    field: 'ManualCode',
    visible: true,
    index: 2,
    width: 80,
    align: Alignment.Left
  }
]

export const ReqBycolumnsConfig: ColumnConfig<Party>[] = [
  {
    label: 'SubCode',
    field: 'SubCode',
    visible: false,
    index: 0,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Name',
    field: 'Name',
    visible: true,
    index: 1,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Manual Code',
    field: 'ManualCode',
    visible: true,
    index: 2,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Designation',
    field: 'Designation',
    visible: true,
    index: 3,
    width: 80,
    align: Alignment.Left
  }
]

export const SuppliercolumnsConfig: ColumnConfig<Supplier>[] = [
  {
    label: 'SubCode',
    field: 'SubCode',
    visible: false,
    index: 0,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Name',
    field: 'Name',
    visible: true,
    index: 1,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Manual Code',
    field: 'ManualCode',
    visible: true,
    index: 2,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'GSTIN No.',
    field: 'GSTINNo',
    visible: true,
    index: 3,
    width: 80,
    align: Alignment.Left
  },
  {
    label: 'Distributor',
    field: 'DistributorName',
    visible: true,
    index: 4,
    width: 80,
    align: Alignment.Left
  },
  {
    label: 'City',
    field: 'City',
    visible: true,
    index: 5,
    width: 80,
    align: Alignment.Left
  },
  {
    label: 'Address',
    field: 'Address',
    visible: true,
    index: 6,
    width: 80,
    align: Alignment.Left
  }
]

export const TransactionTypecolumnsConfig: ColumnConfig<TransactionType>[] = [
  {
    label: 'Code',
    field: 'Code',
    visible: false,
    index: 0,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Name',
    field: 'Name',
    visible: true,
    index: 1,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Category',
    field: 'TansType_Category',
    visible: true,
    index: 2,
    width: 50,
    align: Alignment.Left
  }
]

export const AgainstcolumnsConfig: ColumnConfig<AgainstForm>[] = [
  {
    label: 'Form_Code',
    field: 'Form_Code',
    visible: false,
    index: 0,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Name',
    field: 'Form_Desc',
    visible: true,
    index: 1,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Percent',
    field: 'Tax_Per',
    visible: true,
    index: 2,
    width: 50,
    align: Alignment.Left
  }
]

export const IndentcolumnsConfig: ColumnConfig<PendingIndentHelp>[] = [
  {
    label: 'IndentDocID',
    field: 'IndentDocID',
    visible: false,
    index: 0,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Indent No.',
    field: 'IndentNo',
    visible: true,
    index: 1,
    width: 50,
    align: Alignment.Left
  },
  {
    label: 'Indent Date',
    field: 'DATE',
    visible: true,
    index: 2,
    width: 50,
    align: Alignment.Left
  }
]

export const AddressBookConfig: ColumnConfig<AddressBookData>[] = [
  {
    index: 0,
    label: 'Code',
    width: 50,
    align: Alignment.Left, // Use enum
    visible: false,
    field: 'Code'
  },
  {
    index: 1,
    label: 'Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'Name'
  },
  {
    index: 2,
    label: 'Add1',
    width: 80,
    align: Alignment.Left,
    visible: true,
    field: 'ADD1'
  },
  {
    index: 3,
    label: 'Add2',
    width: 80,
    align: Alignment.Left,
    visible: true,
    field: 'ADD2'
  },
  {
    index: 4,
    label: 'CityName',
    width: 80,
    align: Alignment.Left,
    visible: true,
    field: 'CityName'
  },
  {
    index: 5,
    label: 'Pin',
    width: 80,
    align: Alignment.Left,
    visible: true,
    field: 'Pin'
  },
  {
    index: 6,
    label: 'State',
    width: 110,
    align: Alignment.Left,
    visible: true,
    field: 'State'
  }


]

export const consigneeColumnsConfig: ColumnConfig<ConsigneeDataForSale>[] = [
  {
    index: 0,
    label: 'Code',
    width: 50,
    align: Alignment.Left, // Use enum
    visible: false,
    field: 'SubCode'
  },
  {
    index: 1,
    label: 'Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'Name'
  },
  {
    index: 2,
    label: 'Manual Code',
    width: 30,
    align: Alignment.Center,
    visible: true,
    field: 'ManualCode'
  },
  {
    index: 3,
    label: 'GSTIN No.',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'GSTINNo'
  },
  {
    index: 4,
    label: 'Address',
    width: 180,
    align: Alignment.Left,
    visible: true,
    field: 'Address'
  },
  {
    index: 5,
    label: 'City',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'CityName'
  },
  {
    index: 6,
    label: 'Distributor',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'DistributorName'
  },
  {
    index: 7,
    label: 'D. City',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'DISCity'
  }

]

export const PartyColumnsConfig: ColumnConfig<PartyDataforSaleOrder>[] = [
  {
    index: 0,
    label: 'Code',
    width: 50,
    align: Alignment.Left, // Use enum
    visible: false,
    field: 'SubCode'
  },
  {
    index: 1,
    label: 'Name',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'Name'
  },
  {
    index: 2,
    label: 'Manual Code',
    width: 30,
    align: Alignment.Center,
    visible: true,
    field: 'ManualCode'
  },
  {
    index: 3,
    label: 'GSTIN No.',
    width: 50,
    align: Alignment.Center,
    visible: true,
    field: 'GSTINNo'
  },
  {
    index: 4,
    label: 'Address',
    width: 180,
    align: Alignment.Left,
    visible: true,
    field: 'Address'
  },
  {
    index: 5,
    label: 'City',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'CityName'
  },
  {
    index: 6,
    label: 'Distributor',
    width: 150,
    align: Alignment.Left,
    visible: true,
    field: 'DistributorName'
  },
  {
    index: 7,
    label: 'D. City',
    width: 100,
    align: Alignment.Center,
    visible: true,
    field: 'DISCity'
  }

]

export const ToPlaceColumnsConfig: ColumnConfig<ToPlaceHelpInterface>[] = [
  {
    index: 0,
    label: 'Code',
    width: 50,
    align: Alignment.Left, // Use enum
    visible: false,
    field: 'CityCode'
  },
  {
    index: 1,
    label: 'Name',
    width: 150,
    align: Alignment.Center,
    visible: true,
    field: 'CityName'
  },
  {
    index: 2,
    label: 'State',
    width: 150,
    align: Alignment.Center,
    visible: true,
    field: 'State'
  }
]

export const LotNoColumnsConfig: ColumnConfig<LotNoType>[] = [
  {
    label: 'Lot No',
    field: 'LotNo',
    visible: true,
    index: 0,
    width: 80,
    align: Alignment.Left
  },
  {
    label: 'Lot Date',
    field: 'LotDate',
    visible: true,
    index: 1,
    width: 80,
    align: Alignment.Left
  },
  {
    label: 'Balance',
    field: 'Balance',
    visible: true,
    index: 2,
    width: 40,
    align: Alignment.Right
  },
  {
    label: 'Search Code',
    field: 'SearchCode',
    visible: false,
    index: 3,
    width: 50,
    align: Alignment.Left
  }
]
