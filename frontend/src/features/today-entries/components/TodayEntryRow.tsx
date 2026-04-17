import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LuCalendarClock,
  LuClock3,
  LuFolderKanban,
  LuSave,
  LuTrash2,
} from 'react-icons/lu';
import type {
  Project,
  TimeEntry,
  UpdateEntryManualTimePayload,
} from '../../../types';
import { fromDateTimeLocalValue, toDateTimeLocalValue } from '../../../utils/date-time';
import {
  formatDurationInput,
  parseDurationInput,
} from '../../../utils/duration-input';
import { formatDuration } from '../../../utils/format-duration';

const inputClass =
  'w-full min-w-0 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none transition focus:border-[rgb(var(--color-accent))] focus:ring-2 focus:ring-[rgb(var(--color-accent-soft))] disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500';

const secondaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-400 hover:text-zinc-950 disabled:cursor-not-allowed disabled:text-zinc-400';

const primaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-md bg-[rgb(var(--color-accent))] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[rgb(var(--color-accent-hover))] disabled:cursor-not-allowed disabled:bg-zinc-400';

interface TodayEntryRowProps {
  entry: TimeEntry;
  isUpdating: boolean;
  onDeleteEntry: (entryId: string) => Promise<void>;
  onSaveManualTime: (
    entryId: string,
    payload: UpdateEntryManualTimePayload,
  ) => Promise<void>;
  onSaveProject: (entryId: string, projectId: string) => Promise<void>;
  onSaveTaskName: (entryId: string, taskName: string) => Promise<void>;
  project: Project | null;
  projects: Project[];
}

