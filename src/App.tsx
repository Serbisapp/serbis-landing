import React, { useCallback } from 'react';
import { LandingPage } from './components/LandingPage';
import type { Shift } from './types';

const CONTACT_EMAIL = 'admin@serbis.app';

function openContactEmail(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) {
    params.set('body', body);
  }
  window.location.href = `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}

function scrollToCta() {
  const cta = document.getElementById('cta');
  if (!cta) return;
  cta.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  const handleOpenWizard = useCallback(() => {
    scrollToCta();
  }, []);

  const handleWizardData = useCallback((data: Partial<Shift>) => {
    const description = data.description?.trim() || 'Consulta desde landing page';
    openContactEmail('Serbis - Nueva solicitud', `Necesidad:\n${description}`);
  }, []);

  const handleGoToSignup = useCallback(() => {
    openContactEmail('Serbis - Quiero registrarme');
  }, []);

  const handleGoToAuth = useCallback(() => {
    openContactEmail('Serbis - Necesito acceso');
  }, []);

  const handleGoToWorkerSignup = useCallback(() => {
    openContactEmail('Serbis - Soy trabajador y quiero sumarme');
  }, []);

  const handleSignup = useCallback(async (email: string, _password: string, data: any) => {
    const description = typeof data?.description === 'string' ? data.description : 'Sin descripcion';
    openContactEmail(
      'Serbis - Lead desde landing',
      `Email: ${email || 'No informado'}\n\nDescripcion:\n${description}`
    );
  }, []);

  return (
    <LandingPage
      onGoToAuth={handleGoToAuth}
      onGoToSignup={handleGoToSignup}
      onGoToWorkerSignup={handleGoToWorkerSignup}
      onOpenWizard={handleOpenWizard}
      onWizardData={handleWizardData}
      onOpenManagement={handleGoToAuth}
      onOpenPublicManagement={handleGoToAuth}
      onOpenSerbisAdmin={handleGoToAuth}
      onSignup={handleSignup}
      busy={false}
    />
  );
}
