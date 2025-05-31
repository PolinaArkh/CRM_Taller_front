import { Component, inject, Input } from '@angular/core';
import { ReparacionService } from '../../services/reparacion.service';
import { Reparacion } from '../../interfaces/reparacion.interface';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-reparaciones',
  imports: [
    MatButtonModule,
    MatTableModule,
    CurrencyPipe,
    NgClass,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './lista-reparaciones.component.html',
  styleUrl: './lista-reparaciones.component.scss',
})
export class ListaReparacionesComponent {
  @Input() reparaciones: Reparacion[] | undefined;
  reparacionService = inject(ReparacionService);
  dataSource: Reparacion[] = [];
  displayedColumns: (keyof Reparacion | 'acciones')[] = [
    'ReparacionID',
    'FechaEntrada',
    'CocheMatricula',
    'Descripcion',
    'NombreEstado',
    'Presupuesto',
    'DiagnosticoMecanico',
    'acciones',
  ];

  async ngOnInit() {
    if (!this.reparaciones) {
      this.dataSource = await this.reparacionService.mostrarReparaciones();
    }
    if (this.reparaciones) {
      this.dataSource = this.reparaciones;
    }
  }
}
