import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { ProjectCarousel } from '../components/ProjectCarousel';
import { inProgressItems, projectSlides, projects } from '../content/projects';

export function HomePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % projectSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeHeroSlide = projectSlides[heroSlideIndex];

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Contacto desde web institucional - ${name || 'Sin nombre'}`);
    const body = encodeURIComponent(
      `Nombre: ${name || '-'}\nEmail: ${email || '-'}\n\nMensaje:\n${message || '-'}`,
    );

    window.location.href = `mailto:admin@serbis.app?subject=${subject}&body=${body}`;
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <>
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
            <p className="hero__eyebrow">Institucional</p>
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

            <AnimatePresence mode="popLayout">
              <motion.div 
                key={activeHeroSlide.id}
                className="hero-art__card"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ 
                  backgroundColor: activeHeroSlide.palette.accent, 
                  color: activeHeroSlide.palette.ink 
                }}
              >
                {activeHeroSlide.logoSrc ? (
                  <img src={activeHeroSlide.logoSrc} alt="" role="presentation" />
                ) : (
                  <div style={{ width: 68, height: 68, background: activeHeroSlide.palette.paper, border: '1px solid rgba(18, 18, 18, 0.3)' }} />
                )}
                <div>
                  <p>{activeHeroSlide.name}</p>
                  <span>{activeHeroSlide.status}</span>
                </div>
              </motion.div>
            </AnimatePresence>
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
            <p>Archivo visual de proyectos en producción y líneas activas de trabajo.</p>
          </div>
          <ProjectCarousel slides={projectSlides} />
        </div>
      </motion.section>

      <motion.section 
        id="en-desarrollo" 
        className="section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="shell">
          <div className="section-head">
            <p className="section-head__index">02</p>
            <h2>En desarrollo</h2>
            <p>Trabajo en curso sin detalle comercial innecesario.</p>
          </div>

          <ul className="development-list">
            {inProgressItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
              <p className="section-head__index">03</p>
              <h2>Contacto</h2>
              <p>Canal directo para conversaciones de proyecto.</p>
            </div>

            <p className="contact-line">
              <span>Email</span>
              <a href="mailto:admin@serbis.app" className="text-link">
                admin@serbis.app
              </a>
            </p>

            <a href="mailto:admin@serbis.app" className="button button--ghost">
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
