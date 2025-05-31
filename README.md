# CRM Taller - Desglose de Tareas

## Requisitos Mínimos (MUST HAVE)

### 1. Autenticación y Autorización de Usuarios

- **Backend:**
  - Implementar endpoint de Login (verificación de credenciales).
  - Generar y gestionar tokens de autenticación (ej. JWT).
  - Crear middleware para proteger rutas API según el perfil (Admin/Mecánico).
- **Frontend:**
- Crear componente de Login (formulario usuario/contraseña).
- Desarrollar servicio de autenticación (enviar credenciales, almacenar token).
- Implementar guardas de ruta (route guards) para proteger vistas según autenticación y perfil.

### 2. Funcionalidad de Administración

- **Backend:**
- Endpoint para registrar nuevas reparaciones (accesible solo por Admin).
- Endpoint para listar _todas_ las reparaciones.
- Endpoint para asignar una reparación a un mecánico específico.
- Endpoint para obtener detalles de una reparación.
- **Frontend:**
- Crear componente Dashboard de Administración.
- Formulario para el registro de nuevas reparaciones.
- Tabla/lista para mostrar todas las reparaciones (con estado, coche, mecánico asignado).
- Interfaz para seleccionar y asignar mecánico a una reparación.

### 3. Funcionalidad de Mecánico

- **Backend:**
- Endpoint para listar reparaciones asignadas al mecánico autenticado.
- Endpoint para actualizar detalles/trabajos realizados en una reparación (restringido al mecánico asignado).
- Endpoint para cambiar el estado de la reparación (ej. "Terminado", para devolver a Admin).
- **Frontend:**
- Crear componente Dashboard de Mecánico.
- Tabla/lista para mostrar solo las reparaciones asignadas.
- Crear componente de Detalle de Reparación:
- Mostrar información del coche y problema inicial.
- Campos editables para registrar modificaciones y trabajos.
- Opciones (botones/select) para actualizar el estado (habilitadas según lógica).

### 4. Gestión de Estado e Historial de Reparaciones

- **Backend:**
- Diseñar esquema de BD (incluyendo tabla para historial de estados si se requiere trazabilidad detallada).
- Implementar lógica de negocio para transiciones de estado permitidas según el estado actual y el perfil del usuario.
- Endpoint para actualizar el estado de una reparación.
- (Opcional pero recomendado para MUST HAVE) Endpoint para obtener el historial de cambios de estado de una reparación.
- **Frontend:**
- Mostrar el estado actual de la reparación de forma clara en listas y detalles.
- Habilitar/deshabilitar acciones (botones, campos) en la UI según el estado actual y el perfil.
- (Opcional pero recomendado) Mostrar historial de estados en la vista de detalle.

### 5. Infraestructura Base y Configuración

- **Backend:**
- Configuración del proyecto Node.js/Express.
- Instalación y configuración de conector MySQL.
- Creación de base de datos y tablas.
- **Frontend:**
- Configuración del proyecto Angular.
- Configuración del enrutamiento (Login, Dashboards, Detalle).
- Creación de servicios Angular para comunicación con la API.

## Mejoras Deseables (SHOULD HAVE)

### 1. Sistema de Notificaciones por Email

- **Backend:**
- Integrar librería o servicio de envío de emails.
- Implementar lógica para enviar correos automáticamente cuando ocurran cambios de estado específicos (ej. asignación a mecánico, finalización).
- **Frontend:** (No requiere cambios directos, la lógica reside en el backend).

## Angular

### Estructura de Proyecto

```bash
angular-crm-taller/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   ├── admin-dashboard/
│   │   │   ├── mechanic-dashboard/
│   │   │   ├── repair-detail/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── repair.service.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.module.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   ├── assets/
│   ├── environments/
│   │   ├── environment.ts
│   │   ├── environment.prod.ts
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
```

### Descripción de Componentes

