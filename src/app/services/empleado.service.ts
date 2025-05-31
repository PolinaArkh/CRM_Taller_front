import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/empleados';

  getMecanicos(): Promise<Empleado[]> {
    return lastValueFrom(
      this.http.get<Empleado[]>(`${this.baseUrl}/mecanicos`)
    );
  }

  mostrarEmpleados() {
    return lastValueFrom(this.http.get<Empleado[]>(this.baseUrl));
  }

  getEmpleadoById(id: number): Promise<Empleado> {
    return lastValueFrom(this.http.get<Empleado>(`${this.baseUrl}/${id}`));
  }
}
