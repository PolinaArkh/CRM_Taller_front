import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Coche } from '../interfaces/coche.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CocheService {
  mostrarCoches() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3000/api/coches'; /*/cliente */
  private httpClient = inject(HttpClient);

  crearCoche(body: Coche) {
    return lastValueFrom(
      this.httpClient.post<{
        message: string;
        data: Coche;
      }>(this.baseUrl, body)
    );
  }

  getCoches() {
    return lastValueFrom(this.httpClient.get<Coche[]>(`${this.baseUrl}`));
  }

  getCocheByMatricula(matricula: string) {
    return lastValueFrom(
      this.httpClient.get<Coche>(`${this.baseUrl}/${matricula}`)
    );
  }

  getCochesByMecanico(mecanicoId: number) {
    return lastValueFrom(
      this.httpClient.get<Coche[]>(`${this.baseUrl}/mecanico/${mecanicoId}`)
    );
  }
}
