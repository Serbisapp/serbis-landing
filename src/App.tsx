import React, { useCallback, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import type { Shift } from './types';
import { applyLandingSeo } from './utils/seo';

const APP_BASE_URL = (import.meta.env.VITE_APP_BASE_URL || 'https://app.serbis.app').replace(/\/+$/, '');

function goToApp(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  window.location.href = `${APP_BASE_URL}${normalizedPath}`;
}

function scrollToCta() {
  const cta = document.getElementById('cta');
  if (!cta) return;
  cta.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  useEffect(() => {
    applyLandingSeo();
  }, []);

  const handleOpenWizard = useCallback(() => {
    scrollToCta();
  }, []);

  const handleWizardData = useCallback((data: Partial<Shift>) => {
    const description = data.description?.trim();
    if (description) {
      const params = new URLSearchParams({ lead: description });
      goToApp(`/signup?${params.toString()}`);
      return;
    }
    goToApp('/signup');
  }, []);

  const handleGoToSignup = useCallback(() => {
    goToApp('/signup');
  }, []);

  const handleGoToAuth = useCallback(() => {
    goToApp('/auth');
  }, []);

  const handleGoToWorkerSignup = useCallback(() => {
    goToApp('/worker-signup');
  }, []);

  const handleSignup = useCallback(async (_email: string, _password: string, _data: any) => {
    goToApp('/signup');
  }, []);

  return (
    <LandingPage
      onGoToAuth={handleGoToAuth}
      onGoToSignup={handleGoToSignup}
      onGoToWorkerSignup={handleGoToWorkerSignup}
      onOpenWizard={handleOpenWizard}
      onWizardData={handleWizardData}
      onOpenManagement={() => goToApp('/management')}
      onOpenPublicManagement={() => goToApp('/management/public')}
      onOpenSerbisAdmin={() => goToApp('/admin')}
      onSignup={handleSignup}
      busy={false}
    />
  );
}
