export interface StoreIssueReceiveFilterData {
    FromDate: string;
    ToDate: string;
    ItemName: string;
    ItemCode: string;
    ItemGroupCode: string;
    ItemGroupName: string;
    DepartmentCode: string;
    DepartmentName: string;
    CostCenterCode: string;
    CostCenterName: string;
    Site_Code: string;
    Site_Name: string;
    GodownCode: string;
    GodownName: string;
}

export interface StoreIssueReceiveInterface {
    Godown: string;
    ItemName: string;
    RQty: number;
    Rate: number;
    RecID: string;
    Remarks: string;
    Staff: string;
    Unit1: string;
    V_Date: string;
    Value: number;
}
