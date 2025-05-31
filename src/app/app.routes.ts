import { Routes } from '@angular/router';
import { NavBarComponent } from './components/navbar/navbar.component';
import { authGuard } from './guards/auth.guard';
import { ClienteRegistroComponent } from './pages/cliente-registro/cliente-registro.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReparacionCardComponent } from './pages/reparacion-card/reparacion-card.component';
import { EmpleadosCardComponent } from './components/empleados-card/empleados-card.component';
import { ReparacionesRegistroComponent } from './pages/reparaciones-registro/reparaciones-registro.component';
import { VistaAdminComponent } from './pages/vista-admin/vista-admin.component';
import { VistaEmpleadoComponent } from './pages/vista-empleado/vista-empleado.component';
import { adminGuard } from './guards/admin.guard';
import { mecanicGuard } from './guards/mecanic.guard';
import { CreateCocheComponent } from './pages/create-coche/create-coche.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: NavBarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'coche/nuevo',
        canActivate: [adminGuard],
        component: CreateCocheComponent,
        title: 'Nuevo Coche',
      },
      {
        path: 'cliente/nuevo',
        canActivate: [adminGuard],
        component: ClienteRegistroComponent,
        title: 'NUEVO CLIENTE',
      },
      {
        path: 'reparacion/registro',
        canActivate: [adminGuard],
        component: ReparacionesRegistroComponent,
        title: 'Nueva Reparacion',
      },
      {
        path: 'admin',
        canActivate: [adminGuard],
        component: VistaAdminComponent,
        title: 'Admin',
      },
      {
        path: 'mecanico',
        canActivate: [mecanicGuard],
        component: VistaEmpleadoComponent,
        title: 'Mecanico',
      },
      {
        path: 'reparacion/:matricula',
        component: ReparacionCardComponent,
        title: 'Detalle coche',
      },
      {
        path: 'empleado/:id',
        canActivate: [adminGuard],
        component: EmpleadosCardComponent,
        title: 'Detalle Empleado',
      },
      {
        path: 'profile',
        component: EmpleadosCardComponent,
        canActivate: [authGuard],
        title: 'My Profile',
        data: { isProfile: true },
      },
    ],
  },

];
