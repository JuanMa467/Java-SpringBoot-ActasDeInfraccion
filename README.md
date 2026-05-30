# 🚦 Sistema de Gestión de Actas de Infracción de Tránsito

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk" alt="Java" />
  <img src="https://img.shields.io/badge/Spring%20Boot-3.3.5-brightgreen?style=for-the-badge&logo=springboot" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-purple?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/H2%20Database-In%20Memory-darkblue?style=for-the-badge&logo=databricks" alt="H2 Database" />
  <img src="https://img.shields.io/badge/Bootstrap-5.3-blueviolet?style=for-the-badge&logo=bootstrap" alt="Bootstrap" />
</p>

---

## 📝 Descripción del Proyecto

El **Sistema de Gestión de Actas de Infracción** es una aplicación web moderna diseñada para la digitalización, control y administración de actas de constatación de infracciones de tránsito. Permite a las autoridades pertinentes registrar datos detallados sobre conductores, vehículos, tipos de rutas y detalles específicos de la infracción, agilizando el flujo administrativo y asegurando la consistencia y trazabilidad de cada acta labrada.

El proyecto está diseñado con una arquitectura desacoplada y robusta:
* **Backend:** API REST construida en **Java con Spring Boot 3**, utilizando **Spring Data JPA** para la persistencia y la base de datos **H2** en memoria para un despliegue ágil en desarrollo.
* **Frontend:** Una interfaz de usuario interactiva y fluida (SPA) desarrollada en **React (Vite)**, estructurada sobre **Bootstrap 5** y **Bootstrap Icons** para lograr un diseño responsivo, limpio y profesional.
* **Integración Automatizada:** Cuenta con tareas personalizadas en **Gradle** que compilan de manera automática el front-end en React y lo inyectan en el backend para poder servir toda la aplicación (interfaz y API) desde un único puerto de red.

---

## 🗺️ Modelo de Dominio (Diagrama UML)

El sistema modela fielmente las reglas de negocio de tránsito de la entidad estatal mediante las siguientes relaciones:

<p align="center">
  <img width="90%" alt="actasDeContatacionUML" src="https://github.com/user-attachments/assets/5126694f-5c93-4a8a-a86c-f9e35bfe9084" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</p>

### Entidades Clave

| Entidad | Descripción |
| :--- | :--- |
| **`ActaDeContatacion`** | Entidad central que unifica el lugar de la contravención, fecha, el conductor involucrado, el vehículo, la autoridad que labró el acta, la infracción cometida y el estado del acta. |
| **`Conductor`** | Contiene los datos personales del infractor (Nombre, Apellido, DNI, etc.) y su licencia habilitante. |
| **`Vehiculo`** | Representa al coche/moto involucrado, detallando su Dominio (Patente), Marca y Modelo. |
| **`Infraccion`** | Detalle de la infracción puntual vinculada al acta, incluyendo su importe y la referencia a la infracción nomenclada. |
| **`TipoDeInfraccion`** | Catálogo oficial de infracciones (Nomenclador) con su gravedad (LEVE, MODERADA, GRAVE, MUY GRAVE) e importes base asignados. |
| **`Ruta` y `TipoRuta`** | Permite registrar si la infracción ocurrió en una Autovía, Ruta Nacional, Provincial, etc., y el número de ruta específico. |
| **`OrganizacionEstatal`** | Ente regulador o municipio bajo el cual opera la autoridad de constatación. |
| **`EstadoDelActa`** | Define el estado administrativo del acta (por ejemplo: Pendiente, Pagada, Anulada). |

---

## ⚙️ Arquitectura & Tecnologías

### Backend (Java & Spring Boot)
* **Spring Boot 3.3.5** con Java 17.
* **Spring Data JPA** para la abstracción de persistencia de datos.
* **H2 Database Engine:** Base de datos SQL ligera en memoria ideal para desarrollo rápido y pruebas eficientes.
* **Lombok:** Para reducir el código boilerplate de los POJOs/Entidades (Getters, Setters, Builders).
* **Database Initializer:** Un componente `CommandLineRunner` que precarga infracciones de ejemplo en cada inicio (`Exceso de velocidad`, `Falta de seguro obligatorio`, etc.) si las tablas están vacías.

### Frontend (React & SPA)
* **React 19** con **Vite 8** como servidor de desarrollo ultra-rápido y empaquetador.
* **React Router DOM 7** para la navegación SPA fluida sin recargar páginas.
* **Bootstrap 5 & Bootstrap Icons:** Estilos visuales pulidos, grillas responsivas y diseño moderno y limpio.
* **API Client centralizado:** Cliente HTTP implementado con `fetch` nativo que encapsula llamadas asíncronas de manera prolija hacia el backend (`GET`, `POST`, `PUT`, `DELETE`).

---

## 📂 Estructura del Directorio

