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
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReparacionService } from '../../services/reparacion.service';
import { Reparacion } from '../../interfaces/reparacion.interface';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-modify-car-dialog',
  templateUrl: './modify-car-dialog.component.html',
  styleUrl: './modify-car-dialog.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class ModifyCarDialogComponent {
  @Input() matricula = '';
  reparacionService = inject(ReparacionService);
  snackbarService = inject(SnackbarService);
  reparacion: Reparacion;
  readonly dialogRef = inject(MatDialogRef<ModifyCarDialogComponent>);
  readonly fb = inject(FormBuilder);

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reparacion: Reparacion }
  ) {
    this.reparacion = data.reparacion;

    this.form = this.fb.group({
      DiagnosticoMecanico: [
        this.reparacion.DiagnosticoMecanico,
        Validators.required,
      ],
      Presupuesto: [
        this.reparacion.Presupuesto,
        [Validators.required, Validators.min(0)],
      ],
    });
  }

  async submitForm() {
    if (this.form.valid) {
      const { DiagnosticoMecanico, Presupuesto } = this.form.value;

      try {
        if (this.reparacion.ReparacionID !== undefined) {
          await this.reparacionService.changeReparacionById(
            this.reparacion.ReparacionID,
            {
              DiagnosticoMecanico,
              Presupuesto,
            }
          );
          this.snackbarService.showSnackBar('✅ Reparacion Modificada');
          this.dialogRef.close('recargar');
        }
      } catch (err) {
        console.error('Error updating reparacion:', err);
      }
    }
  }
}
