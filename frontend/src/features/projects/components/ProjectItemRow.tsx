import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuFolderKanban, LuSave } from 'react-icons/lu';
import type { Project, UpdateProjectPayload } from '../../../types';
import { ProjectColorField } from './ProjectColorField';

const inputClass =
  'mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none transition focus:border-[rgb(var(--color-accent))] focus:ring-2 focus:ring-[rgb(var(--color-accent-soft))] disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500';

interface ProjectItemRowProps {
  isUpdating: boolean;
  onUpdateProject: (
    projectId: string,
    payload: UpdateProjectPayload,
  ) => Promise<void>;
  project: Project;
}

export function ProjectItemRow({
  isUpdating,
  onUpdateProject,
  project,
}: ProjectItemRowProps) {
  const { t } = useTranslation();
  const [name, setName] = useState(project.name);
  const [color, setColor] = useState(project.color);

  useEffect(() => {
    setName(project.name);
    setColor(project.color);
  }, [project]);

  const hasChanges =
    name.trim() !== project.name || color.toLowerCase() !== project.color.toLowerCase();

  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300 sm:p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className="mt-1 h-4 w-4 shrink-0 rounded-full border border-white shadow-sm"
            style={{ backgroundColor: color }}
          />
          <div className="min-w-0">
            <p className="break-words text-lg font-semibold text-zinc-950">
              {project.name}
            </p>
            <p className="mt-2 inline-flex items-center gap-2 rounded-md bg-zinc-100 px-2.5 py-1 text-sm text-zinc-600">
              <LuFolderKanban className="h-3.5 w-3.5" aria-hidden="true" />
              {color}
            </p>
          </div>
        </div>

        <div className="grid w-full gap-4 lg:max-w-3xl lg:grid-cols-[minmax(0,1fr)_260px_auto] lg:items-end">
          <label className="text-sm font-medium text-zinc-700">
            {t('projects.name')}
            <input
              className={inputClass}
              disabled={isUpdating}
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </label>

          <ProjectColorField
            color={color}
            disabled={isUpdating}
            id={`project-color-${project.id}`}
            label={t('common.color')}
            onColorChange={setColor}
          />

          <button
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[rgb(var(--color-accent))] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[rgb(var(--color-accent-hover))] disabled:cursor-not-allowed disabled:bg-zinc-400"
            disabled={
              isUpdating ||
              !hasChanges ||
              name.trim().length === 0 ||
              color.length === 0
            }
            onClick={() => onUpdateProject(project.id, { color, name })}
            type="button"
          >
            <LuSave className="h-4 w-4" aria-hidden="true" />
            {isUpdating ? t('common.saving') : t('common.save')}
          </button>
        </div>
      </div>
    </article>
  );
}