```text
ProyectoActas-SpringBoot-AtencioJuanManuel/
├── Front-end/                     # SPA en React (Vite)
│   ├── src/
│   │   ├── api/                   # Cliente HTTP (/api/v1) para conectar al Backend
│   │   ├── components/            # Modales, Layout, Alertas y componentes generales
│   │   ├── pages/                 # Vistas principales (Actas, Infracciones, Dashboard)
│   │   ├── hooks/                 # Custom React Hooks
│   │   └── main.jsx
│   ├── package.json               # Dependencias de npm y scripts del front
│   └── vite.config.js             # Configuración de Vite con Proxy a http://localhost:9000
│
└── ProyectoActas/                 # Backend en Spring Boot (API REST)
    ├── src/main/java/.../demo/
    │   ├── config/                # Configuraciones de seguridad, CORS e inicializador H2
    │   ├── controllers/           # Controladores REST (/api/v1/...)
    │   ├── entities/              # Entidades del Modelo JPA
    │   ├── repositories/          # Interfaces Spring Data JPA
    │   └── services/              # Capa de Lógica de Negocio
    ├── src/main/resources/
    │   ├── application.properties # Parámetros del servidor (Puerto 9000) y H2
    │   └── static/                # Contenedor del build de React autogenerado
    └── build.gradle               # Pipeline de integración automática Gradle-React
```

---

## 🚀 Instalación y Ejecución

### Requisitos Previos
* **Java JDK 17** o superior.
* **Node.js** (versión 18 o superior recomendada) y **npm**.

---

### Opción A: Modo Producción Integrado (Recomendado)
El proyecto está configurado con **Gradle** para empaquetar automáticamente el Front-end dentro del servidor de Spring Boot. De esta forma, no necesitarás ejecutar dos comandos simultáneos.

1. Dirígete a la carpeta del backend:
   ```bash
   cd ProyectoActas
   ```
2. Ejecuta el servidor:
   * **En Windows:**
     ```bash
     gradlew.bat bootRun
     ```
   * **En Linux/macOS:**
     ```bash
     ./gradlew bootRun
     ```

> [!TIP]
> **¿Qué hace Gradle en segundo plano?**
> 1. Detecta la carpeta del Front-end.
> 2. Ejecuta `npm run build` para compilar los archivos estáticos de React.
> 3. Copia el resultado en `ProyectoActas/src/main/resources/static`.
> 4. Inicia la aplicación de Spring Boot en el puerto `9000`.

Una vez iniciado, ingresa a: **[http://localhost:9000](http://localhost:9000)** para ver e interactuar con toda la aplicación en funcionamiento.

---

### Opción B: Modo Desarrollo Separado (Hot Reload)
Si deseas realizar cambios rápidos en la interfaz visual y verlos reflejados al instante en el navegador:

1. **Iniciar el Backend (Spring Boot):**
   ```bash
   cd ProyectoActas
   # En Windows:
   gradlew.bat bootRun
   # En Linux/macOS:
   ./gradlew bootRun
   ```
   *El backend correrá en el puerto `9000` aportando la API REST en `http://localhost:9000/api/v1`.*

2. **Iniciar el Frontend (Vite):**
   Abre otra terminal y navega a la carpeta correspondiente:
   ```bash
   cd Front-end
   npm install
   npm run dev
   ```
   *El frontend correrá en **[http://localhost:5173](http://localhost:5173)** y redireccionará las llamadas a `/api` directamente al puerto `9000` gracias al proxy configurado en Vite.*

---

## 🛢️ Consola de la Base de Datos H2

Durante la ejecución del backend, la base de datos en memoria está completamente disponible para consultas a través de su consola web integrada.

* **Dirección URL de la consola:** **[http://localhost:9000/h2-console](http://localhost:9000/h2-console)**
* **JDBC URL:** `jdbc:h2:mem:actasdb`
* **User Name:** `sa`
* **Password:** *(dejar en blanco)*

> [!NOTE]
> Al iniciar el sistema, el componente `DatabaseInitializer` poblará automáticamente la base de datos con algunas infracciones predefinidas de ejemplo para facilitar las pruebas.

---

## 📌 Rutas Principales de la API (REST Endpoints)

Todas las rutas del backend siguen la convención REST y están mapeadas a partir de `/api/v1`:

* **Actas de Constatación:** `/api/v1/Actas`
* **Infracciones:** `/api/v1/Infracciones`
* **Tipos de Infracción:** `/api/v1/TiposDeInfraccion`
* **Conductores:** `/api/v1/Conductor`
* **Vehículos:** `/api/v1/Vehiculo`
* **Organizaciones Estatales:** `/api/v1/OrganizacionEstatal`

*Todos los endpoints soportan de manera nativa los métodos estándar `GET`, `POST`, `PUT`, y `DELETE` para realizar operaciones CRUD completas.*

---
<p align="center">Desarrollado con ❤️ para la gestión inteligente del tránsito público.</p>
