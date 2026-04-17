import { useTranslation } from 'react-i18next';
import { LuChartBar } from 'react-icons/lu';
import { ReportControls } from './components/ReportControls';
import { ReportGroupedTable } from './components/ReportGroupedTable';
import { ReportMessage } from './components/ReportMessage';
import { ReportSummary } from './components/ReportSummary';
import { useReports } from './useReports';

export function ReportsFoundation() {
  const { t } = useTranslation();
  const reports = useReports();

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[rgb(var(--color-accent-soft))] text-[rgb(var(--color-accent-text))]">
            <LuChartBar className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[rgb(var(--color-accent-text))]">
              {t('reports.eyebrow')}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
              {t('reports.title')}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
              {t('reports.description')}
            </p>
          </div>
        </div>

        <ReportControls
          date={reports.date}
          isExporting={reports.isExporting}
          isLoading={reports.isLoading}
          onDateChange={reports.setDate}
          onExportCsv={reports.exportCsv}
          onPeriodChange={reports.setPeriod}
          onRefresh={reports.loadReport}
          period={reports.period}
        />

        <ReportMessage
          error={reports.error}
          isLoading={reports.isLoading}
          message={reports.message}
        />
      </div>

      <ReportSummary
        entryCount={reports.entryCount}
        isLoading={reports.isLoading}
        period={reports.period}
        report={reports.report}
      />

      <ReportGroupedTable
        isLoading={reports.isLoading}
        projectById={reports.projectById}
        report={reports.report}
      />
    </section>
  );
}
