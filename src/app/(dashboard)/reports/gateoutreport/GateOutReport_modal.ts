export interface GateOut{
    FromDate: string;
    ToDate: string;
    LoadType: string;
}

export interface GateOutInterface{
    DriverMobileNo: string;
    DriverName: string;
    GateInDate: string;
    GateInDocID: string;
    GateInNo: string;
    GateInTime: string;
    GateOutDate: string | null;
    GateOutTime: string | null;
    ItemDescription: string;
    LoadUn: string;
    PartyName: string;
    VehicleNo: string;
    VehicleType: string;
}
