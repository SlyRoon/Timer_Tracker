import { useTranslation } from 'react-i18next';
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
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <div>
          <p className="text-sm font-medium text-[rgb(var(--color-accent-text))]">
            {t('reports.eyebrow')}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-normal text-zinc-950">
            {t('reports.title')}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
            {t('reports.description')}
          </p>
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
