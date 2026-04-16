import type { PeriodReport, ReportPeriod } from '../../../types';
import { formatDuration } from '../../../utils/format-duration';

interface ReportSummaryProps {
  entryCount: number;
  isLoading: boolean;
  period: ReportPeriod;
  report: PeriodReport | null;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString();
}

export function ReportSummary({
  entryCount,
  isLoading,
  period,
  report,
}: ReportSummaryProps) {
  if (isLoading) {
    return (
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-600">Loading totals...</p>
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
        <p className="text-sm font-medium text-zinc-600">Total time</p>
        <p className="mt-2 text-2xl font-semibold text-zinc-950">
          {formatDuration(report.totalDurationMinutes)}
        </p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <p className="text-sm font-medium text-zinc-600">Entries</p>
        <p className="mt-2 text-2xl font-semibold text-zinc-950">
          {entryCount}
        </p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <p className="text-sm font-medium text-zinc-600">Range</p>
        <p className="mt-2 text-sm font-semibold capitalize text-zinc-950">
          {period}
        </p>
        <p className="mt-1 text-sm text-zinc-600">
          {formatDate(report.range.from)} - {formatDate(report.range.to)}
        </p>
      </div>
    </section>
  );
}