export function TodayEntryRow({
  entry,
  isUpdating,
  onDeleteEntry,
  onSaveManualTime,
  onSaveProject,
  onSaveTaskName,
  project,
  projects,
}: TodayEntryRowProps) {
  const { t } = useTranslation();
  const [taskName, setTaskName] = useState(entry.taskName);
  const [projectId, setProjectId] = useState(entry.projectId);
  const [startTime, setStartTime] = useState(
    toDateTimeLocalValue(entry.startTime),
  );
  const [endTime, setEndTime] = useState(toDateTimeLocalValue(entry.endTime));
  const [durationInput, setDurationInput] = useState(
    formatDurationInput(entry.durationMinutes),
  );

  useEffect(() => {
    setTaskName(entry.taskName);
    setProjectId(entry.projectId);
    setStartTime(toDateTimeLocalValue(entry.startTime));
    setEndTime(toDateTimeLocalValue(entry.endTime));
    setDurationInput(formatDurationInput(entry.durationMinutes));
  }, [entry]);

  const saveManualTime = () => {
    const payload: UpdateEntryManualTimePayload = {};
    const normalizedStartTime = fromDateTimeLocalValue(startTime);
    const normalizedEndTime = fromDateTimeLocalValue(endTime);
    const normalizedDuration = parseDurationInput(durationInput);

    if (normalizedStartTime) {
      payload.startTime = normalizedStartTime;
    }

    if (normalizedEndTime) {
      payload.endTime = normalizedEndTime;
    }

    if (normalizedDuration !== null) {
      payload.durationMinutes = normalizedDuration;
    }

    return onSaveManualTime(entry.id, payload);
  };

  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300 sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <span
                className="mt-1 h-4 w-4 shrink-0 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: project?.color ?? '#71717a' }}
              />
              <div className="min-w-0">
                <p className="break-words text-lg font-semibold text-zinc-950">
                  {entry.taskName}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-sm text-zinc-600">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-2.5 py-1">
                    <LuFolderKanban className="h-3.5 w-3.5" aria-hidden="true" />
                    {project?.name ?? t('common.unknownProject')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-2.5 py-1">
                    <LuClock3 className="h-3.5 w-3.5" aria-hidden="true" />
                    {formatDuration(entry.durationMinutes)}
                  </span>
                  <span className="rounded-md bg-zinc-100 px-2.5 py-1">
                    {entry.endTime ? t('common.completed') : t('common.running')}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-[rgb(var(--color-accent-border))] bg-[rgb(var(--color-accent-soft))] px-3 py-2 text-sm font-semibold text-[rgb(var(--color-accent-text))] sm:text-right">
              {formatDuration(entry.durationMinutes)}
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <label className="text-xs font-semibold uppercase text-zinc-500">
                {t('common.task')}
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  className={inputClass}
                  disabled={isUpdating}
                  onChange={(event) => setTaskName(event.target.value)}
                  value={taskName}
                />
                <button
                  className={secondaryButtonClass}
                  disabled={isUpdating || taskName.trim().length === 0}
                  onClick={() => onSaveTaskName(entry.id, taskName)}
                  type="button"
                >
                  <LuSave className="h-4 w-4" aria-hidden="true" />
                  {t('today.saveTask')}
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <label className="text-xs font-semibold uppercase text-zinc-500">
                {t('common.project')}
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <select
                  className={inputClass}
                  disabled={isUpdating || projects.length === 0}
                  onChange={(event) => setProjectId(event.target.value)}
                  value={projectId}
                >
                  {projects.map((availableProject) => (
                    <option
                      key={availableProject.id}
                      value={availableProject.id}
                    >
                      {availableProject.name}
                    </option>
                  ))}
                </select>
                <button
                  className={secondaryButtonClass}
                  disabled={isUpdating || !projectId}
                  onClick={() => onSaveProject(entry.id, projectId)}
                  type="button"
                >
                  <LuSave className="h-4 w-4" aria-hidden="true" />
                  {t('common.save')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 xl:w-[340px]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-zinc-500">
            <LuCalendarClock className="h-4 w-4" aria-hidden="true" />
            {t('common.manualTime')}
          </div>

          <div className="mt-3 grid gap-3">
            <label className="block">
              <span className="text-xs font-medium text-zinc-600">
                {t('today.startTime')}
              </span>
              <input
                aria-label={t('today.startTime')}
                className={`${inputClass} mt-1`}
                disabled={isUpdating}
                onChange={(event) => setStartTime(event.target.value)}
                type="datetime-local"
                value={startTime}
              />
            </label>

            <label className="block">
              <span className="text-xs font-medium text-zinc-600">
                {t('today.endTime')}
              </span>
              <input
                aria-label={t('today.endTime')}
                className={`${inputClass} mt-1`}
                disabled={isUpdating}
                onChange={(event) => setEndTime(event.target.value)}
                type="datetime-local"
                value={endTime}
              />
            </label>

            <label className="block">
              <span className="text-xs font-medium text-zinc-600">
                {t('common.duration')}
              </span>
              <div className="mt-1 flex flex-col gap-2 sm:flex-row xl:flex-col">
                <input
                  aria-label={t('common.duration')}
                  className={inputClass}
                  disabled={isUpdating}
                  inputMode="numeric"
                  onChange={(event) => setDurationInput(event.target.value)}
                  pattern="\\d+:[0-5]\\d"
                  placeholder={t('today.durationPlaceholder')}
                  type="text"
                  value={durationInput}
                />
                <button
                  className={primaryButtonClass}
                  disabled={isUpdating}
                  onClick={saveManualTime}
                  type="button"
                >
                  <LuSave className="h-4 w-4" aria-hidden="true" />
                  {t('today.saveTime')}
                </button>
              </div>
            </label>
          </div>

          <div className="mt-4 border-t border-zinc-200 pt-3">
            <button
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-red-300"
              disabled={isUpdating}
              onClick={() => onDeleteEntry(entry.id)}
              type="button"
            >
              <LuTrash2 className="h-4 w-4" aria-hidden="true" />
              {t('common.delete')}
            </button>
          </div>
        </aside>
      </div>
    </article>
  );
}
