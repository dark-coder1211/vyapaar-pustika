export interface GateVsInvoiceFilters {
    FromDate: string;
    ToDate: string;
    Site_Name: string;
    Site_Code: string;
    PartyCode: string;
    PartyName: string;
    DealerCode: string;
    DealerName: string;
    ConsigneeCode: string;
    ConsigneeName: string;
    VoucherType: string;
    VoucherName: string;
    ReportFor: string;
    ReportForName: string;
    SaleTypeCode: string;
    SaleTypeName: string;
}

export interface GateVsInvoiceInterface { 
    CityName: string;
    ConsigneeName: string;
    DealerName: string;
    DeliveryAtName: string;
    EWayBillDate: string;
    EWayBillNo: string;
    EWayBillTime: string;
    ExLoadWt: number;
    GateDate: string;
    GateDocid: string;
    GateEntryNo: string;
    GateOutWT: number;
    GateOutWeight: number;
    InvoiceDate: string;
    InvoiceDocID: string;
    InvoiceNo: string;
    InvoiceType: string;
    Invoiceweight: number;
    PartyName: string;
    PrepTime: string;
    Prep_Date: string;
    SBTYPE: string;
    TransporterName: string;
    TrarifName: string;
    VehicleNo: string;
    totReels: number;
    DiffrenceWeight: number;
}
