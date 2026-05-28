# Front-end — Sistema de Actas

Aplicación React (Vite) del Sistema de Actas. El build se integra en Spring Boot y se sirve en **http://localhost:9000**.

## Desarrollo del front (opcional)

Con el backend ya en el puerto 9000:

```bash
cd Front-end
npm install
npm run dev
```

Abre **http://localhost:5173** (proxy de API hacia `:9000`).

## Producción / uso normal (solo puerto 9000)

Desde la carpeta del backend:

```bash
cd ProyectoActas
./gradlew bootRun
```

Gradle compila React (`npm run build`) y copia `Front-end/dist` a `src/main/resources/static`.  
Abre **http://localhost:9000** — ahí corre la interfaz y la API (`/api/v1/...`).

## Estructura

```
src/
  api/client.js       # Cliente HTTP (/api/v1)
  components/         # Layout, Sidebar, Modal...
  pages/              # Pantallas de la app
  constants/          # Enums (estados del acta, etc.)
```

## Build manual

```bash
npm run build
```

Luego copiá `dist/` a `ProyectoActas/src/main/resources/static/` o ejecutá `./gradlew copyFrontend`.
