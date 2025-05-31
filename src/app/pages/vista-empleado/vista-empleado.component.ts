import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ListaCochesComponent } from '../../components/lista-coches/lista-coches.component';
import { ListaReparacionesComponent } from '../../components/lista-reparaciones/lista-reparaciones.component';
import { Coche } from '../../interfaces/coche.interface';
import { Reparacion } from '../../interfaces/reparacion.interface';
import { CocheService } from './../../services/coche.service';
import { ReparacionService } from './../../services/reparacion.service';

@Component({
  selector: 'app-vista-empleado',
  imports: [
    MatButtonModule,
    CommonModule,
    MatTableModule,
    MatBadgeModule,
    MatTabsModule,
    ListaReparacionesComponent,
    ListaCochesComponent,
  ],
  templateUrl: './vista-empleado.component.html',
  styleUrls: ['./vista-empleado.component.scss'],
})
export class VistaEmpleadoComponent implements OnInit {
  selectedTabIndex: unknown;
  onTabChange() {
    throw new Error('Method not implemented.');
  }
  cocheService = inject(CocheService);
  reparacionService = inject(ReparacionService);

  coches: Coche[] = [];
  dataSource: Coche[] | undefined;

  reparaciones: Reparacion[] = [];
  reparacionesColumns: string[] = [
    'ReparacionID',
    'FechaEntrada',
    'Matricula',
    'Descripcion',
    'NombreEstado',
    'Presupuesto',
    'Diagnostico',
    'Acciones',
  ];
  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const empleadoId = decodedToken.id;

      this.coches = await this.cocheService.getCochesByMecanico(empleadoId);

      this.reparaciones =
        await this.reparacionService.getReparacionesByMecanico(empleadoId);
    }
  }
}
