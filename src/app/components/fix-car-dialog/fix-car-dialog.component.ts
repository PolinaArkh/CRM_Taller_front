import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReparacionService } from '../../services/reparacion.service';
import { Reparacion } from '../../interfaces/reparacion.interface';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-fix-car-dialog',
  templateUrl: './fix-car-dialog.component.html',
  styleUrl: './fix-car-dialog.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class FixCarDialogComponent {
  @Input() matricula = '';
  router = inject(Router);
  dialog = inject(MatDialog);
  reparacionService = inject(ReparacionService);
  snackbarService = inject(SnackbarService);
  reparacion: Reparacion;
  readonly dialogRef = inject(MatDialogRef<FixCarDialogComponent>);
  readonly fb = inject(FormBuilder);
  form!: FormGroup<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reparacion: Reparacion }
  ) {
    this.reparacion = data.reparacion;
  }

  async marcarComoArreglado(reparacion: Reparacion) {
    if (!reparacion || reparacion.ReparacionID === undefined) {
      return;
    }

    const response = await this.reparacionService.completeReparacionById(
      reparacion.ReparacionID,
      {
        Descripcion: reparacion.Descripcion,
        Presupuesto: reparacion.Presupuesto,
      }
    );

    if (response.result) {
      this.dialog.closeAll();
      this.snackbarService.showSnackBar('✅ Reparacion Arreglada');
      this.router.navigateByUrl('/dashboard/admin');
    }
  }
}
