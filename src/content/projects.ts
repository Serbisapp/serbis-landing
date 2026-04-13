import type { Project } from '../types';

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
