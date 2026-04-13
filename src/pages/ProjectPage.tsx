import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { CSSProperties } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusTag } from '../components/StatusTag';
import { projects } from '../content/projects';

export function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/not-found" replace />;
  }

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
            <PhoneFrame src={project.mobileScreenshot} alt={`Captura móvil de ${project.name}`} />
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

          <motion.div className="project-section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2>Visuales</h2>
            <div className="visual-placeholder">
              {project.logoSrc ? (
                <img src={project.logoSrc} alt={`Logo ${project.name}`} className="visual-placeholder__logo" />
              ) : null}
              <p>{project.visualsNote}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
