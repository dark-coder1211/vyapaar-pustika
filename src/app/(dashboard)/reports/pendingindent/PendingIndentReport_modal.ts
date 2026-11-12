export interface PendingIndentInterface{
    ApprovedBy:string,
    ApprovedDate:string,
    AprQty1: number,
    Aprdate: string | null,
    Aprqty: number | null,
    AssignToName: string,
    Closed: string,
    CostCenter: string,
    Department: string,
    Dept: string,
    HODName: string | null,
    Inddt: string,
    IndentRemark: string,
    IndentStatus: string,
    IndentV_Sno: number,
    IndentV_Type: string,
    IndenterName: string,
    Indno: string,
    Item: string,
    ItemCode: string,
    ItemDelDate: string,
    ItemDesc: string,
    ItemGroup: string,
    Make: string,
    ManualCdoe: string,
    MaxStock: number,
    MinStock: number,
    OrdQty: number | null,
    OrderDocId: string,
    OrderNo: string,
    OrderV_Sno: number,
    OrderV_Type: string,
    POAmount: number,
    PODate: string,
    POGST: number,
    PONetAmount: string | number | null,
    POQty: number,
    PORAte: number,
    PartyCode: string,
    PartyName: string,
    Pendingqty: number | null,
    ReOrder: number,
    RecieveQty: number,
    Remark: string,
    Reqno: string,
    Reqqty: number,
    RequirementDate: string,
    SKU: string,
    SKU1: string,
    TermsCondition: string | null,
    docid: string,
    indqty: number | null,
    reqdt: string | null,
}

export interface PendingIndentFilterData{
    AsOnDate: string;
    ItemCode: string;
    ItemName: string;
    ItemGroupCode: string;
    ItemGroupName: string;
    DepartmentName: string;
    Department: string;
    CostCenterName: string;
    CostCenter: string;
    HODCode: string;
    HODName: string;
    IndentDocID: string;
    IndentNo: string | number;
}
