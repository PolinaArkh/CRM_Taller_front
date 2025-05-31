import { Cliente } from './../../interfaces/cliente.interface';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';
import { Coche } from '../../interfaces/coche.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.component.html',
  styleUrl: './cliente-registro.component.scss',
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class ClienteRegistroComponent {
  private _formBuilder = inject(FormBuilder).nonNullable;
  snackbarService = inject(SnackbarService);
  clienteService = inject(ClientesService);
  router = inject(Router);

  clienteFormGroup = this._formBuilder.group({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{9}$/),
    ]),
    email: new FormControl('', [Validators.email]),
    direccion: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  cocheFormGroup = this._formBuilder.group({
    matricula: ['', Validators.required],
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    año: [0, Validators.required],
    vin: ['', Validators.required],
    color: ['', Validators.required],
  });
  isEditable = true;

  async onSubmit() {
    if (!this.clienteFormGroup.valid || !this.cocheFormGroup.valid) {
      this.clienteFormGroup.markAllAsTouched();
      this.cocheFormGroup.markAllAsTouched();
      return;
    }

    const cliente = this.clienteFormGroup.value as Cliente;
    const coche = this.cocheFormGroup.value as Coche;

    if (!cliente || !coche) {
      console.error('Error: Cliente or Coche data is missing.');
      return;
    }

    try {
      const result = await this.clienteService.crearClienteConCoche({
        cliente,
        coche,
      });

      this.snackbarService.showSnackBar('✅ Cliente registrado');
      this.router.navigateByUrl('/dashboard/admin?tab=3');
    } catch (err) {
      console.error('Error creating Cliente and Coche:', err);
    }
  }
}
