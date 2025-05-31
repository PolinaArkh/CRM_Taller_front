import { inject, Injectable } from '@angular/core';
import { Reparacion } from '../interfaces/reparacion.interface';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface ReparacionUpdated {
  Descripcion?: string;
  Presupuesto?: number;
  DiagnosticoMecanico?: string;
  NombreEstado?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReparacionService {
  private baseUrl = 'http://localhost:3000/api/reparaciones';
  private httpClient = inject(HttpClient);

  mostrarReparaciones() {
    return lastValueFrom(
      this.httpClient.get<Reparacion[]>(
        'http://localhost:3000/api/reparaciones'
      )
    );
  }

  crearReparacion(body: Reparacion) {
    return lastValueFrom(this.httpClient.post(this.baseUrl, body));
  }

  getReparacionByMatricula(matricula: string) {
    return lastValueFrom(
      this.httpClient.get<Reparacion[]>(`${this.baseUrl}/coches/${matricula}`)
      );
  }

  getReparacionesByMecanico(mecanicoId: number) {
    return lastValueFrom(
      this.httpClient.get<Reparacion[]>(
        `http://localhost:3000/api/reparaciones/mecanico/${mecanicoId}`
      )
    );
  }

  changeReparacionById(id: number, body: ReparacionUpdated) {
    const reparacion = {
      Descripcion: body.Descripcion,
      Presupuesto: body.Presupuesto,
      DiagnosticoMecanico: body.DiagnosticoMecanico,
      NombreEstado: 'en_proceso',
    };

    return lastValueFrom(
      this.httpClient.patch<{ message: string; result: Reparacion }>(
        `${this.baseUrl}/${id}`,
        reparacion
      )
    );
  }

  completeReparacionById(id: number, body: ReparacionUpdated) {
    const reparacion = {
      Descripcion: body.Descripcion,
      Presupuesto: body.Presupuesto,
      DiagnosticoMecanico: body.DiagnosticoMecanico,
      NombreEstado: 'finalizado',
    };
    return lastValueFrom(
      this.httpClient.patch<{ message: string; result: Reparacion }>(
        `${this.baseUrl}/${id}`,
        reparacion
      )
    );
  }

  changeNombreEstadoById(id: number, body: ReparacionUpdated) {
    return lastValueFrom(
      this.httpClient.patch<Reparacion>(`${this.baseUrl}/${id}`, body)
    );
  }
}
