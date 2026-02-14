import React, { useCallback } from 'react';
import { LandingPage } from './components/LandingPage';
import type { Shift } from './types';

const APP_ORIGIN = 'https://app.serbis.app';

function goToApp(pathname: string, query?: Record<string, string>) {
  const url = new URL(pathname, APP_ORIGIN);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v) url.searchParams.set(k, v);
    }
  }
  window.location.href = url.toString();
}

export default function App() {
  const handleOpenWizard = useCallback(() => {
    // Start the request flow in the main app.
    goToApp('/', { start: 'wizard' });
  }, []);

  const handleWizardData = useCallback((data: Partial<Shift>) => {
    const description = data.description?.trim() || '';
    goToApp('/', { start: 'wizard', desc: description });
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

  const handleSignup = useCallback(async (email: string, _password: string, data: any) => {
    // Keep signup in the main app (Cognito auth lives there).
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
