import { useTranslation } from 'react-i18next';
import { LuCirclePause, LuClock3, LuPlay, LuSquare } from 'react-icons/lu';
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
  const { i18n, t } = useTranslation();

  if (!activeTimer) {
    return (
      <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[rgb(var(--color-accent-soft))] text-[rgb(var(--color-accent-text))]">
            <LuClock3 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[rgb(var(--color-accent-text))]">
              {t('tracker.activeTimer')}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
              {t('tracker.readyTitle')}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
              {t('tracker.readyDescription')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-[rgb(var(--color-accent-border))] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[rgb(var(--color-accent))] text-white shadow-sm">
            <LuCirclePause className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[rgb(var(--color-accent-text))]">
              {t('tracker.activeTimer')}
            </p>
            <h2 className="mt-2 break-words text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
              {activeTimer.taskName}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-zinc-600">
              <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1">
                {activeProject?.name ?? t('common.project')}
              </span>
              <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1">
                {t('tracker.startedAt', {
                  time: new Date(activeTimer.startTime).toLocaleTimeString(
                    i18n.language,
                  ),
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase text-zinc-500">
              <LuPlay className="h-3.5 w-3.5" aria-hidden="true" />
              {t('tracker.runningLabel')}
            </p>
            <p className="mt-1 font-mono text-3xl font-semibold text-zinc-950">
              {formatElapsedTime(elapsedSeconds)}
            </p>
          </div>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
            disabled={isStopping}
            onClick={onStop}
            type="button"
          >
            <LuSquare className="h-4 w-4" aria-hidden="true" />
            {isStopping ? t('tracker.stopping') : t('tracker.stop')}
          </button>
        </div>
      </div>
    </section>
  );
}
