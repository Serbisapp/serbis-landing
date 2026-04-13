import type { Project, ProjectSlide, StealthProject } from '../types';

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
      'Vista real de la app de voluntariado en producción. Se incorporarán más capturas operativas por flujo.',
    mobileScreenshot: '/projects/espartanos-iphone-left.png',
    palette: espartanosPalette,
    visualMode: 'mockup',
  },
];

export const stealthProjects: StealthProject[] = [
  {
    id: 'ops-01',
    codename: 'OPS-01',
    title: 'Sistemas operativos internos',
    phase: 'Stealth mode',
    note: 'Diseño operativo y validación interna en entornos controlados.',
  },
  {
    id: 'org-02',
    codename: 'ORG-02',
    title: 'Herramientas para organizaciones',
    phase: 'Stealth mode',
    note: 'Desarrollo con equipos cerrados hasta confirmar uso real y continuidad.',
  },
  {
    id: 'hw-03',
    codename: 'HW-03',
    title: 'Proyectos exploratorios de hardware',
    phase: 'Stealth mode',
    note: 'Exploración aplicada y pruebas de campo antes de publicación abierta.',
  },
];

export const projectSlides: ProjectSlide[] = [
  {
    id: 'espartanos',
    name: 'Fundación Espartanos',
    status: 'En producción',
    summary: 'Sistema operativo integral para una ONG con necesidades de ejecución diaria.',
    detail: 'Caso publicado con implementación activa y continuidad operacional.',
    phaseLabel: 'Caso publicado',
    mobileScreenshot: '/projects/espartanos-iphone-left.png',
    palette: espartanosPalette,
    href: '/proyectos/espartanos',
    visualMode: 'mockup',
  },
  {
    id: 'internal-ops',
    name: 'Sistemas operativos internos',
    status: 'En desarrollo',
    summary: 'Arquitectura operativa para equipos con procesos críticos.',
    detail: 'En ejecución con equipos cerrados hasta validación de operación.',
    phaseLabel: 'Stealth mode',
    mobileScreenshot: '/projects/internal-ops-mobile-shot.svg',
    palette: {
      accent: '#cfd8e3',
      ink: '#161616',
      paper: '#eceff2',
    },
    visualMode: 'framed',
  },
  {
    id: 'org-tools',
    name: 'Herramientas para organizaciones',
    status: 'En desarrollo',
    summary: 'Módulos de gestión para organizaciones con operación activa.',
    detail: 'En desarrollo con validación privada de flujo y adopción.',
    phaseLabel: 'Stealth mode',
    mobileScreenshot: '/projects/org-tools-mobile-shot.svg',
    palette: {
      accent: '#d6d9de',
      ink: '#161616',
      paper: '#f0f2f4',
    },
    visualMode: 'framed',
  },
  {
    id: 'hardware-lab',
    name: 'Proyectos exploratorios de hardware',
    status: 'En desarrollo',
    summary: 'Exploración aplicada para integrar hardware en operación real.',
    detail: 'Trabajo privado hasta completar pruebas de campo.',
    phaseLabel: 'Stealth mode',
    mobileScreenshot: '/projects/hardware-lab-mobile-shot.svg',
    palette: {
      accent: '#d4d0c8',
      ink: '#161616',
      paper: '#f2f0ea',
    },
    visualMode: 'framed',
  },
];
