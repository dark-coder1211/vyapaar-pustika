export interface RRFilterData{
    FromDate: string;
    ToDate: string;
    Itemcode: string;
    ItemName: string;
    ItemGroupcode: string;
    ItemGroupName: string;
    departmentname: string;
    departmentcode: string;
    sitecode: string;
    sitename: string;
}

export interface RRReportinterface {
    BALANCEQTY: number;
    Closed: string;
    CostCenterCode: string;
    CostCenterName: string;
    DOCID: string;
    Department: string;
    INDENTER: string;
    INDENTQTY: number;
    ITEMNAME: string;
    IssueQty: number;
    MakeCode: string | null;
    MakeName: string | null;
    REQDATE: string;
    REQUESTQTY: number;
    Remark: string | null;
    ReqByCode: string;
    RequisitionNo: string;
    Requisitionby: string;
    V_Date: string;
    V_SNo: number;
    V_Type: string;
}