- **login/**: Componente para el formulario de inicio de sesión.
- **admin-dashboard/**: Componente para el panel de administración, donde se gestionan las reparaciones.
- **mechanic-dashboard/**: Componente para el panel del mecánico, donde se muestran las reparaciones asignadas.
- **repair-detail/**: Componente para mostrar y editar los detalles de una reparación específica.
- **services/**: Contiene los servicios para la comunicación con la API (autenticación y reparaciones).
- **guards/**: Contiene los guards para proteger las rutas según el perfil del usuario.
- **app-routing.module.ts**: Configuración de las rutas de la aplicación.
- **app.module.ts**: Módulo principal de la aplicación Angular.
- **app.component.ts**: Componente raíz de la aplicación.
- **app.component.html**: Plantilla HTML del componente raíz.
- **app.component.css**: Estilos CSS del componente raíz.
- **index.html**: Archivo HTML principal de la aplicación.
- **main.ts**: Punto de entrada de la aplicación Angular.

### Descripción de Servicios

- **auth.service.ts**: Servicio para gestionar la autenticación de usuarios (login, logout, almacenamiento de token).
- **repair.service.ts**: Servicio para gestionar las reparaciones (listar, crear, actualizar, asignar).

### Descripción de Guards

- **auth.guard.ts**: Guard que protege las rutas de la aplicación, asegurando que el usuario esté autenticado y tenga el perfil adecuado (Admin/Mecánico).

### Descripción de Rutas

- **/login**: Ruta para el componente de inicio de sesión.
- **/admin-dashboard**: Ruta para el panel de administración (solo accesible para Admin).
- **/mechanic-dashboard**: Ruta para el panel del mecánico (solo accesible para Mecánicos).
- **/repair-detail/:id**: Ruta para el componente de detalle de reparación (accesible para Admin y Mecánicos asignados).
- **/not-found**: Ruta para manejar errores 404 (página no encontrada).

### Descripción de Estilos

- **bootstrap**: Se recomienda usar Bootstrap para el diseño responsivo y la estética de la aplicación.
- **styles.css**: Archivo CSS principal de la aplicación, donde se pueden agregar estilos globales.

## Express

### Estructura de Proyecto Express

```bash
crm-taller-backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── repair.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── car.model.js
│   │   ├── repair.model.js
│   │   ├── repairDetail.model.js
│   │   ├── repairHistory.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── repair.routes.js
│   ├── config/
│   │   ├── db.config.js
│   │   ├── auth.config.js
│   ├── utils/
│   │   ├── jwt.utils.js
│   ├── server.js
├── package.json
├── .env
```

### Descripción de Controladores

- **auth.controller.js**: Controlador para gestionar la autenticación de usuarios (login, registro).
- **repair.controller.js**: Controlador para gestionar las reparaciones (listar, crear, actualizar, asignar).

### Descripción de Middleware

- **auth.middleware.js**: Middleware para verificar el token de autenticación y el perfil del usuario (Admin/Mecánico).

### Descripción de Modelos

- **user.model.js**: Modelo de datos para los usuarios (Admin y Mecánicos).
- **car.model.js**: Modelo de datos para los coches.
- **repair.model.js**: Modelo de datos para las reparaciones.
- **repairDetail.model.js**: Modelo de datos para los detalles de las reparaciones (trabajos realizados).
- **repairHistory.model.js**: Modelo de datos para el historial de cambios de estado de las reparaciones.

### Descripción de Rutas Express

- **auth.routes.js**: Rutas para la autenticación de usuarios (login, registro).
- **repair.routes.js**: Rutas para gestionar las reparaciones (listar, crear, actualizar, asignar).

### Descripción de Configuración

- **db.config.js**: Configuración de la conexión a la base de datos MySQL.
- **auth.config.js**: Configuración de autenticación (secretos, expiración de tokens).

### Descripción de Utilidades

- **jwt.utils.js**: Utilidades para gestionar JWT (generar, verificar tokens).

### Descripción de Archivos Raíz

- **server.js**: Archivo principal para iniciar el servidor Express.
- **package.json**: Archivo de configuración del proyecto (dependencias, scripts).
- **.env**: Archivo para almacenar variables de entorno (credenciales de base de datos, secretos).

### Descripción de Dependencias

- **express**: Framework para crear el servidor.
- **mysql2**: Conector para MySQL.
- **jsonwebtoken**: Librería para gestionar JWT.
- **bcrypt**: Librería para encriptar contraseñas.
- **dotenv**: Librería para gestionar variables de entorno.

### Descripción de Scripts

- **start**: Inicia el servidor.
- **dev**: Inicia el servidor en modo desarrollo (con nodemon).

## MySQL

### Estructura de Base de Datos

