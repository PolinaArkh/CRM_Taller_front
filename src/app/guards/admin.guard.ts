import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);
  const token = localStorage.getItem('token');
  const decodedToken = token
    ? usuarioService.getDecodedToken(token)
    : undefined;

  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  if (decodedToken?.role !== 'admin') {
    router.navigateByUrl('/dashboard/mecanico');
    return false;
  }

  return true;
};
