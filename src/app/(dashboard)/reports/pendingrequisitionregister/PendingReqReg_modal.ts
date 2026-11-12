export interface RRFilterData{
    AsOnDate: string;
    Itemcode: string;
    ItemName: string;
    ItemGroupcode: string;
    ItemGroupName: string;
    ItemCategorycode: string;
    ItemCategoryname: string;
    CostCentercode: string;
    CostCentername: string;
    Status: string;
}

export interface RRReportinterface {
    BALANCEQTY: number;
    Closed: string;
    DOCID: string;
    Department: string;
    INDENTER: string;
    INDENTQTY: number;
    ITEMNAME: string;
    IssueQty: number;
    REQDATE: string;
    REQUESTQTY: number;
    RequisitionNo: string;
    V_SNo: number;
    V_Type: string;
}
