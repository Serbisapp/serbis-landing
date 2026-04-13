import type { Project, ProjectSlide } from '../types';

const espartanosPalette = {
  accent: '#ffd200',
  ink: '#111111',
  paper: '#ffe78a',
};

export const projects: Project[] = [
  {
    slug: 'espartanos',
    name: 'Fundación Espartanos',
    shortDescription:
      'Suite operativa para coordinar voluntarios, asistencia y gestión diaria de una ONG con operación activa.',
    status: 'En producción',
    context:
      'Fundación Espartanos es una ONG con necesidades operativas reales y flujos de trabajo que no podían seguir creciendo con herramientas desconectadas.',
    problem: [
      'Procesos fragmentados entre áreas y equipos.',
      'Gestión manual en tareas críticas de coordinación.',
      'Falta de visibilidad sobre el estado operativo en tiempo real.',
    ],
    solution: [
      'App para voluntarios.',
      'Panel administrativo centralizado.',
      'Sistema de asistencia integrado a la operación diaria.',
    ],
    technology:
      'Se usaron herramientas modernas de desarrollo, backend y despliegue para sostener una operación estable en producción.',
    results: ['Implementado en 3 semanas.', 'En uso activo.', 'Diseñado para operación real.'],
    visualsNote:
      'Esta sección queda preparada para sumar capturas del producto, flujos de trabajo y material visual operativo.',
    logoSrc: '/logos/espartanos.png',
    mobileScreenshot: '/projects/espartanos-mobile.png',
    palette: espartanosPalette,
  },
];

export const inProgressItems = [
  'Sistemas operativos internos',
  'Herramientas para organizaciones',
  'Proyectos exploratorios de hardware',
];

export const projectSlides: ProjectSlide[] = [
  {
    id: 'espartanos',
    name: 'Fundación Espartanos',
    status: 'En producción',
    summary: 'Sistema operativo integral para una ONG con necesidades de ejecución diaria.',
    detail: 'Caso publicado con implementación activa y continuidad operacional.',
    logoSrc: '/logos/espartanos.png',
    mobileScreenshot: '/projects/espartanos-mobile.png',
    palette: espartanosPalette,
    href: '/proyectos/espartanos',
  },
  {
    id: 'internal-ops',
    name: 'Sistemas operativos internos',
    status: 'En desarrollo',
    summary: 'Arquitecturas de operación para equipos que trabajan con procesos críticos.',
    detail: 'Trabajo en curso. Se publicará como caso cuando entre en operación estable.',
    mobileScreenshot: '/projects/internal-ops-mobile-shot.svg',
    palette: {
      accent: '#38bdf8',
      ink: '#0f172a',
      paper: '#dbeafe',
    },
  },
  {
    id: 'org-tools',
    name: 'Herramientas para organizaciones',
    status: 'En desarrollo',
    summary: 'Módulos de gestión para organizaciones que necesitan visibilidad operativa.',
    detail: 'Trabajo en curso. Se publicará cuando exista despliegue productivo.',
    mobileScreenshot: '/projects/org-tools-mobile-shot.svg',
    palette: {
      accent: '#22d3ee',
      ink: '#111827',
      paper: '#ccfbf1',
    },
  },
  {
    id: 'hardware-lab',
    name: 'Proyectos exploratorios de hardware',
    status: 'En desarrollo',
    summary: 'Exploración aplicada para integrar dispositivos en flujos de operación real.',
    detail: 'Trabajo en curso. Se documentará con evidencia de campo cuando corresponda.',
    mobileScreenshot: '/projects/hardware-lab-mobile-shot.svg',
    palette: {
      accent: '#f59e0b',
      ink: '#111111',
      paper: '#fde68a',
    },
  },
];
