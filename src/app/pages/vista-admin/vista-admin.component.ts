import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaCochesComponent } from '../../components/lista-coches/lista-coches.component';
import { ListaEmpleadosComponent } from '../../components/lista-empleados/lista-empleados.component';
import { ListaReparacionesComponent } from '../../components/lista-reparaciones/lista-reparaciones.component';
import { ListaClientesComponent } from '../../components/lista-clientes/lista-clientes.component';

@Component({
  selector: 'app-vista-admin',
  imports: [
    MatTabsModule,
    ListaEmpleadosComponent,
    ListaReparacionesComponent,
    ListaCochesComponent,
    ListaClientesComponent,
  ],
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.scss'],
})
export class VistaAdminComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);

  selectedTabIndex = 0;

  async ngOnInit() {
    if (this.route) {
      this.route.queryParams.subscribe((params) => {
        const tab = params['tab'];
        this.selectedTabIndex = tab ? +tab : 0;
      });
    }
  }

  onTabChange(index: number) {
    this.selectedTabIndex = index;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: index },
      queryParamsHandling: 'merge',
    });
  }
}
