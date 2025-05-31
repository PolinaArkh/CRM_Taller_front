# CRM Taller - Backend

Este proyecto es el backend de un sistema CRM para la gestión de un taller mecánico. Proporciona endpoints para la administración de usuarios, coches, reparaciones y más, utilizando Node.js, Express y MySQL.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## Requisitos

- Node.js >= 16.x
- Angular CLI >= 19.x
- npm >= 8.x

---

## Estructura del Proyecto

```bash
crm-taller-frontend/
├── src/
│   ├── app/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── interfaces/       # Interfaces TypeScript
│   │   ├── pages/            # Páginas principales
│   │   ├── services/         # Servicios para la lógica de negocio
│   │   ├── guards/           # Guards para proteger rutas
│   │   ├── interceptors/     # Interceptores HTTP
│   │   ├── app.routes.ts     # Configuración de rutas
│   │   ├── app.config.ts     # Configuración de la aplicación
│   │   ├── app.component.ts  # Componente raíz
│   ├── assets/               # Recursos estáticos
│   ├── styles.scss           # Estilos globales
├── angular.json              # Configuración de Angular CLI
├── package.json              # Dependencias y scripts
├── tsconfig.json             # Configuración de TypeScript
├── README.md
```

---

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/crm-taller-frontend.git
   cd crm-taller-frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm start
   ```

---

## Configuración

### Prettier

El proyecto utiliza Prettier para formatear el código. Puedes ejecutar el siguiente comando para formatear todos los archivos:

```bash
npm run format
```

### ESLint

Para verificar el código con ESLint:

```bash
npm run lint
```

Para corregir errores automáticamente:

```bash
npm run lint:fix
```

---

## Rutas

El proyecto utiliza Angular Router para la navegación. A continuación, se describen las rutas principales:

| Ruta                                    | Componente                      | Descripción                                              |
| --------------------------------------- | ------------------------------- | -------------------------------------------------------- |
| `/`                                     | `LandingPageComponent`          | Página de inicio con información general del taller.     |
| `/login`                                | `LoginComponent`                | Página de inicio de sesión para usuarios.                |
| `/register`                             | `RegisterComponent`             | Página de registro de nuevos usuarios.                   |
| `/dashboard/admin`                      | `VistaAdminComponent`           | Panel de administración para gestionar empleados.        |
| `/dashboard/mecanico`                   | `VistaEmpleadoComponent`        | Panel para mecánicos con lista de coches y reparaciones. |
| `/dashboard/cliente/nuevo`              | `ClienteRegistroComponent`      | Formulario para registrar nuevos clientes y coches.      |
| `/dashboard/reparacion/registro`        | `ReparacionesRegistroComponent` | Formulario para registrar nuevas reparaciones.           |
| `/dashboard/reparacion/card/:matricula` | `ReparacionCardComponent`       | Detalles de las reparaciones de un coche específico.     |

---

## Componentes

### Componentes Reutilizables

| Componente              | Ubicación                           | Descripción                                |
| ----------------------- | ----------------------------------- | ------------------------------------------ |
| `ThemeToggleComponent`  | `src/app/components/theme-toggle/`  | Selector de tema (claro/oscuro/sistema).   |
| `NavbarComponent`       | `src/app/components/navbar/`        | Barra de navegación principal.             |
| `SampleDialogComponent` | `src/app/components/sample-dialog/` | Diálogo para modificar reparaciones.       |
| `TestComponent`         | `src/app/components/test/`          | Componente de prueba con diseño adaptable. |

### Páginas Principales

| Página                          | Ubicación                              | Descripción                                              |
| ------------------------------- | -------------------------------------- | -------------------------------------------------------- |
| `LandingPageComponent`          | `src/app/pages/landing-page/`          | Página de bienvenida con información general del taller. |
| `LoginComponent`                | `src/app/pages/login/`                 | Página de inicio de sesión.                              |
| `RegisterComponent`             | `src/app/pages/register/`              | Página de registro de usuarios.                          |
| `VistaAdminComponent`           | `src/app/pages/vista-admin/`           | Panel de administración para gestionar empleados.        |
| `VistaEmpleadoComponent`        | `src/app/pages/vista-empleado/`        | Panel para mecánicos con lista de coches y reparaciones. |
| `ClienteRegistroComponent`      | `src/app/pages/cliente-registro/`      | Formulario para registrar nuevos clientes y coches.      |
| `ReparacionesRegistroComponent` | `src/app/pages/reparaciones-registro/` | Formulario para registrar nuevas reparaciones.           |
| `ReparacionCardComponent`       | `src/app/pages/reparacion-card/`       | Detalles de las reparaciones de un coche específico.     |

---

## Contribuciones

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añade nueva funcionalidad'`).
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

---

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
