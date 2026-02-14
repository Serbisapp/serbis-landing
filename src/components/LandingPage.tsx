import React, { useState } from 'react';
import { Navbar } from './landing/Navbar';
import { Hero } from './landing/Hero';
import { Footer } from './landing/Footer';
import { ScrollProcessAnimation } from './ScrollProcessAnimation';
import { ESGImpactSection } from './landing/ESGImpactSection';
import { Section } from './landing/Section';
import { Button } from './landing/Button';
import { ArrowRight } from 'lucide-react';

import type { Shift } from '../types';

type LandingPageProps = {
  onGoToAuth: () => void;
  onGoToSignup: () => void;
  onGoToWorkerSignup: () => void;
  onOpenWizard: () => void;
  onWizardData: (data: Partial<Shift>) => void;
  onOpenManagement: () => void;
  onOpenPublicManagement: () => void;
  onOpenSerbisAdmin: () => void;
  onSignup: (email: string, password: string, data: any) => Promise<void>;
  busy?: boolean;
};

export function LandingPage({ onGoToAuth, onGoToSignup, onGoToWorkerSignup, onOpenWizard, onWizardData, onOpenManagement, onOpenPublicManagement, onOpenSerbisAdmin, onSignup, busy = false }: LandingPageProps) {
  const [secretClicks, setSecretClicks] = useState(0);

  const handleSecretClick = () => {
    setSecretClicks((n) => {
      const next = n + 1;
      if (next >= 5) {
        onOpenManagement();
        return 0;
      }
      setTimeout(() => setSecretClicks(0), 2500);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-accent selection:text-white">
      <Navbar
        onGoToAuth={onGoToAuth}
        onGoToSignup={onGoToSignup}
        onGoToWorkerSignup={onGoToWorkerSignup}
        onOpenWizard={onOpenWizard}
        onOpenManagement={onOpenManagement}
        onOpenPublicManagement={onOpenPublicManagement}
      />

      <main>
        <div id="hero">
          <Hero onOpenWizard={onOpenWizard} onGoToAuth={onGoToAuth} onSignup={onSignup} busy={busy} onWizardData={onWizardData} />
        </div>

        <div id="process">
          <ScrollProcessAnimation onOpenWizard={onOpenWizard} />
        </div>

        <div id="impact">
          <ESGImpactSection />
        </div>

        {/* CTA Section */}
        {/* CTA Section - Minimalist */}
        <div id="cta">
          <Section className="bg-white text-black border-b-2 border-black relative">
            <div className="relative z-10 text-center max-w-5xl mx-auto space-y-10 py-24">
              <h2 className="text-5xl sm:text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.8]">
                Potenciá <br />
                su capacidad.
              </h2>
              <p className="text-xl md:text-3xl font-mono text-black/60 max-w-3xl mx-auto leading-relaxed">
                Súmese a las empresas que optimizan sus recursos con <span className="text-black font-bold">impacto social</span> y eficiencia operativa.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
                <Button onClick={onOpenWizard} size="lg" className="bg-black text-white border-black hover:bg-accent hover:border-accent hover:text-white text-xl px-12 py-6 h-auto shadow-none transition-all rounded-full">
                  Comenzar Ahora <ArrowRight size={24} className="ml-2" />
                </Button>
              </div>
            </div>
          </Section>
        </div>
      </main>

      <div onClick={handleSecretClick} className="fixed bottom-0 left-0 w-20 h-20 z-50 cursor-default" />

      <Footer
        onGoToWorkerSignup={onGoToWorkerSignup}
        onOpenPublicManagement={onOpenPublicManagement}
        onOpenSerbisAdmin={onOpenSerbisAdmin}
      />
    </div>
  );
}
