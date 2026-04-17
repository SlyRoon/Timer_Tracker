import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { LuPlay, LuSparkles } from 'react-icons/lu';
import type { Project, TaskName } from '../../../types';
import { AutocompleteDropdown } from './AutocompleteDropdown';

interface TrackerFormProps {
  canStart: boolean;
  isLoadingProjects: boolean;
  isLoadingSuggestions: boolean;
  isStarting: boolean;
  isSuggestionsOpen: boolean;
  onProjectChange: (projectId: string) => void;
  onStart: (event: FormEvent<HTMLFormElement>) => void;
  onSuggestionSelect: (value: string) => void;
  onSuggestionsClose: () => void;
  onSuggestionsOpen: () => void;
  onTaskNameChange: (value: string) => void;
  projects: Project[];
  selectedProjectId: string;
  suggestions: TaskName[];
  taskName: string;
}

export function TrackerForm({
  canStart,
  isLoadingProjects,
  isLoadingSuggestions,
  isStarting,
  isSuggestionsOpen,
  onProjectChange,
  onStart,
  onSuggestionSelect,
  onSuggestionsClose,
  onSuggestionsOpen,
  onTaskNameChange,
  projects,
  selectedProjectId,
  suggestions,
  taskName,
}: TrackerFormProps) {
  const { t } = useTranslation();

  return (
    <form
      className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"
      onSubmit={onStart}
    >
      <div className="flex items-start gap-3">
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-700">
          <LuSparkles className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-[rgb(var(--color-accent-text))]">
            {t('tracker.startEyebrow')}
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-normal text-zinc-950">
            {t('tracker.formTitle')}
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px_auto] lg:items-end">
        <label className="relative block">
          <span className="text-sm font-medium text-zinc-700">
            {t('tracker.taskName')}
          </span>
          <input
            autoComplete="off"
            className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 shadow-sm outline-none transition focus:border-[rgb(var(--color-accent))] focus:ring-2 focus:ring-[rgb(var(--color-accent-soft))]"
            onBlur={onSuggestionsClose}
            onChange={(event) => onTaskNameChange(event.target.value)}
            onFocus={onSuggestionsOpen}
            placeholder={t('tracker.taskPlaceholder')}
            type="text"
            value={taskName}
          />
          <AutocompleteDropdown
            isLoading={isLoadingSuggestions}
            isOpen={isSuggestionsOpen}
            onSelect={onSuggestionSelect}
            suggestions={suggestions}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700">
            {t('tracker.project')}
          </span>
          <select
            className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 shadow-sm outline-none transition focus:border-[rgb(var(--color-accent))] focus:ring-2 focus:ring-[rgb(var(--color-accent-soft))] disabled:cursor-not-allowed disabled:bg-zinc-100"
            disabled={isLoadingProjects || projects.length === 0}
            onChange={(event) => onProjectChange(event.target.value)}
            value={selectedProjectId}
          >
            {projects.length === 0 ? (
              <option value="">{t('tracker.noProjects')}</option>
            ) : null}
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[rgb(var(--color-accent))] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[rgb(var(--color-accent-hover))] disabled:cursor-not-allowed disabled:bg-zinc-400"
          disabled={!canStart}
          type="submit"
        >
          <LuPlay className="h-4 w-4" aria-hidden="true" />
          {isStarting ? t('tracker.starting') : t('tracker.start')}
        </button>
      </div>

      {projects.length === 0 && !isLoadingProjects ? (
        <p className="mt-4 text-sm text-zinc-600">
          {t('tracker.createProjectHint')}
        </p>
      ) : null}
    </form>
  );
}
