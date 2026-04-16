import { useTranslation } from 'react-i18next';
import type { PeriodReport, Project, TimeEntry } from '../../../types';
import { formatDuration } from '../../../utils/format-duration';

interface ReportGroupedTableProps {
  isLoading: boolean;
  projectById: Map<string, Project>;
  report: PeriodReport | null;
}

function formatDateTime(value: string | null, language: string, running: string) {
  if (!value) {
    return running;
  }

  return new Date(value).toLocaleString(language);
}

function ReportEntryRow({ entry }: { entry: TimeEntry }) {
  const { i18n, t } = useTranslation();

  return (
    <tr className="border-t border-zinc-100">
      <td className="px-4 py-3 text-sm font-medium text-zinc-950">
        {entry.taskName}
      </td>
      <td className="px-4 py-3 text-sm text-zinc-600">
        {formatDateTime(entry.startTime, i18n.language, t('common.running'))}
      </td>
      <td className="px-4 py-3 text-sm text-zinc-600">
        {formatDateTime(entry.endTime, i18n.language, t('common.running'))}
      </td>
      <td className="px-4 py-3 text-right text-sm font-semibold text-zinc-950">
        {formatDuration(entry.durationMinutes)}
      </td>
    </tr>
  );
}

export function ReportGroupedTable({
  isLoading,
  projectById,
  report,
}: ReportGroupedTableProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section className="rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-sm text-zinc-600">{t('reports.loadingGrouped')}</p>
      </section>
    );
  }

  if (!report || report.groups.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-zinc-300 bg-white p-6">
        <p className="text-sm font-semibold text-zinc-950">
          {t('reports.emptyTitle')}
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          {t('reports.emptyDescription')}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {report.groups.map((group) => {
        const project = projectById.get(group.projectId);

        return (
          <div
            className="overflow-hidden rounded-lg border border-zinc-200 bg-white"
            key={group.projectId}
          >
            <div className="flex flex-col gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="h-4 w-4 rounded border border-zinc-200"
                  style={{ backgroundColor: project?.color ?? '#71717a' }}
                />
                <div>
                  <p className="break-words text-sm font-semibold text-zinc-950">
                    {project?.name ?? t('common.unknownProject')}
                  </p>
                  <p className="mt-1 break-all font-mono text-xs text-zinc-500">
                    {group.projectId}
                  </p>
                </div>
              </div>

              <p className="text-sm font-semibold text-[rgb(var(--color-accent-text))]">
                {formatDuration(group.totalDurationMinutes)}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-left">
                <thead>
                  <tr className="text-xs font-semibold uppercase text-zinc-500">
                    <th className="px-4 py-3">{t('reports.taskHeader')}</th>
                    <th className="px-4 py-3">{t('reports.startHeader')}</th>
                    <th className="px-4 py-3">{t('reports.endHeader')}</th>
                    <th className="px-4 py-3 text-right">
                      {t('reports.durationHeader')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.entries.map((entry) => (
                    <ReportEntryRow entry={entry} key={entry.id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </section>
  );
}
