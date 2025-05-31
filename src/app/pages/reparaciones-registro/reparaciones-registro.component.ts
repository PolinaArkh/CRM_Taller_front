import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Empleado } from '../../interfaces/empleado.interface';
import { EmpleadoService } from '../../services/empleado.service';
import { MatButtonModule } from '@angular/material/button';
import { Reparacion } from '../../interfaces/reparacion.interface';
import { Coche } from '../../interfaces/coche.interface';
import { CocheService } from '../../services/coche.service';
import { ReparacionService } from '../../services/reparacion.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-reparaciones-registro',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reparaciones-registro.component.html',
  styleUrl: './reparaciones-registro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReparacionesRegistroComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  router = inject(Router);
  snackbarService = inject(SnackbarService);
  empleadosService = inject(EmpleadoService);
  cochesService = inject(CocheService);
  reparacionService = inject(ReparacionService);
  mecanicos: Empleado[] = [];
  coches: Coche[] = [];

  reparacionFormGroup = this._formBuilder.group<Reparacion>({
    Descripcion: ['', Validators.required],
    CocheMatricula: [''],
    Presupuesto: [0, Validators.required],
    MecanicoAsignadoID: [null, Validators.required],
  } as any);

  async ngOnInit() {
    this.mecanicos = await this.empleadosService.getMecanicos();
    this.coches = await this.cochesService.getCoches();
  }

  onSubmit() {
    if (!this.reparacionFormGroup.valid) {
      this.reparacionFormGroup.markAllAsTouched();
      return;
    }

    const reparacion: Reparacion = {
      Descripcion: this.reparacionFormGroup.value.Descripcion!,
      CocheMatricula: this.reparacionFormGroup.value.CocheMatricula!,
      Presupuesto: this.reparacionFormGroup.value.Presupuesto!,
      MecanicoAsignadoID: this.reparacionFormGroup.value.MecanicoAsignadoID!,
    };

    this.reparacionService
      .crearReparacion(reparacion)
      .then((result) => {
        this.snackbarService.showSnackBar('✅ Registro creado correctamente');
        this.router.navigateByUrl('/dashboard/admin?tab=1');
      })
      .catch((error) => {
        console.error('Error al crear la reparación:', error);
      });
  }
}
