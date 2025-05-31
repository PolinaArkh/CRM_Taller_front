import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { DecodedToken } from '../../interfaces/decoded-token.interface';
import { UsuarioService } from '../../services/usuario.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgOptimizedImage,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    ThemeToggleComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavBarComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  router = inject(Router);
  usuarioService = inject(UsuarioService);
  decodedToken: DecodedToken | undefined;
  private route: ActivatedRoute = inject(ActivatedRoute);
  routesByRole: Record<string, Routes> = {
    admin: [
      {
        path: 'coche/nuevo',
        title: 'Nuevo Coche',
      },
      {
        path: 'cliente/nuevo',
        title: 'Nuevo Cliente',
      },
      {
        path: 'reparacion/registro',
        title: 'Nueva Reparación',
      },
      {
        path: 'admin',
        title: 'Admin',
      },
    ],
    mecanico: [
      {
        path: 'mecanico',
        title: 'Mecánico',
      },
    ],
  };
  actualRoute: string | undefined;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit() {
    this.router.events.subscribe(() => {
      const childRoute = this.route.snapshot.firstChild;
      const title = childRoute?.routeConfig?.title;
      this.actualRoute = typeof title === 'string' ? title : undefined;
    });

    const initialChildRoute = this.route.snapshot.firstChild;
    const initialTitle = initialChildRoute?.routeConfig?.title;
    this.actualRoute =
      typeof initialTitle === 'string' ? initialTitle : undefined;

    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = this.usuarioService.getDecodedToken(token);
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  onSignOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
