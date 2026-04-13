# Serbis Institucional (Dev)

Web institucional mínima para presentar proyectos de Serbis.

## Requisitos

- Node.js 20+

## Correr en desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Estructura

- `src/content/projects.ts`: fuente de datos de proyectos y líneas en desarrollo.
- `src/pages/HomePage.tsx`: home con hero, proyectos, en desarrollo y contacto.
- `src/pages/ProjectPage.tsx`: template reutilizable para páginas de proyecto por `slug`.

## Agregar un proyecto nuevo

1. Agregar un nuevo objeto en `src/content/projects.ts`.
2. Usar un `slug` único.
3. El detalle quedará disponible automáticamente en `/proyectos/:slug`.
