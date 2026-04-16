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
  if (isLoading || groups.length === 0) {
    return null;
  }

  const totalByProject = new Map(
    totals.map((total) => [total.projectId, total.totalDurationMinutes]),
  );

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6">
      <p className="text-sm font-medium text-emerald-700">Grouped totals</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-normal text-zinc-950">
        By project
      </h2>

      <div className="mt-6 grid gap-3">
        {groups.map((group) => {
          const project = projectById.get(group.projectId);
          const total =
            totalByProject.get(group.projectId) ?? group.totalDurationMinutes;

          return (
            <div
              className="rounded-lg border border-zinc-200 bg-neutral-50 p-4"
              key={group.projectId}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-zinc-950">
                    {project?.name ?? 'Unknown project'}
                  </p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {group.entries.length} entries
                  </p>
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
