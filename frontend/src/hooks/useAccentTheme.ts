import { useEffect, useState } from 'react';
import {
  ACCENT_THEME_STORAGE_KEY,
  DEFAULT_ACCENT_THEME,
  accentThemeOptions,
  isAccentTheme,
  type AccentThemeId,
} from '../shared/theme';

function getQueryAccentTheme() {
  if (typeof window === 'undefined') {
    return null;
  }

  return new URLSearchParams(window.location.search).get('accent');
}

function getStoredAccentTheme() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(ACCENT_THEME_STORAGE_KEY);
}

function getInitialAccentTheme(): AccentThemeId {
  const queryAccent = getQueryAccentTheme();

  if (isAccentTheme(queryAccent)) {
    return queryAccent;
  }

  const storedAccent = getStoredAccentTheme();

  if (isAccentTheme(storedAccent)) {
    return storedAccent;
  }

  return DEFAULT_ACCENT_THEME;
}

function applyAccentTheme(accentTheme: AccentThemeId) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.dataset.accentTheme = accentTheme;
}

export function useAccentTheme() {
  const [accentTheme, setAccentTheme] = useState(getInitialAccentTheme);

  useEffect(() => {
    applyAccentTheme(accentTheme);
    window.localStorage.setItem(ACCENT_THEME_STORAGE_KEY, accentTheme);
  }, [accentTheme]);

  return {
    accentTheme,
    accentThemeOptions,
    setAccentTheme,
  };
}
