import { useTranslation } from 'react-i18next';
import type {
  Project,
  TimeEntry,
  UpdateEntryManualTimePayload,
} from '../../../types';
import { TodayEntryRow } from './TodayEntryRow';

interface TodayEntriesListProps {
  entries: TimeEntry[];
  isLoading: boolean;
  onDeleteEntry: (entryId: string) => Promise<void>;
  onSaveManualTime: (
    entryId: string,
    payload: UpdateEntryManualTimePayload,
  ) => Promise<void>;
  onSaveProject: (entryId: string, projectId: string) => Promise<void>;
  onSaveTaskName: (entryId: string, taskName: string) => Promise<void>;
  projectById: Map<string, Project>;
  projects: Project[];
  updatingEntryId: string | null;
}

export function TodayEntriesList({
  entries,
  isLoading,
  onDeleteEntry,
  onSaveManualTime,
  onSaveProject,
  onSaveTaskName,
  projectById,
  projects,
  updatingEntryId,
}: TodayEntriesListProps) {
  const { t } = useTranslation();

  if (!isLoading && entries.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-dashed border-zinc-300 bg-neutral-50 p-6 text-sm text-zinc-600">
        {t('today.empty')}
      </div>
    );
  }

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200">
      <div className="grid grid-cols-[1fr_180px_220px] gap-4 bg-neutral-50 px-4 py-3 text-xs font-semibold uppercase text-zinc-500 max-lg:hidden">
        <span>{t('today.entryColumn')}</span>
        <span>{t('today.projectColumn')}</span>
        <span>{t('today.manualTimeColumn')}</span>
      </div>

      <div className="divide-y divide-zinc-200">
        {entries.map((entry) => (
          <TodayEntryRow
            entry={entry}
            isUpdating={updatingEntryId === entry.id}
            key={entry.id}
            onDeleteEntry={onDeleteEntry}
            onSaveManualTime={onSaveManualTime}
            onSaveProject={onSaveProject}
            onSaveTaskName={onSaveTaskName}
            project={projectById.get(entry.projectId) ?? null}
            projects={projects}
          />
        ))}
      </div>
    </div>
  );
}
