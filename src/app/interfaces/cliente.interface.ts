import { Coche } from './coche.interface';
export interface Cliente {
  ClienteID: number;
  Nombre: string;
  Apellido: string;
  Telefono: string;
  Email: string;
  Direccion: string;
  FechaRegistro: string;
}
export interface Cliente2 {
  cliente: Cliente;
  coche: Coche;
}
