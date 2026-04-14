import { Link } from 'react-router-dom';
import { StatusTag } from '../components/StatusTag';
import { projects } from '../content/projects';
import { SeoHead } from '../seo/SeoHead';
import { SITE_LANGUAGE, SITE_NAME, SITE_URL } from '../seo/site';

export function ProjectsPage() {
  const projectsStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `Proyectos | ${SITE_NAME}`,
      description: 'Índice de proyectos reales construidos por Serbis.',
      url: `${SITE_URL}/proyectos`,
      inLanguage: SITE_LANGUAGE,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Proyectos',
          item: `${SITE_URL}/proyectos`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Proyectos Serbis',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.name,
        url: `${SITE_URL}/proyectos/${project.slug}`,
      })),
    },
  ];

  return (
    <section className="section section--projects-index">
      <SeoHead
        title={`Proyectos | ${SITE_NAME}`}
        description="Índice de proyectos reales de Serbis. Cada caso documenta contexto, solución e implementación en producción."
        path="/proyectos"
        image="/og/serbis-og.png"
        imageAlt="Índice de proyectos de Serbis"
        type="website"
        keywords={[
          'proyectos serbis',
          'casos de software en producción',
          'portfolio técnico',
          'implementación tecnológica real',
        ]}
        structuredData={projectsStructuredData}
      />

      <div className="shell">
        <div className="section-head">
          <p className="section-head__index">01</p>
          <h1 className="projects-index__title">Proyectos</h1>
          <p>Listado de casos publicados en operación real.</p>
        </div>

        <div className="projects-index__list">
          {projects.map((project) => (
            <article key={project.slug} className="project-single">
              <div className="project-single__head">
                <h2>{project.name}</h2>
                <StatusTag status={project.status} />
              </div>
              <p>{project.shortDescription}</p>
              <Link to={`/proyectos/${project.slug}`} className="text-link">
                Ver caso completo
              </Link>
            </article>
          ))}
        </div>

        <p className="projects-index__back">
          <Link to="/" className="text-link">
            Volver al inicio
          </Link>
        </p>
      </div>
    </section>
  );
}
