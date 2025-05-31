import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

export const mecanicGuard: CanActivateFn = () => {
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

  if (decodedToken?.role !== 'mecanico') {
    router.navigateByUrl('/dashboard/admin');
    return false;
  }

  return true;
};
