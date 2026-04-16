import type { Project, TimeEntry } from '../../../types';
import { formatElapsedTime } from '../../../utils/format-elapsed-time';

interface ActiveTimerPanelProps {
  activeProject: Project | null;
  activeTimer: TimeEntry | null;
  elapsedSeconds: number;
  isStopping: boolean;
  onStop: () => void;
}

export function ActiveTimerPanel({
  activeProject,
  activeTimer,
  elapsedSeconds,
  isStopping,
  onStop,
}: ActiveTimerPanelProps) {
  if (!activeTimer) {
    return (
      <section className="rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-sm font-medium text-emerald-700">Active timer</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-normal text-zinc-950">
          Ready to track time
        </h2>
        <p className="mt-3 text-base leading-7 text-zinc-600">
          Choose a project, enter a task name, and start a focused work session.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-emerald-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-700">Active timer</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-normal text-zinc-950">
            {activeTimer.taskName}
          </h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-600">
            <span>{activeProject?.name ?? 'Project'}</span>
            <span>Started {new Date(activeTimer.startTime).toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-lg border border-zinc-200 bg-neutral-50 px-5 py-4 text-center">
            <p className="text-xs font-medium uppercase text-zinc-500">
              Running
            </p>
            <p className="mt-1 font-mono text-3xl font-semibold text-zinc-950">
              {formatElapsedTime(elapsedSeconds)}
            </p>
          </div>

          <button
            className="rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
            disabled={isStopping}
            onClick={onStop}
            type="button"
          >
            {isStopping ? 'Stopping...' : 'Stop'}
          </button>
        </div>
      </div>
    </section>
  );
}
