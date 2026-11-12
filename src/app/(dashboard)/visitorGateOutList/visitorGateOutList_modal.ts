
export interface MTD {
    GateOutBy: string | null;     // Can be null if not yet gated out
    DocId: string;
    V_Type: string;
    V_No: string;
    V_Date: string;               // Formatted as 'dd/MMM/yyyy'
    V_Prefix: string;
    InTime: string;
    OutDate: string | null;       // Can be null if not yet gated out
    OutTime: string | null;       // Can be null if not yet gated out
    Purpose: string;
    Name: string;
    Address: string;
    CityCode: string;
    CityName: string;
    PhMob: string;
    PersonToMeet: string;
    Vehicle: string;
    Site_Code: string;
    PreparedBy: string;
    ModifiedBy: string;
    U_EntDt: string;              // Formatted as 'dd/MMM/yyyy'
    U_AE: string;
    RecId: string;
}


export interface VGPOut {
    success: boolean;
    data: MTD[];
    message: string;
}
