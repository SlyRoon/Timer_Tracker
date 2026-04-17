import { useTranslation } from 'react-i18next';
import { LuClock3, LuFolderClock } from 'react-icons/lu';
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

function ReportEntryCard({ entry }: { entry: TimeEntry }) {
  const { i18n, t } = useTranslation();

  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 break-words text-sm font-semibold text-zinc-950">
          {entry.taskName}
        </p>
        <span className="shrink-0 rounded-md bg-zinc-100 px-2.5 py-1 font-mono text-sm font-semibold text-zinc-950">
          {formatDuration(entry.durationMinutes)}
        </span>
      </div>

      <div className="mt-3 grid gap-2 text-sm text-zinc-600">
        <p>
          <span className="font-medium text-zinc-700">
            {t('reports.startHeader')}:
          </span>{' '}
          {formatDateTime(entry.startTime, i18n.language, t('common.running'))}
        </p>
        <p>
          <span className="font-medium text-zinc-700">
            {t('reports.endHeader')}:
          </span>{' '}
          {formatDateTime(entry.endTime, i18n.language, t('common.running'))}
        </p>
      </div>
    </article>
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
      <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-600">{t('reports.loadingGrouped')}</p>
      </section>
    );
  }

  if (!report || report.groups.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-zinc-300 bg-white p-6 text-center shadow-sm">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-zinc-100 text-zinc-600">
          <LuFolderClock className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-4 text-sm font-semibold text-zinc-950">
          {t('reports.emptyTitle')}
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600">
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
            className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
            key={group.projectId}
          >
            <div className="flex flex-col gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <span
                  className="mt-1 h-4 w-4 shrink-0 rounded-full border border-white shadow-sm"
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

              <p className="inline-flex items-center gap-2 rounded-md bg-[rgb(var(--color-accent-soft))] px-3 py-2 text-sm font-semibold text-[rgb(var(--color-accent-text))]">
                <LuClock3 className="h-4 w-4" aria-hidden="true" />
                {formatDuration(group.totalDurationMinutes)}
              </p>
            </div>

            <div className="grid gap-3 bg-zinc-50 p-3 md:hidden">
              {group.entries.map((entry) => (
                <ReportEntryCard entry={entry} key={entry.id} />
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
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
