import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../services/usuario.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  usuarioService = inject(UsuarioService);
  snackbarService = inject(SnackbarService);
  router = inject(Router);
  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.min(3),
      Validators.maxLength(100),
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.min(3),
      Validators.maxLength(100),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('((?=.*\\d)(?=.*[A-Z])(?=.*[a-z]).{8,30})'),
    ]),
    departamento: new FormControl('', [
      Validators.required,
      this.departamentoValidator,
    ]),
  });

  departamentoValidator(control: AbstractControl) {
    const validRoles = ['admin', 'mecanico'];
    if (control.value && !validRoles.includes(control.value)) {
      return { invalidDepartamento: true };
    }
    return null;
  }

  async onSubmit() {
    const values = this.registerForm.value;

    try {
      await this.usuarioService.registro(values);
      this.snackbarService.showSnackBar('Registro realizado correctamente');
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
      let errorMessage =
        'Error durante el registro. Por favor, inténtelo de nuevo.';

      if (error && typeof error === 'object') {
        const errorObj = error as {
          error?: { message?: string } | string;
          message?: string;
        };
        if (errorObj.error) {
          if (
            typeof errorObj.error === 'object' &&
            typeof errorObj.error.message === 'string'
          ) {
            errorMessage = errorObj.error.message;
          } else if (typeof errorObj.error === 'string') {
            errorMessage = errorObj.error;
          }
        } else if (typeof errorObj.message === 'string') {
          errorMessage =
            (error as { message?: string }).message || errorMessage;
        }
      }
      this.snackbarService.showSnackBar(`${errorMessage}`);
    }
  }
}
