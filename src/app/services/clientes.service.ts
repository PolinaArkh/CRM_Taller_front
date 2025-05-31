import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';
import { inject } from '@angular/core';
import { Coche } from './../interfaces/coche.interface';
import { lastValueFrom } from 'rxjs';

export interface Respuesta {
  message: string;
  data: Cliente[];
}

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private baseUrl = 'http://localhost:3000/api/clientes';
  private httpClient = inject(HttpClient);

  crearCliente(body: Cliente) {
    return lastValueFrom(this.httpClient.post<Cliente>(this.baseUrl, body));
  }

  crearClienteConCoche(body: { cliente: Cliente; coche: Coche }) {
    return lastValueFrom(
      this.httpClient.post<Cliente>(`${this.baseUrl}/coche`, body)
    );
  }

  getClientes() {
    return lastValueFrom(this.httpClient.get<Respuesta>(this.baseUrl));
  }
}
