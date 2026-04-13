import { motion } from 'framer-motion';
import { useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import type { ProjectSlide } from '../types';
import { PhoneFrame } from './PhoneFrame';
import { StatusTag } from './StatusTag';

interface ProjectCarouselProps {
  slides: ProjectSlide[];
}

function formatIndex(value: number) {
  return value.toString().padStart(2, '0');
}

export function ProjectCarousel({ slides }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const move = (delta: number) => {
    setActiveIndex((current) => {
      const next = (current + delta + slides.length) % slides.length;
      return next;
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    }
  };

  return (
    <div className="project-carousel" tabIndex={0} onKeyDown={onKeyDown} aria-label="Carrusel de proyectos">
      <div className="project-carousel__viewport">
        <motion.div
          className="project-carousel__track"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 280, damping: 30, mass: 1 }}
        >
          {slides.map((slide, index) => {
            const slideStyle = {
              '--slide-accent': slide.palette.accent,
              '--slide-ink': slide.palette.ink,
              '--slide-paper': slide.palette.paper,
            } as CSSProperties;

            return (
              <article key={slide.id} className="project-slide" style={slideStyle}>
                <div className="project-slide__meta">
                  <p className="project-slide__index">
                    {formatIndex(index + 1)} / {formatIndex(slides.length)}
                  </p>

                  <div className="project-slide__header">
                    <div className="project-slide__identity">
                      {slide.logoSrc ? (
                        <img src={slide.logoSrc} alt={`Logo ${slide.name}`} className="project-slide__logo" />
                      ) : null}
                      <h3>{slide.name}</h3>
                    </div>
                    <StatusTag status={slide.status} />
                  </div>

                  <p className="project-slide__summary">{slide.summary}</p>
                  <p className="project-slide__detail">{slide.detail}</p>

                  <div className="project-slide__action">
                    {slide.href ? (
                      <Link to={slide.href} className="text-link">
                        Abrir proyecto
                      </Link>
                    ) : (
                      <span>Detalle en preparación</span>
                    )}
                  </div>
                </div>

                <div className="project-slide__visual">
                  <PhoneFrame src={slide.mobileScreenshot} alt={`Captura móvil de ${slide.name}`} />
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>

      <div className="project-carousel__controls">
        <button type="button" className="carousel-button" onClick={() => move(-1)} aria-label="Proyecto anterior">
          Prev
        </button>
        <div className="carousel-dots" aria-hidden="true">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={index === activeIndex ? 'carousel-dot is-active' : 'carousel-dot'}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>
        <button type="button" className="carousel-button" onClick={() => move(1)} aria-label="Proyecto siguiente">
          Next
        </button>
      </div>
    </div>
  );
}
