import { Login } from '../interfaces/login.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = 'http://localhost:3000/api/empleados';
  private httpClient = inject(HttpClient);

  login(body: Login) {
    return lastValueFrom(
      this.httpClient.post(`${this.baseUrl}/login`, body)
    );
  }
}
