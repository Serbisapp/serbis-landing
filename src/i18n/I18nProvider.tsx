import React from 'react';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, SupportedLocale } from './messages';

type I18nContextValue = {
  locale: SupportedLocale;
  setLocale: (next: SupportedLocale) => void;
};

const STORAGE_KEY = 'serbis.locale';
const I18nContext = React.createContext<I18nContextValue | null>(null);

const normalizeLocale = (candidate: string | null | undefined): SupportedLocale => {
  const value = String(candidate || '').trim();
  if (SUPPORTED_LOCALES.includes(value as SupportedLocale)) return value as SupportedLocale;
  const lower = value.toLowerCase();
  if (lower.startsWith('es')) return 'es-AR';
  if (lower.startsWith('en')) return 'en-US';
  return DEFAULT_LOCALE;
};

const readInitialLocale = (): SupportedLocale => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const fromStorageRaw = String(window.localStorage.getItem(STORAGE_KEY) || '').trim();
  if (fromStorageRaw) return normalizeLocale(fromStorageRaw);
  return normalizeLocale(window.navigator.language);
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<SupportedLocale>(() => readInitialLocale());

  const setLocale = React.useCallback((next: SupportedLocale) => {
    setLocaleState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const value = React.useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return context;
}
