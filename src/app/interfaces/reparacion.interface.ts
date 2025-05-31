export interface Reparacion {
  ReparacionID?: number;
  FechaEntrada?: Date;
  FechaSalida?: string;
  Descripcion: string;
  CocheMatricula: string;
  AdminRecepcionID?: number;
  NombreEstado?: 'pendiente' | 'en_proceso' | 'finalizado';
  Presupuesto?: number;
  MecanicoAsignadoID?: number;
  DiagnosticoMecanico?: string;
}