```sql
CREATE DATABASE crm_taller;
USE crm_taller;
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    perfil ENUM('Administracion', 'Mecanico') NOT NULL
);
CREATE TABLE Coches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    año INT NOT NULL,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    color VARCHAR(30)
);
CREATE TABLE Reparaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coche_id INT NOT NULL,
    fecha_recepcion DATETIME NOT NULL,
    descripcion_problema_cliente TEXT NOT NULL,
    estado ENUM('Recibido', 'Asignado', 'En Proceso', 'Listo para Revisión', 'Listo para Entrega', 'Entregado') NOT NULL,
    mecanico_asignado_id INT,
    fecha_finalizacion_estimada DATE,
    fecha_real_finalizacion DATETIME,
    FOREIGN KEY (coche_id) REFERENCES Coches(id),
    FOREIGN KEY (mecanico_asignado_id) REFERENCES Usuarios(id)
);
CREATE TABLE DetalleReparacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reparacion_id INT NOT NULL,
    fecha_actualizacion DATETIME NOT NULL,
    descripcion_trabajo_realizado TEXT NOT NULL,
    piezas_usadas TEXT,
    tiempo_empleado DECIMAL(5,2),
    realizado_por_usuario_id INT NOT NULL,
    FOREIGN KEY (reparacion_id) REFERENCES Reparaciones(id),
    FOREIGN KEY (realizado_por_usuario_id) REFERENCES Usuarios(id)
);
CREATE TABLE HistorialEstadoReparacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reparacion_id INT NOT NULL,
    estado_anterior ENUM('Recibido', 'Asignado', 'En Proceso', 'Listo para Revisión', 'Listo para Entrega', 'Entregado') NOT NULL,
    estado_nuevo ENUM('Recibido', 'Asignado', 'En Proceso', 'Listo para Revisión', 'Listo para Entrega', 'Entregado') NOT NULL,
    fecha_cambio DATETIME NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (reparacion_id) REFERENCES Reparaciones(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);
```

## Descripción de la Base de Datos

La base de datos `crm_taller` está diseñada para gestionar la información de un taller mecánico. Contiene tablas para usuarios, coches, reparaciones y detalles de reparaciones. Cada tabla tiene sus respectivas relaciones y restricciones para garantizar la integridad de los datos.

Este modelo representa las estructuras de datos fundamentales y cómo se interrelacionan.

### Entidades

- **Usuarios**: Representa a los usuarios del sistema, que pueden ser administradores o mecánicos.
- **Coches**: Representa los coches que llegan al taller para reparaciones.
- **Reparaciones**: Representa las reparaciones solicitadas por los clientes, incluyendo el estado y el mecánico asignado.
- **DetalleReparacion**: Representa los detalles de las reparaciones, incluyendo el trabajo realizado y las piezas usadas.
- **HistorialEstadoReparacion**: Representa el historial de cambios de estado de las reparaciones, permitiendo rastrear su evolución a lo largo del tiempo.
- **Relaciones**: Las relaciones entre las tablas permiten gestionar la asignación de reparaciones a mecánicos, el seguimiento del estado de las reparaciones y el registro de los trabajos realizados.
- **Integridad referencial**: Se utilizan claves foráneas para asegurar que las relaciones entre las tablas se mantengan consistentes.
- **Tipos de datos**: Se utilizan tipos de datos adecuados para cada campo, como `VARCHAR` para cadenas de texto, `INT` para números enteros y `DATETIME` para fechas y horas.
- **Restricciones**: Se aplican restricciones como `UNIQUE` para asegurar que ciertos campos (como el email y la matrícula) sean únicos en la base de datos.
- **Enumeraciones**: Se utilizan enumeraciones para los estados de las reparaciones y los perfiles de los usuarios, lo que ayuda a mantener la consistencia en los valores permitidos.
- **Seguridad**: Se almacena el hash de las contraseñas en lugar de las contraseñas en texto plano, lo que mejora la seguridad de la base de datos.
- **Opcionalidad**: Algunos campos son opcionales (como `fecha_finalizacion_estimada` y `fecha_real_finalizacion`) para permitir flexibilidad en la gestión de reparaciones.
- **Escalabilidad**: La estructura de la base de datos permite la adición de nuevas funcionalidades en el futuro, como la gestión de inventario de piezas o la integración con sistemas de pago.

#### Usuarios

- `id` (Clave Primaria - PK)
- `nombre` (VARCHAR)
- `email` (VARCHAR, UNIQUE)
- `password_hash` (VARCHAR) - Almacena el hash de la contraseña por seguridad.
- `perfil` (ENUM/VARCHAR - 'Administracion', 'Mecanico')

#### Coches

- `id` (Clave Primaria - PK)
- `marca` (VARCHAR)
- `modelo` (VARCHAR)
- `año` (INT)
- `matrícula` (VARCHAR, UNIQUE)
- `color` (VARCHAR)

#### Reparaciones

- `id` (Clave Primaria - PK)
- `coche_id` (Clave Foránea - FK referenciando a `Coches.id`)
- `fecha_recepcion` (DATE/DATETIME)
- `descripcion_problema_cliente` (TEXT) - Problema reportado inicialmente por el cliente.
- `estado` (ENUM/VARCHAR - Ej: 'Recibido', 'Asignado', 'En Proceso', 'Listo para Revisión', 'Listo para Entrega', 'Entregado')
- `mecanico_asignado_id` (Clave Foránea - FK referenciando a `Usuarios.id`) - Solo usuarios con perfil 'Mecanico'. Puede ser `NULL` si no está asignado.
- `fecha_finalizacion_estimada` (DATE) - Opcional.
- `fecha_real_finalizacion` (DATE/DATETIME) - Opcional, cuando se marca como 'Listo para Entrega' o 'Entregado'.

