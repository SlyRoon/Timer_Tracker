import { useEffect, useState } from 'react';
import type { Project, UpdateProjectPayload } from '../../../types';
import { ProjectColorField } from './ProjectColorField';

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
  const [name, setName] = useState(project.name);
  const [color, setColor] = useState(project.color);

  useEffect(() => {
    setName(project.name);
    setColor(project.color);
  }, [project]);

  const hasChanges =
    name.trim() !== project.name || color.toLowerCase() !== project.color.toLowerCase();

  return (
    <div className="grid gap-4 px-4 py-4 md:grid-cols-[1fr_260px_auto] md:items-end">
      <div>
        <label className="text-sm font-medium text-zinc-700">
          Project name
          <input
            className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            disabled={isUpdating}
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </label>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2 text-sm text-zinc-600">
          <span
            className="h-4 w-4 rounded border border-zinc-200"
            style={{ backgroundColor: color }}
          />
          <span>{color}</span>
        </div>
        <ProjectColorField
          color={color}
          disabled={isUpdating}
          id={`project-color-${project.id}`}
          label="Color"
          onColorChange={setColor}
        />
      </div>

      <button
        className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
        disabled={isUpdating || !hasChanges || name.trim().length === 0 || color.length === 0}
        onClick={() => onUpdateProject(project.id, { color, name })}
        type="button"
      >
        {isUpdating ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}
