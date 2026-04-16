import type { FormEvent } from 'react';
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
  return (
    <form
      className="rounded-lg border border-zinc-200 bg-white p-6"
      onSubmit={onStart}
    >
      <div>
        <p className="text-sm font-medium text-emerald-700">Start tracking</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-normal text-zinc-950">
          Track a task
        </h2>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_260px_auto] lg:items-end">
        <label className="relative block">
          <span className="text-sm font-medium text-zinc-700">Task name</span>
          <input
            autoComplete="off"
            className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            onBlur={onSuggestionsClose}
            onChange={(event) => onTaskNameChange(event.target.value)}
            onFocus={onSuggestionsOpen}
            placeholder="Design review, development, planning"
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
          <span className="text-sm font-medium text-zinc-700">Project</span>
          <select
            className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-zinc-100"
            disabled={isLoadingProjects || projects.length === 0}
            onChange={(event) => onProjectChange(event.target.value)}
            value={selectedProjectId}
          >
            {projects.length === 0 ? (
              <option value="">No projects available</option>
            ) : null}
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>

        <button
          className="rounded-md bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
          disabled={!canStart}
          type="submit"
        >
          {isStarting ? 'Starting...' : 'Start'}
        </button>
      </div>

      {projects.length === 0 && !isLoadingProjects ? (
        <p className="mt-4 text-sm text-zinc-600">
          Create a project from the Projects page before starting a timer.
        </p>
      ) : null}
    </form>
  );
}
