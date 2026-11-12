export interface VGPIn {
    success: boolean;
    data: GateInListInterface[];
    message: string;
}

export interface GateInListInterface {
    LoadUnload: string;
    PartyCode: string;
    RecId: string;
    Remark: string;
    V_Date: string;
    V_No: number;
    V_Time: string;
    VehicleNo: string;
    VehicleType: string;
    WeighType: string;
    WeighYN: string;
    Transporter: string;
    Driver: string;
    Stockdependon: string;
    Labtestdependon: string;
    PartyName: string;
    GateOut: boolean;
    DocId: string;
}

export interface GateEntryOutDetail {
    strDocId: string;
    strOutDate: string;
    StrOutTime: string;
    StrOutByUser: string;
    StrGateOutSlipNo: string;
}
