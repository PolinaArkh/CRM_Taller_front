import { Component, Input, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { UsuarioService } from '../../services/usuario.service';
import { Empleado } from '../../interfaces/empleado.interface';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-empleados-card',
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './empleados-card.component.html',
  styleUrls: ['./empleados-card.component.scss'],
})
export class EmpleadosCardComponent implements OnInit {
  @Input() empleadoId!: number;
  empleadoService = inject(EmpleadoService);
  usuarioService = inject(UsuarioService);
  route = inject(ActivatedRoute);
  empleado: Empleado | null = null;

  async ngOnInit() {
    let empleadoId: number | null = null;

    const isProfile = this.route.snapshot.data['isProfile'];
    if (isProfile) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.usuarioService.getDecodedToken(token);
        if (decodedToken) {
          empleadoId = decodedToken.id;
          console.log('Authenticated EmpleadoID:', empleadoId);
        } else {
          console.error('Failed to decode token.');
        }
      } else {
        console.error('No token found in localStorage.');
      }
    } else {
      empleadoId = this.route.snapshot.params['id'];
      console.log('EmpleadoID from route:', empleadoId);
    }

    if (empleadoId) {
      try {
        this.empleado = await this.empleadoService.getEmpleadoById(+empleadoId);
        console.log('Empleado Data:', this.empleado);
        console.log('Raw Departamento:', this.empleado?.Departamento);

        if (this.empleado?.Departamento) {
          const normalizedDepartamento = this.empleado.Departamento.trim().toLowerCase();
          if (normalizedDepartamento === 'admin') {
            this.empleado.Departamento = 'Admin';
          } else {
            this.empleado.Departamento = 'Mecanic';
          }
        }
      } catch (error) {
        console.error('Error fetching empleado data:', error);
      }
    }
  }
}