import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import ukCommon from './locales/uk/common.json';

export const supportedLanguages = ['uk', 'en'] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

const LANGUAGE_STORAGE_KEY = 'time-tracker-language';
const DEFAULT_LANGUAGE: SupportedLanguage = 'uk';

function isSupportedLanguage(value: string | null): value is SupportedLanguage {
  return supportedLanguages.includes(value as SupportedLanguage);
}

function getQueryLanguage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return new URLSearchParams(window.location.search).get('lang');
}

function getStoredLanguage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
}

function getInitialLanguage(): SupportedLanguage {
  const queryLanguage = getQueryLanguage();

  if (isSupportedLanguage(queryLanguage)) {
    return queryLanguage;
  }

  const storedLanguage = getStoredLanguage();

  if (isSupportedLanguage(storedLanguage)) {
    return storedLanguage;
  }

  return DEFAULT_LANGUAGE;
}

i18n.use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  lng: getInitialLanguage(),
  resources: {
    en: {
      common: enCommon,
    },
    uk: {
      common: ukCommon,
    },
  },
  defaultNS: 'common',
});

i18n.on('languageChanged', (language) => {
  if (!isSupportedLanguage(language) || typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
});

export default i18n;
