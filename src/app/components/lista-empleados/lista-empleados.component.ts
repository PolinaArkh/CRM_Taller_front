import { Component, inject, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../interfaces/empleado.interface';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-empleados',
  imports: [MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './lista-empleados.component.html',
  styleUrl: './lista-empleados.component.scss',
})
export class ListaEmpleadosComponent implements OnInit {
  empleadoService = inject(EmpleadoService);
  dataSource: Empleado[] = [];
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'email',
    'departamento',
    'acciones',
  ];

  async ngOnInit() {
    this.dataSource = await this.empleadoService.mostrarEmpleados();
  }
}