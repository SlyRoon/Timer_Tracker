import { useTranslation } from 'react-i18next';

interface TodayEntriesMessageProps {
  error: string;
  isLoading: boolean;
  message: string;
}

export function TodayEntriesMessage({
  error,
  isLoading,
  message,
}: TodayEntriesMessageProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="mt-5 rounded-lg border border-zinc-200 bg-neutral-50 px-4 py-3 text-sm text-zinc-600">
        {t('today.loading')}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (message) {
    return (
      <div className="mt-5 rounded-lg border border-[rgb(var(--color-accent-border))] bg-[rgb(var(--color-accent-soft))] px-4 py-3 text-sm text-[rgb(var(--color-accent-text))]">
        {message}
      </div>
    );
  }

  return null;
}
