import { useTranslation } from 'react-i18next';

interface ReportMessageProps {
  error: string;
  isLoading: boolean;
  message: string;
}

export function ReportMessage({
  error,
  isLoading,
  message,
}: ReportMessageProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <p className="mt-5 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
        {t('reports.loadingReport')}
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </p>
    );
  }

  if (message) {
    return (
      <p className="mt-5 rounded-md border border-[rgb(var(--color-accent-border))] bg-[rgb(var(--color-accent-soft))] px-4 py-3 text-sm text-[rgb(var(--color-accent-text))]">
        {message}
      </p>
    );
  }

  return null;
}
