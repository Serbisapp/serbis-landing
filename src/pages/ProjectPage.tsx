import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { CSSProperties } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusTag } from '../components/StatusTag';
import { projects } from '../content/projects';
import { SeoHead } from '../seo/SeoHead';
import { SITE_LANGUAGE, SITE_NAME, SITE_URL } from '../seo/site';

export function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/not-found" replace />;
  }

  const projectPath = `/proyectos/${project.slug}`;
  const projectTitle = `${project.name} | Proyecto en producción | ${SITE_NAME}`;
  const projectDescription = `${project.shortDescription} Implementado en operación real con foco en estabilidad y ejecución.`;
  const projectStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: projectTitle,
      description: projectDescription,
      url: `${SITE_URL}${projectPath}`,
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
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: project.name,
          item: `${SITE_URL}${projectPath}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.name,
      headline: project.name,
      description: project.shortDescription,
      about: project.context,
      keywords: ['software', 'operaciones', 'proyecto real', 'Fundación Espartanos'],
      inLanguage: SITE_LANGUAGE,
      url: `${SITE_URL}${projectPath}`,
      image: `${SITE_URL}${project.mobileScreenshot}`,
      creator: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  ];

  const projectStyle = {
    '--project-accent': project.palette.accent,
    '--project-ink': project.palette.ink,
    '--project-paper': project.palette.paper,
  } as CSSProperties;

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <SeoHead
        title={projectTitle}
        description={projectDescription}
        path={projectPath}
        image="/og/espartanos-og.png"
        imageAlt={`Captura de la app de ${project.name}`}
        type="article"
        keywords={[
          'fundación espartanos',
          'software para ONG',
          'panel administrativo',
          'app para voluntarios',
          'sistema de asistencia',
        ]}
        structuredData={projectStructuredData}
      />

      <section className="project-hero" style={projectStyle}>
        <div className="project-hero__layer" aria-hidden="true" />

        <div className="shell project-hero__inner">
          <motion.div 
            className="project-hero__copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}  
          >
            <p>
              <Link to="/" className="text-link">
                Volver al inicio
              </Link>
            </p>
            <div className="project-hero__head">
              <h1>{project.name}</h1>
              <StatusTag status={project.status} />
            </div>
            <p className="project-hero__description">{project.shortDescription}</p>
          </motion.div>

          <motion.div 
            className="project-hero__visual"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} 
          >
            {project.visualMode === 'mockup' ? (
              <img
                src={project.mobileScreenshot}
                alt={`Captura móvil de ${project.name}`}
                className="project-hero__mockup"
              />
            ) : (
              <PhoneFrame src={project.mobileScreenshot} alt={`Captura móvil de ${project.name}`} />
            )}
          </motion.div>
        </div>
      </section>

      <section className="project-page">
        <div className="shell project-page__inner">
          <motion.div className="project-section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2>Contexto</h2>
            <p>{project.context}</p>
          </motion.div>

          <motion.div className="project-section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2>Problema</h2>
            <ul>
              {project.problem.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="project-section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2>Solución</h2>
            <ul>
              {project.solution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="project-section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2>Tecnología</h2>
            <p>{project.technology}</p>
          </motion.div>

          <motion.div className="project-section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2>Resultado</h2>
            <ul>
              {project.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>
    </motion.div>
  );
}
