import { useEffect, useState } from 'react';
import type {
  Project,
  TimeEntry,
  UpdateEntryManualTimePayload,
} from '../../../types';
import { fromDateTimeLocalValue, toDateTimeLocalValue } from '../../../utils/date-time';
import { formatDuration } from '../../../utils/format-duration';

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
  const [taskName, setTaskName] = useState(entry.taskName);
  const [projectId, setProjectId] = useState(entry.projectId);
  const [startTime, setStartTime] = useState(
    toDateTimeLocalValue(entry.startTime),
  );
  const [endTime, setEndTime] = useState(toDateTimeLocalValue(entry.endTime));
  const [durationMinutes, setDurationMinutes] = useState(
    String(entry.durationMinutes),
  );

  useEffect(() => {
    setTaskName(entry.taskName);
    setProjectId(entry.projectId);
    setStartTime(toDateTimeLocalValue(entry.startTime));
    setEndTime(toDateTimeLocalValue(entry.endTime));
    setDurationMinutes(String(entry.durationMinutes));
  }, [entry]);

  const saveManualTime = () => {
    const payload: UpdateEntryManualTimePayload = {};
    const normalizedStartTime = fromDateTimeLocalValue(startTime);
    const normalizedEndTime = fromDateTimeLocalValue(endTime);
    const normalizedDuration = Number(durationMinutes);

    if (normalizedStartTime) {
      payload.startTime = normalizedStartTime;
    }

    if (normalizedEndTime) {
      payload.endTime = normalizedEndTime;
    }

    if (Number.isFinite(normalizedDuration)) {
      payload.durationMinutes = normalizedDuration;
    }

    return onSaveManualTime(entry.id, payload);
  };

  return (
    <div className="grid gap-4 px-4 py-4 lg:grid-cols-[1fr_180px_220px]">
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            disabled={isUpdating}
            onChange={(event) => setTaskName(event.target.value)}
            value={taskName}
          />
          <button
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950 disabled:cursor-not-allowed disabled:text-zinc-400"
            disabled={isUpdating || taskName.trim().length === 0}
            onClick={() => onSaveTaskName(entry.id, taskName)}
            type="button"
          >
            Save task
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-600">
          <span>{project?.name ?? 'Unknown project'}</span>
          <span>{formatDuration(entry.durationMinutes)}</span>
          <span>
            {entry.endTime ? 'Completed' : 'Running'}
          </span>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase text-zinc-500 lg:hidden">
          Project
        </label>
        <div className="mt-2 flex gap-2 lg:mt-0">
          <select
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            disabled={isUpdating || projects.length === 0}
            onChange={(event) => setProjectId(event.target.value)}
            value={projectId}
          >
            {projects.map((availableProject) => (
              <option key={availableProject.id} value={availableProject.id}>
                {availableProject.name}
              </option>
            ))}
          </select>
          <button
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950 disabled:cursor-not-allowed disabled:text-zinc-400"
            disabled={isUpdating || !projectId}
            onClick={() => onSaveProject(entry.id, projectId)}
            type="button"
          >
            Save
          </button>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase text-zinc-500 lg:hidden">
          Manual time
        </label>
        <div className="mt-2 grid gap-2 lg:mt-0">
          <input
            aria-label="Start time"
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            disabled={isUpdating}
            onChange={(event) => setStartTime(event.target.value)}
            type="datetime-local"
            value={startTime}
          />
          <input
            aria-label="End time"
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            disabled={isUpdating}
            onChange={(event) => setEndTime(event.target.value)}
            type="datetime-local"
            value={endTime}
          />
          <div className="flex gap-2">
            <input
              aria-label="Duration minutes"
              className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              disabled={isUpdating}
              min="0"
              onChange={(event) => setDurationMinutes(event.target.value)}
              type="number"
              value={durationMinutes}
            />
            <button
              className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
              disabled={isUpdating}
              onClick={saveManualTime}
              type="button"
            >
              Save time
            </button>
          </div>
          <button
            className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-red-300"
            disabled={isUpdating}
            onClick={() => onDeleteEntry(entry.id)}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
