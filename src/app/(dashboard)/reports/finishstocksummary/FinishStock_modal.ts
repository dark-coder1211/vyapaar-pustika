export interface FinishStockSummaryInterface {
    IssueSaleQty: number;
    IssueSaleReel: number;
    OpeningQty: number;
    OpeningReel: number;
    OtherIssueQty: number;
    OtherIssueReel: number;
    OtherRecieveQty: number;
    OtherRecieveReel: number;
    ProductionQty: number;
    ProductionReel: number;
    ItemName: string;
    Godown: string;
    BFName: string;
    GSMName: string;
    SizeReel: number;
    SizeHeight: number;
    SizeUnit: string;
    TotalIssueQty: number;
    TotalIssueReel: number;
    TotalRecieveQty: number;
    TotalRecieveReel: number;
    ClosingQty: number;
    ClosingReel: number;
    Size: string;
}

export interface FinishStockSummaryFilterData {
    FromDate: string;
    ToDate: string;
    ItemName: string;
    ItemCode: string;
    BFName: string;
    BFCode: string;
    GSMName: string;
    GSMCode: string;
    Width: string;
    WidthNo: string;
    Length: string;
    LengthNo: string;
    SizeUnit: string;
    SizeUnitName: string;
    Site_Name: string;
    Site_Code: string;
    Godown: string;
    GodownName: string;
    ItemGroupCode: string;
    ItemGroupName: string;
}
