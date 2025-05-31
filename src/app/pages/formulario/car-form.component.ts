import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { Cliente } from '../../interfaces/cliente.interface';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
})
export class CarFormComponent implements OnInit {
  formRegistro: FormGroup;
  clientes: Cliente[] = [];

  constructor(private clienteService: ClientesService) {
    this.formRegistro = new FormGroup({
      marca: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      año: new FormControl('', [
        Validators.required,
        Validators.min(1900),
        Validators.max(new Date().getFullYear()),
      ]),
      vin: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.clienteService.getClientes().subscribe({
      next: (respuesta) => {
        this.clientes = respuesta.data;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
      },
    });
  }

  onSubmit() {
    this.formRegistro.markAllAsTouched();
    if (this.formRegistro.valid) {
      const clienteSeleccionado = this.clientes.find(
        (c) => c.Nombre === this.formRegistro.value.nombre
      );
      console.log('Cliente seleccionado:', clienteSeleccionado);
      
    }
  }

  checkError(controlName: string, errorName: string) {
    return (
      this.formRegistro.get(controlName)?.hasError(errorName) &&
      this.formRegistro.get(controlName)?.touched
    );
  }
}
