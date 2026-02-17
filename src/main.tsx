import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/app.css';
import './styles/effects.css';
import App from './App';
import { I18nProvider } from './i18n/I18nProvider';
import { initWebVitalsMonitoring } from './utils/webVitals';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>
);

initWebVitalsMonitoring('serbis-landing');
