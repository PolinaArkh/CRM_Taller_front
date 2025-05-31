import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Reparacion } from '../../interfaces/reparacion.interface';
import { ReparacionService } from '../../services/reparacion.service';
import { UsuarioService } from '../../services/usuario.service';
import { FixCarDialogComponent } from '../fix-car-dialog/fix-car-dialog.component';
import { ModifyCarDialogComponent } from '../modify-car-dialog/modify-car-dialog.component';

@Component({
  selector: 'app-lista-reparaciones-coche',
  imports: [MatCardModule, MatButtonModule, DatePipe, CurrencyPipe],
  templateUrl: './lista-reparaciones-coche.component.html',
  styleUrl: './lista-reparaciones-coche.component.scss',
})
export class ListaReparacionesCocheComponent {
  @Input() reparaciones: Reparacion[] | undefined;
  reparacionService = inject(ReparacionService);
  @Output() recargarDatos = new EventEmitter();

  dialog = inject(MatDialog);
  usuarioService = inject(UsuarioService);
  rol: string | null = null;

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.usuarioService.getDecodedToken(token);
      this.rol = decoded?.role || null;
    }
  }

  showDialog(reparacion: Reparacion): void {
    const dialogRef = this.dialog.open(ModifyCarDialogComponent, {
      width: '500px',
      data: { reparacion },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'recargar') {
        this.recargarDatos.emit();
      }
    });
  }

  showFixDialog(reparacion: Reparacion): void {
    this.dialog.open(FixCarDialogComponent, {
      width: '500px',
      data: { reparacion },
    });
  }
}
