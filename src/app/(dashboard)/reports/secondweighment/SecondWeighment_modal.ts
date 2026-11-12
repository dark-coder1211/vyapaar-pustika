export interface SecondWeighInterface {
    DiffWeight: number;
    FirstWeighmentNo: string;
    FirstWeight: number;
    ItemName: string;
    LoadUn: string;
    Net_Weight: number;
    Party1stTimeWeighment: string;
    PartyName: string;
    SecondWeight: number | null;
    VehicleNo: string;
    WeighmentDate: string;
}

export interface SecondWeigh{
    FromDate: string;
    ToDate: string;
    LoadType: string;
}
