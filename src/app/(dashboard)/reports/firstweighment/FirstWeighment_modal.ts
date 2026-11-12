export interface FirstWeighInterface {
    FirstWeighmentNo: string;
    FirstWeight: number;
    ItemName: string;
    LoadUn: string;
    Party1stTimeWeighment: string;
    PartyName: string;
    SecondWeight: number | null;
    VehicleNo: string;
    WeighmentDate: string;
}

export interface FirstWeigh{
    FromDate: string;
    ToDate: string;
    LoadType: string;
}
