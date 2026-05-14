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
      'Plataforma digital para gestionar de punta a punta el programa de voluntariado de Fundación Espartanos.',
    status: 'En producción',
    context:
      'Es el sistema operativo de la comunidad de voluntariado de Espartanos: las personas se registran, son aprobadas, se anotan a actividades, reciben novedades y se mantienen conectadas, mientras coordinación opera todo desde un panel administrativo.',
    problem: [
      'El ciclo de voluntariado necesitaba un flujo completo, desde onboarding hasta participación en actividades.',
      'Coordinación operaba aprobaciones, agenda, asistencia y comunicaciones en procesos dispersos.',
      'La fundación necesitaba mantener los registros institucionales y reportes sincronizados con Salesforce.',
    ],
    solution: [
      'App de voluntariado (mobile/web) para onboarding, actividades, actualizaciones de comunidad, perfil y recordatorios.',
      'Dashboard administrativo para aprobaciones, planificación de actividades, asistencia, comunicaciones, configuración y métricas.',
      'Backend con almacenamiento de datos, reglas de capacidad/lista de espera/aprobaciones y envío de notificaciones.',
      'Integración con Salesforce para espejar en CRM los datos de voluntarios, eventos e inscripciones.',
    ],
    technology:
      'La arquitectura conecta app, panel administrativo, backend e integración CRM para operar el programa de voluntariado end to end con una base única de datos y reglas.',
    results: [
      'Operación del programa de voluntariado centralizada de punta a punta.',
      'Mejor coordinación de actividades, asistencia y comunicaciones.',
      'Datos operativos e institucionales alineados entre la plataforma y Salesforce.',
    ],
    visualsNote:
      'Vista real de la app de voluntariado en producción, integrada con la operación diaria de Fundación Espartanos.',
    mobileScreenshot: '/projects/espartanos-iphone-left.png',
    palette: espartanosPalette,
    visualMode: 'mockup',
  },
];
