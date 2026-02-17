import React from 'react';
import { Section } from './Section';

const faqItems = [
  {
    question: 'Que perfiles pueden cubrir con Serbis?',
    answer:
      'Cubrimos perfiles operativos para logistica, eventos, produccion, limpieza, mantenimiento y soporte en terreno.',
  },
  {
    question: 'En cuanto tiempo se activa una solicitud?',
    answer:
      'La plataforma prioriza activacion inmediata. En la mayoria de los casos la cobertura inicial se confirma en minutos.',
  },
  {
    question: 'Como se integra el impacto social al servicio?',
    answer:
      'Trabajamos con fundaciones aliadas para conectar talento verificado con oportunidades laborales formales para empresas.',
  },
];

export function Faq() {
  return (
    <Section className="bg-slate-50 border-t border-black/10 border-b border-black/10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Preguntas frecuentes</h2>
          <p className="text-black/60 font-mono">Respuestas rapidas para equipos de operaciones y talento.</p>
        </div>
        <div className="space-y-4">
          {faqItems.map((item) => (
            <article key={item.question} className="bg-white rounded-2xl border border-black/10 px-6 py-5">
              <h3 className="font-display text-xl font-semibold tracking-tight">{item.question}</h3>
              <p className="mt-2 text-black/70 leading-relaxed">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