#### DetalleReparacion (Representa el trabajo realizado por el mecánico)

- `id` (Clave Primaria - PK)
- `reparacion_id` (Clave Foránea - FK referenciando a `Reparaciones.id`)
- `fecha_actualizacion` (DATETIME) - Cuando se registró esta parte del detalle.
- `descripcion_trabajo_realizado` (TEXT) - Descripción de las acciones tomadas.
- `piezas_usadas` (TEXT) - Lista o descripción de piezas.
- `tiempo_empleado` (DECIMAL/INT) - Horas/minutos empleados en esta fase o tarea (opcional).
- `realizado_por_usuario_id` (Clave Foránea - FK referenciando a `Usuarios.id`) - Quién registró este detalle (será un Mecánico).

#### HistorialEstadoReparacion (Para rastrear cambios de estado)

_Considerado en el SHOULD HAVE original, buena práctica para el "sistema para gestionar el estado" y "visualizar historial"._

- `id` (Clave Primaria - PK)
- `reparacion_id` (Clave Foránea - FK referenciando a `Reparaciones.id`)
- `estado_anterior` (ENUM/VARCHAR)
- `estado_nuevo` (ENUM/VARCHAR)
- `fecha_cambio` (DATETIME)
- `usuario_id` (Clave Foránea - FK referenciando a `Usuarios.id`) - Quién realizó el cambio de estado.

### Relaciones

- **Usuarios 1 -- \* Reparaciones**
- **Tipo:** Uno a Muchos.
- **Descripción:** Un Usuario (con perfil 'Mecanico') puede ser asignado a muchas Reparaciones. Una Reparacion es asignada a un único Usuario (Mecánico).
- **Implementación:** `Reparaciones` tiene la Clave Foránea `mecanico_asignado_id` que referencia a `Usuarios.id`.

- **Usuarios 1 -- \* DetalleReparacion**
- **Tipo:** Uno a Muchos.
- **Descripción:** Un Usuario (con perfil 'Mecanico') puede registrar muchos `DetalleReparacion`. Un `DetalleReparacion` es registrado por un único Usuario.
- **Implementación:** `DetalleReparacion` tiene la Clave Foránea `realizado_por_usuario_id` que referencia a `Usuarios.id`.

- **Usuarios 1 -- \* HistorialEstadoReparacion**
- **Tipo:** Uno a Muchos.
- **Descripción:** Un Usuario puede realizar muchos cambios de estado. Un registro en `HistorialEstadoReparacion` corresponde a la acción de un único Usuario.
- **Implementación:** `HistorialEstadoReparacion` tiene la Clave Foránea `usuario_id` que referencia a `Usuarios.id`.

- **Coches 1 -- \* Reparaciones**
- **Tipo:** Uno a Muchos.
- **Descripción:** Un Coche puede tener muchas Reparaciones a lo largo del tiempo. Una Reparacion es para un único Coche.
- **Implementación:** `Reparaciones` tiene la Clave Foránea `coche_id` que referencia a `Coches.id`.

- **Reparaciones 1 -- \* DetalleReparacion**
- **Tipo:** Uno a Muchos.
- **Descripción:** Una Reparacion puede tener muchos registros de `DetalleReparacion` (si se registran pasos intermedios o actualizaciones del trabajo). Un registro de `DetalleReparacion` pertenece a una única Reparacion.
- **Implementación:** `DetalleReparacion` tiene la Clave Foránea `reparacion_id` que referencia a `Reparaciones.id`.

- **Reparaciones 1 -- \* HistorialEstadoReparacion**
- **Tipo:** Uno a Muchos.
- **Descripción:** Una Reparacion puede pasar por muchos cambios de estado. Un registro en `HistorialEstadoReparacion` pertenece a una única Reparacion.
- **Implementación:** `HistorialEstadoReparacion` tiene la Clave Foránea `reparacion_id` que referencia a `Reparaciones.id`.

## Posibles Mejoras Futuras (COULD HAVE)

- **Sistema de Notificaciones por Email**: Enviar correos electrónicos a los mecánicos cuando se les asigne una nueva reparación o cuando cambie el estado de una reparación.
- **Landing Page**: Crear una página de inicio atractiva para el sistema, que explique sus funcionalidades y beneficios.
- **Internacionalización**: Soporte para múltiples idiomas, permitiendo a los usuarios elegir su idioma preferido.
