import { useTranslation } from 'react-i18next';
import type { PeriodReport, ReportPeriod } from '../../../types';
import { formatDuration } from '../../../utils/format-duration';

interface ReportSummaryProps {
  entryCount: number;
  isLoading: boolean;
  period: ReportPeriod;
  report: PeriodReport | null;
}

function formatDate(value: string, language: string) {
  return new Date(value).toLocaleDateString(language);
}

export function ReportSummary({
  entryCount,
  isLoading,
  period,
  report,
}: ReportSummaryProps) {
  const { i18n, t } = useTranslation();

  if (isLoading) {
    return (
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-600">{t('reports.loadingTotals')}</p>
        </div>
      </section>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <p className="text-sm font-medium text-zinc-600">
          {t('reports.totalTime')}
        </p>
        <p className="mt-2 text-2xl font-semibold text-zinc-950">
          {formatDuration(report.totalDurationMinutes)}
        </p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <p className="text-sm font-medium text-zinc-600">
          {t('common.entries')}
        </p>
        <p className="mt-2 text-2xl font-semibold text-zinc-950">
          {entryCount}
        </p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <p className="text-sm font-medium text-zinc-600">
          {t('reports.range')}
        </p>
        <p className="mt-2 text-sm font-semibold capitalize text-zinc-950">
          {t(`reports.${period}`)}
        </p>
        <p className="mt-1 text-sm text-zinc-600">
          {formatDate(report.range.from, i18n.language)} -{' '}
          {formatDate(report.range.to, i18n.language)}
        </p>
      </div>
    </section>
  );
}
