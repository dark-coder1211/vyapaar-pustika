export interface StockQtyReportFilterData {
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
    Classification: string;
    ClassificationName: string;
    Variety: string;
    VarietyName: string;
}

export interface StockQtyReportInterface{
    ClosingQty: number;
    CommuQty: number;
    IssueQty: number;
    ItemCode: string;
    ItemManualCode: string;
    ItemName: string;
    OpeningQty: number;
    RecieveQty: number;
    Unit: string;
}
