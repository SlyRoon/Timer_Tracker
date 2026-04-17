import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { LuPalette, LuPlus } from 'react-icons/lu';
import type { CreateProjectPayload } from '../../../types';
import { ProjectColorField } from './ProjectColorField';

const DEFAULT_PROJECT_COLOR = '#047857';

interface ProjectFormProps {
  isCreating: boolean;
  onCreateProject: (payload: CreateProjectPayload) => Promise<boolean>;
}

export function ProjectForm({
  isCreating,
  onCreateProject,
}: ProjectFormProps) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [color, setColor] = useState(DEFAULT_PROJECT_COLOR);

  const submitProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const wasCreated = await onCreateProject({ color, name });

    if (wasCreated) {
      setName('');
      setColor(DEFAULT_PROJECT_COLOR);
    }
  };

  return (
    <form
      className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"
      onSubmit={submitProject}
    >
      <div className="flex items-start gap-3">
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-700">
          <LuPalette className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-[rgb(var(--color-accent-text))]">
            {t('projects.newProject')}
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-normal text-zinc-950">
            {t('projects.createTitle')}
          </h3>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(220px,320px)_auto] lg:items-end">
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">
            {t('projects.name')}
          </span>
          <input
            className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 shadow-sm outline-none transition focus:border-[rgb(var(--color-accent))] focus:ring-2 focus:ring-[rgb(var(--color-accent-soft))]"
            disabled={isCreating}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('projects.namePlaceholder')}
            type="text"
            value={name}
          />
        </label>

        <ProjectColorField
          color={color}
          disabled={isCreating}
          id="new-project-color"
          label={t('projects.projectColor')}
          onColorChange={setColor}
        />

        <button
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[rgb(var(--color-accent))] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[rgb(var(--color-accent-hover))] disabled:cursor-not-allowed disabled:bg-zinc-400"
          disabled={isCreating || name.trim().length === 0 || color.length === 0}
          type="submit"
        >
          <LuPlus className="h-4 w-4" aria-hidden="true" />
          {isCreating ? t('common.creating') : t('common.create')}
        </button>
      </div>
    </form>
  );
}
