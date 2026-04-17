import { useTranslation } from 'react-i18next';
import { LuFolderClock } from 'react-icons/lu';
import type { Project, ProjectTotal, TodayEntryGroup } from '../../../types';
import { formatDuration } from '../../../utils/format-duration';

interface TodayEntriesGroupedSummaryProps {
  groups: TodayEntryGroup[];
  isLoading: boolean;
  projectById: Map<string, Project>;
  totals: ProjectTotal[];
}

export function TodayEntriesGroupedSummary({
  groups,
  isLoading,
  projectById,
  totals,
}: TodayEntriesGroupedSummaryProps) {
  const { t } = useTranslation();

  if (isLoading || groups.length === 0) {
    return null;
  }

  const totalByProject = new Map(
    totals.map((total) => [total.projectId, total.totalDurationMinutes]),
  );

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-700">
          <LuFolderClock className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-[rgb(var(--color-accent-text))]">
            {t('today.groupedTotals')}
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-normal text-zinc-950">
            {t('today.byProject')}
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {groups.map((group) => {
          const project = projectById.get(group.projectId);
          const total =
            totalByProject.get(group.projectId) ?? group.totalDurationMinutes;

          return (
            <div
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-4"
              key={group.projectId}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <span
                    className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: project?.color ?? '#71717a' }}
                  />
                  <div className="min-w-0">
                    <p className="break-words font-semibold text-zinc-950">
                      {project?.name ?? t('common.unknownProject')}
                    </p>
                    <p className="mt-1 text-sm text-zinc-600">
                      {t('today.entriesCount', {
                        count: group.entries.length,
                      })}
                    </p>
                  </div>
                </div>
                <p className="font-mono text-xl font-semibold text-zinc-950">
                  {formatDuration(total)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
