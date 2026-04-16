export const accentThemeIds = [
  'emerald',
  'blue',
  'violet',
  'amber',
  'rose',
] as const;

export type AccentThemeId = (typeof accentThemeIds)[number];

export interface AccentThemeOption {
  id: AccentThemeId;
  labelKey: string;
}

export const accentThemeOptions: AccentThemeOption[] = [
  { id: 'emerald', labelKey: 'theme.emerald' },
  { id: 'blue', labelKey: 'theme.blue' },
  { id: 'violet', labelKey: 'theme.violet' },
  { id: 'amber', labelKey: 'theme.amber' },
  { id: 'rose', labelKey: 'theme.rose' },
];

export const DEFAULT_ACCENT_THEME: AccentThemeId = 'emerald';
export const ACCENT_THEME_STORAGE_KEY = 'time-tracker-accent-theme';

export function isAccentTheme(value: string | null): value is AccentThemeId {
  return accentThemeIds.includes(value as AccentThemeId);
}
