export interface GateOutListInterface {
    GateOutDate: string;
    GateOutTime: string;
    GateOutBy: string | null;
    Labtestdependon: string | null;
    LoadUnload: string;
    RecId: string;
    Remark: string | null;
    Stockdependon: string | null;
    Supplier: string | null;
    Transporter: string | null;
    V_Date: string;
    V_No: string;
    V_Time: string;
    VehicleNo: string | null;
    VehicleType: string | null;
    WeighYN: string | null;
    Driver: string | null;
}


export interface VGPOut {
    success: boolean;
    data: GateOutListInterface[];
    message: string;
}
