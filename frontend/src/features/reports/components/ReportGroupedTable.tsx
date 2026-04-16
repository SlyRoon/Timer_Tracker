import type { PeriodReport, Project, TimeEntry } from '../../../types';
import { formatDuration } from '../../../utils/format-duration';

interface ReportGroupedTableProps {
  isLoading: boolean;
  projectById: Map<string, Project>;
  report: PeriodReport | null;
}

function formatDateTime(value: string | null) {
  if (!value) {
    return 'Running';
  }

  return new Date(value).toLocaleString();
}

function ReportEntryRow({ entry }: { entry: TimeEntry }) {
  return (
    <tr className="border-t border-zinc-100">
      <td className="px-4 py-3 text-sm font-medium text-zinc-950">
        {entry.taskName}
      </td>
      <td className="px-4 py-3 text-sm text-zinc-600">
        {formatDateTime(entry.startTime)}
      </td>
      <td className="px-4 py-3 text-sm text-zinc-600">
        {formatDateTime(entry.endTime)}
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
  if (isLoading) {
    return (
      <section className="rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-sm text-zinc-600">Loading grouped report...</p>
      </section>
    );
  }

  if (!report || report.groups.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-zinc-300 bg-white p-6">
        <p className="text-sm font-semibold text-zinc-950">
          No report data for this period
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          Track time in this range to populate totals and grouped rows.
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
                  <p className="text-sm font-semibold text-zinc-950">
                    {project?.name ?? 'Unknown project'}
                  </p>
                  <p className="mt-1 font-mono text-xs text-zinc-500">
                    {group.projectId}
                  </p>
                </div>
              </div>

              <p className="text-sm font-semibold text-emerald-700">
                {formatDuration(group.totalDurationMinutes)}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr className="text-xs font-semibold uppercase text-zinc-500">
                    <th className="px-4 py-3">Task</th>
                    <th className="px-4 py-3">Start</th>
                    <th className="px-4 py-3">End</th>
                    <th className="px-4 py-3 text-right">Duration</th>
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
