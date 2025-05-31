import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';
import { Login } from '../interfaces/login.interface';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../interfaces/decoded-token.interface';

export interface Respuesta {
  message: string;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = 'http://localhost:3000/api/empleados';
  private httpClient = inject(HttpClient);

  registro(body: Usuario) {
    return lastValueFrom(
      this.httpClient.post<Respuesta>(`${this.baseUrl}/registro`, body)
    );
  }

  login(body: Login) {
    return lastValueFrom(
      this.httpClient.post<Respuesta>(`${this.baseUrl}/login`, body)
    );
  }

  getDecodedToken(token: string): DecodedToken | undefined {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Token error:', error);
      return undefined;
    }
  }
}
