import { Component, inject, Input } from '@angular/core';
import { Coche } from '../../interfaces/coche.interface';
import { CocheService } from '../../services/coche.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-coches',
  imports: [MatButtonModule, MatTableModule, RouterLink],
  templateUrl: './lista-coches.component.html',
  styleUrl: './lista-coches.component.scss',
})
export class ListaCochesComponent {
  @Input() coches: Coche[] | undefined;
  cocheService = inject(CocheService);
  dataSource: Coche[] = [];
  displayedColumns: string[] = [
    'Matricula',
    'Marca',
    'Modelo',
    'Ano',
    'VIN',
    'Color',
    'ClienteID',
    'FechaRegistro',
    'TotalReparaciones',
    'Acciones',
  ];

  async ngOnInit() {
    if (!this.coches) {
      this.dataSource = await this.cocheService.getCoches();
    }

    if (this.coches) {
      this.dataSource = this.coches;
    }
  }
}
