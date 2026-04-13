import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { StatusTag } from '../components/StatusTag';
import { projects } from '../content/projects';
import { SeoHead } from '../seo/SeoHead';
import { CONTACT_EMAIL, SITE_LANGUAGE, SITE_NAME, SITE_URL } from '../seo/site';

export function HomePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const featuredProject = projects[0];
  const homeStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      email: CONTACT_EMAIL,
      sameAs: [SITE_URL, 'https://www.serbis.app'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: SITE_LANGUAGE,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Proyectos publicados por Serbis',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.name,
        url: `${SITE_URL}/proyectos/${project.slug}`,
      })),
    },
  ];

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Contacto desde web institucional - ${name || 'Sin nombre'}`);
    const body = encodeURIComponent(
      `Nombre: ${name || '-'}\nEmail: ${email || '-'}\n\nMensaje:\n${message || '-'}`,
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <>
      <SeoHead
        title="Serbis | Sistemas, productos y herramientas en el mundo real"
        description="Serbis construye sistemas, productos y herramientas para operaciones reales. Publicamos casos concretos, sin promesas infladas."
        path="/"
        image="/og/serbis-og.png"
        imageAlt="Identidad visual de Serbis"
        type="website"
        keywords={[
          'desarrollo de software',
          'sistemas operativos internos',
          'proyectos tecnológicos reales',
          'suite operativa para organizaciones',
          'implementación de productos digitales',
        ]}
        structuredData={homeStructuredData}
      />

      <section className="hero" id="inicio">
        <div className="hero__layer hero__layer--grid" aria-hidden="true" />
        <div className="hero__layer hero__layer--slab" aria-hidden="true" />

        <div className="shell hero__inner">
          <motion.div 
            className="hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Serbis
            </motion.h1>
            <motion.p 
              className="hero__subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Construimos sistemas, productos y herramientas en el mundo real.
            </motion.p>
            <motion.p 
              className="hero__line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Trabajo en software, operaciones y ejecución de proyectos reales con documentación clara.
            </motion.p>

            <motion.div 
              className="hero__actions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="#proyectos" className="button button--solid">
                Ver proyectos
              </a>
              <a href="#contacto" className="button button--ghost">
                Contacto
              </a>
            </motion.div>

            <motion.p 
              className="hero__meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Casos publicados: {projects.length}
            </motion.p>
          </motion.div>

          <motion.aside 
            className="hero-art" 
            aria-hidden="true"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-art__plate hero-art__plate--base" />
            <div className="hero-art__plate hero-art__plate--accent" />
            <motion.div
              className="hero-art__card"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="hero-art__kicker">Caso en producción</p>
              <h3>Fundación Espartanos</h3>
              <span>Suite operativa en uso activo</span>
            </motion.div>

            <div className="hero-art__stamp">DEPLOYED IN OPERATION</div>
          </motion.aside>
        </div>
      </section>

      <motion.section 
        id="proyectos" 
        className="section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="shell">
          <div className="section-head">
            <p className="section-head__index">01</p>
            <h2>Proyectos</h2>
            <p>Proyecto activo y publicado.</p>
          </div>

          {featuredProject ? (
            <article className="project-single">
              <div className="project-single__head">
                <h3>{featuredProject.name}</h3>
                <StatusTag status={featuredProject.status} />
              </div>
              <p>{featuredProject.shortDescription}</p>
              <Link to={`/proyectos/${featuredProject.slug}`} className="text-link">
                Ver caso completo
              </Link>
            </article>
          ) : null}
        </div>
      </motion.section>

      <motion.section 
        id="contacto" 
        className="section section--contact"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="shell contact-layout">
          <div>
            <div className="section-head">
              <p className="section-head__index">02</p>
              <h2>Contacto</h2>
              <p>Canal directo para conversaciones de proyecto.</p>
            </div>

            <p className="contact-line">
              <span>Email</span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-link">
                {CONTACT_EMAIL}
              </a>
            </p>

            <a href={`mailto:${CONTACT_EMAIL}`} className="button button--ghost">
              Escribir por email
            </a>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label>
              Nombre
              <input
                type="text"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </label>
            <label>
              Mensaje
              <textarea
                name="message"
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </label>
            <button type="submit" className="button button--solid">
              Enviar contacto
            </button>
          </form>
        </div>
      </motion.section>
    </>
  );
}
