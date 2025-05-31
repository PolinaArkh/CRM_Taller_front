import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { Cliente } from '../../interfaces/cliente.interface';
import { ClientesService } from '../../services/clientes.service';
import { MatSelectModule } from '@angular/material/select';
import { CocheService } from '../../services/coche.service';
import { Coche } from '../../interfaces/coche.interface';

@Component({
  selector: 'app-create-coche',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './create-coche.component.html',
  styleUrl: './create-coche.component.scss',
})
export class CreateCocheComponent {
  snackbarService = inject(SnackbarService);
  router = inject(Router);
  clientesService = inject(ClientesService);
  cochesService = inject(CocheService);
  clientes: Cliente[] | undefined;
  cocheForm = new FormGroup({
    matricula: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Z0-9]{1,10}'),
    ]),
    marca: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    modelo: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    ano: new FormControl('', [Validators.required, Validators.min(1886)]),
    vin: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    clienteID: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  async ngOnInit() {
    const respuesta = await this.clientesService.getClientes();
    this.clientes = respuesta.data;
  }

  onCancel() {
    this.cocheForm.reset();
  }

  async onSubmit() {
    if (!this.cocheForm.valid) {
      this.cocheForm.markAllAsTouched();
    }

    const coche: Coche = {
      Matricula: this.cocheForm.value.matricula!,
      Marca: this.cocheForm.value.marca!,
      Modelo: this.cocheForm.value.modelo!,
      Ano: parseInt(this.cocheForm.value.ano!, 10),
      VIN: this.cocheForm.value.vin!,
      Color: this.cocheForm.value.color!,
      ClienteID: parseInt(this.cocheForm.value.clienteID!, 10),
      FechaRegistro: new Date().toISOString(),
    };
    const result = await this.cochesService.crearCoche(coche);

    if (!result.data) {
      this.snackbarService.showSnackBar('🔴 Error Registro');
    }

    this.snackbarService.showSnackBar('✅ Coche registrado');
    this.router.navigateByUrl('/dashboard/admin?tab=2');
  }
}
