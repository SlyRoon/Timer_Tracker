import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
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
      className="rounded-lg border border-zinc-200 bg-white p-6"
      onSubmit={submitProject}
    >
      <div>
        <p className="text-sm font-medium text-[rgb(var(--color-accent-text))]">
          {t('projects.newProject')}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-normal text-zinc-950">
          {t('projects.createTitle')}
        </h3>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(220px,320px)_auto] lg:items-end">
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">
            {t('projects.name')}
          </span>
          <input
            className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 outline-none transition focus:border-[rgb(var(--color-accent))] focus:ring-2 focus:ring-[rgb(var(--color-accent-soft))]"
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
          className="rounded-md bg-[rgb(var(--color-accent))] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[rgb(var(--color-accent-hover))] disabled:cursor-not-allowed disabled:bg-zinc-400"
          disabled={isCreating || name.trim().length === 0 || color.length === 0}
          type="submit"
        >
          {isCreating ? t('common.creating') : t('common.create')}
        </button>
      </div>
    </form>
  );
}
