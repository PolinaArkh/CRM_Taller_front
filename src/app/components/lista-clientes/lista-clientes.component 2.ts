import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../interfaces/cliente.interface';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-lista-clientes',
  imports: [MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.scss',
})
export class ListaClientesComponent {
  clientesService = inject(ClientesService);
  dataSource: Cliente[] = [];
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'telefono',
    'email',
    'direccion',
    'fechaRegistro',
    'acciones',
  ];

  async ngOnInit() {
    const respuesta = await this.clientesService.getClientes();
    this.dataSource = respuesta.data;
  }
}
