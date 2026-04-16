import { useTranslation } from 'react-i18next';
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
      <section className="rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-sm font-medium text-[rgb(var(--color-accent-text))]">
          {t('tracker.activeTimer')}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
          {t('tracker.readyTitle')}
        </h2>
        <p className="mt-3 text-base leading-7 text-zinc-600">
          {t('tracker.readyDescription')}
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-[rgb(var(--color-accent-border))] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[rgb(var(--color-accent-text))]">
            {t('tracker.activeTimer')}
          </p>
          <h2 className="mt-3 break-words text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
            {activeTimer.taskName}
          </h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-600">
            <span>{activeProject?.name ?? t('common.project')}</span>
            <span>
              {t('tracker.startedAt', {
                time: new Date(activeTimer.startTime).toLocaleTimeString(
                  i18n.language,
                ),
              })}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-lg border border-zinc-200 bg-neutral-50 px-5 py-4 text-center">
            <p className="text-xs font-medium uppercase text-zinc-500">
              {t('tracker.runningLabel')}
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
            {isStopping ? t('tracker.stopping') : t('tracker.stop')}
          </button>
        </div>
      </div>
    </section>
  );
}
