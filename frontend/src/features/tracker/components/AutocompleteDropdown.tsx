import { useTranslation } from 'react-i18next';
import type { TaskName } from '../../../types';

interface AutocompleteDropdownProps {
  isLoading: boolean;
  isOpen: boolean;
  onSelect: (value: string) => void;
  suggestions: TaskName[];
}

export function AutocompleteDropdown({
  isLoading,
  isOpen,
  onSelect,
  suggestions,
}: AutocompleteDropdownProps) {
  const { i18n, t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      {isLoading ? (
        <p className="px-4 py-3 text-sm text-zinc-600">
          {t('tracker.loadingSuggestions')}
        </p>
      ) : null}

      {!isLoading && suggestions.length === 0 ? (
        <p className="px-4 py-3 text-sm text-zinc-600">
          {t('tracker.noSuggestions')}
        </p>
      ) : null}

      {!isLoading && suggestions.length > 0 ? (
        <ul className="max-h-56 overflow-y-auto py-1">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <button
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-zinc-700 transition hover:bg-neutral-50 hover:text-zinc-950"
                onMouseDown={(event) => {
                  event.preventDefault();
                  onSelect(suggestion.value);
                }}
                type="button"
              >
                <span className="min-w-0 break-words">{suggestion.value}</span>
                <span className="text-xs text-zinc-500">
                  {new Date(suggestion.lastUsedAt).toLocaleDateString(
                    i18n.language,
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
