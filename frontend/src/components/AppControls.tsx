import { useTranslation } from 'react-i18next';
import { LuLanguages, LuPalette } from 'react-icons/lu';
import { useAccentTheme } from '../hooks/useAccentTheme';
import type { AccentThemeId } from '../shared/theme';
import type { SupportedLanguage } from '../i18n';

const LANGUAGE_OPTIONS: Array<{ label: string; value: SupportedLanguage }> = [
  { label: 'UK', value: 'uk' },
  { label: 'EN', value: 'en' },
];

export function AppControls() {
  const { i18n, t } = useTranslation();
  const { accentTheme, accentThemeOptions, setAccentTheme } =
    useAccentTheme();
  const currentLanguage = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'uk';

  const changeLanguage = (language: SupportedLanguage) => {
    void i18n.changeLanguage(language);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-end">
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold uppercase text-zinc-500">
          <LuLanguages className="h-4 w-4" aria-hidden="true" />
          <span>{t('controls.language')}</span>
        </label>
        <div
          aria-label={t('controls.setLanguage')}
          className="mt-2 flex rounded-md border border-zinc-200 bg-zinc-50 p-1 shadow-sm"
          id="language-switcher"
        >
          {LANGUAGE_OPTIONS.map((language) => {
            const isSelected = language.value === currentLanguage;

            return (
              <button
                className={[
                  'rounded px-3 py-2 text-sm font-semibold transition',
                  isSelected
                    ? 'bg-[rgb(var(--color-accent))] text-white'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950',
                ].join(' ')}
                key={language.value}
                onClick={() => changeLanguage(language.value)}
                type="button"
              >
                {language.label}
              </button>
            );
          })}
        </div>
      </div>

      <label className="block min-w-[160px]" htmlFor="accent-theme">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase text-zinc-500">
          <LuPalette className="h-4 w-4" aria-hidden="true" />
          {t('controls.accentTheme')}
        </span>
        <select
          className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm outline-none transition focus:border-[rgb(var(--color-accent))] focus:ring-2 focus:ring-[rgb(var(--color-accent-soft))]"
          id="accent-theme"
          onChange={(event) =>
            setAccentTheme(event.target.value as AccentThemeId)
          }
          value={accentTheme}
        >
          {accentThemeOptions.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {t(theme.labelKey)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
