export interface StockValReportFilterData {
    FromDate: string;
    ToDate: string;
    ItemName: string;
    ItemCode: string;
    ItemGroupCode: string;
    ItemGroupName: string;
    GodownCode: string;
    GodownName: string;
    ItemCategoryCode: string;
    ItemCategoryName: string;
    Site_Code: string;
    Site_Name: string;
    Method: string;
    MethodName: string;
    Classification: string;
    ClassificationName: string;
    Variety: string;
    VarietyName: string;
}

export interface StockValReportInterface{
    ClosingQty: number;
    ClosingValue: number;
    CommuQty: number;
    CommuValue: number;
    IssueQty: number;
    IssueValue: number;
    ItemCode: string;
    ItemManualCode: string;
    ItemName: string;
    OpeningQty: number;
    OpeningValue: number;
    RecieveQty: number;
    RecieveValue: number;
    Unit: string;
}
