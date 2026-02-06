import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from './Button';
import { EmbeddedShiftWizard } from '../EmbeddedShiftWizard';

import type { Shift } from '../../types';

interface HeroProps {
  onOpenWizard: () => void;
  onGoToAuth: () => void;
  onSignup: (email: string, password: string, data: any) => Promise<void>;
  busy?: boolean;
  onWizardData: (data: Partial<Shift>) => void;
}

export function Hero({ onOpenWizard, onGoToAuth, onSignup, busy = false, onWizardData }: HeroProps) {
  const logosBaseUrl = `${import.meta.env.BASE_URL}logos`;

  return (
    <div className="relative pt-20 min-h-[100dvh] flex flex-col justify-between overflow-x-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full pb-20 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-center w-full my-auto pt-4 md:pt-0">
          <div className="flex flex-col justify-center text-center md:text-left">
            {/* Left Column: Copy & CTA */}
            <div className="max-w-3xl">
              {/* Strategic Alliances */}
              <div className="hidden md:flex items-center gap-6 mb-8 text-black/50">
                <span className="text-xs font-medium uppercase tracking-wider whitespace-nowrap">Alianzas Estratégicas</span>
                <div className="h-4 w-px bg-black/20" />
                <div className="flex items-center gap-6">
                  <img src={`${logosBaseUrl}/emprelatam.png`} alt="Emprelatam" className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                  <img src={`${logosBaseUrl}/aws.png`} alt="AWS" className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                  {/* <img src={`${logosBaseUrl}/espartanos.png`} alt="Fundación Espartanos" className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                  <img src={`${logosBaseUrl}/pescar.png`} alt="Fundación Pescar" className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" /> */}
                </div>
              </div>

              <h1 className="text-4xl md:text-7xl font-display font-semibold tracking-tight leading-[1.1] text-black mb-4 md:mb-6">
                Personal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">Operativo.</span> <br />
                Calificado. <span className="text-accent">Inmediato.</span>
              </h1>

              <p className="text-lg md:text-2xl text-black/60 max-w-2xl leading-relaxed mb-6 md:mb-10 pl-1">
                La solución ágil para contratación de personal eventual. Conectamos su operación con talento verificado de fundaciones aliadas, garantizando cumplimiento y eficiencia.
              </p>

              <div>
                <div className="md:hidden">
                  <Button onClick={onOpenWizard} size="lg" className="text-lg md:text-xl px-8 md:px-10 py-4 md:py-6 h-auto">
                    Iniciar Solicitud <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Shift Wizard (Desktop) */}
          <div className="hidden lg:flex flex-col justify-center items-center mt-8 lg:mt-0 relative z-30">
            <EmbeddedShiftWizard onComplete={(data) => {
              console.log("Shift wizard complete", data);
              onWizardData(data);
              // onGoToAuth(); // Handled by App.tsx via onWizardData -> handleWizardComplete
            }} />
          </div>


        </div>
      </div>

      {/* Marquee Footer of Hero */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-black/5 bg-white/50 backdrop-blur-sm text-black/60 overflow-hidden py-4 z-20">
        <div className="animate-marquee whitespace-nowrap flex gap-16 font-sans text-sm font-medium tracking-widest shrink-0">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex-shrink-0 flex items-center gap-4">
              Logística <span className="w-1 h-1 rounded-full bg-accent/40" />
              Eventos <span className="w-1 h-1 rounded-full bg-accent/40" />
              Producción <span className="w-1 h-1 rounded-full bg-accent/40" />
              Limpieza <span className="w-1 h-1 rounded-full bg-accent/40" />
              Mantenimiento <span className="w-1 h-1 rounded-full bg-accent/40" />
              Carga y Descarga <span className="w-1 h-1 rounded-full bg-accent/40" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
