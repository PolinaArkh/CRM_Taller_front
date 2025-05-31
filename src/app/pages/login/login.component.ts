import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SnackbarService } from '../../services/snackbar.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  usuarioService = inject(UsuarioService);
  snackbarService = inject(SnackbarService);
  router = inject(Router);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('((?=.*\\d)(?=.*[A-Z])(?=.*[a-z]).{8,30})'),
    ]),
  });

  async onSubmit() {
    try {
      if (this.loginForm.invalid) return;
      const credentials = {
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? '',
      };

      const response = await this.usuarioService.login(credentials);
      if (response.token) {
        this.snackbarService.showSnackBar('✅ Login correcto');
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/dashboard/admin');
      }
    } catch (error) {
      console.error('Login FAIL:', error);

      this.snackbarService.showSnackBar(
        '🔴 Usuario y/o contraseña incorrectos 🔴'
      );
    }
  }
}
