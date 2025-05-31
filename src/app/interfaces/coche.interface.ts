export interface Coche {
  Matricula: string;
  Marca: string;
  Modelo: string;
  Ano: number;
  VIN: string;
  Color: string;
  ClienteID: number;
  FechaRegistro: string;
  TotalReparaciones?: number;
}
