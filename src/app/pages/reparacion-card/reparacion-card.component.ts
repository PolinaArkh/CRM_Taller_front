import { Component, inject, Input, OnChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DetalleCocheComponent } from '../../components/detalle-coche/detalle-coche.component';
import { ListaReparacionesCocheComponent } from '../../components/lista-reparaciones-coche/lista-reparaciones-coche.component';
import { Coche } from '../../interfaces/coche.interface';
import { Reparacion } from '../../interfaces/reparacion.interface';
import { CocheService } from '../../services/coche.service';
import { ReparacionService } from '../../services/reparacion.service';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-reparacion-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    DetalleCocheComponent,
    ListaReparacionesCocheComponent,
    MatIconModule,
  ],
  templateUrl: './reparacion-card.component.html',
  styleUrl: './reparacion-card.component.scss',
})
export class ReparacionCardComponent implements OnChanges {
  cocheService = inject(CocheService);
  reparacionService = inject(ReparacionService);
  location = inject(Location);
  usuarioService = inject(UsuarioService);
  coche: Coche | undefined;
  @Input() matricula = '';

  reparaciones: Reparacion[] = [];
  rol: string | null = null;

constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.usuarioService.getDecodedToken(token);
      this.rol = decoded?.role || null;
    }
  }

  async ngOnChanges() {
    if (this.matricula) {
      try {
        this.coche = await this.cocheService.getCocheByMatricula(
          this.matricula
        );
        this.reparaciones =
          await this.reparacionService.getReparacionByMatricula(this.matricula);
        
        if (this.rol === 'mecanico') {
          this.reparaciones = this.reparaciones.filter(reparacion => reparacion.NombreEstado === 'en_proceso');
        } 
       
      } catch (error) {
        console.error('Error fetching coche data:', error);
      }
    }
  }

  volverAtras() {
    this.location.back();
  }

  onRecargarDatos(): void {
    this.ngOnChanges();
  }

  private async fetchCocheData(matricula: string) {
    this.coche = await this.cocheService.getCocheByMatricula(matricula);
  }

  private async fetchReparaciones(matricula: string) {
    this.reparaciones = await this.reparacionService.getReparacionByMatricula(
      matricula
    );
  }
}
