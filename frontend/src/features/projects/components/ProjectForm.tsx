import { useState } from 'react';
import type { FormEvent } from 'react';
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
        <p className="text-sm font-medium text-emerald-700">New project</p>
        <h3 className="mt-3 text-xl font-semibold tracking-normal text-zinc-950">
          Create a project
        </h3>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px_auto] lg:items-end">
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">
            Project name
          </span>
          <input
            className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            disabled={isCreating}
            onChange={(event) => setName(event.target.value)}
            placeholder="Client work, Internal, Learning"
            type="text"
            value={name}
          />
        </label>

        <ProjectColorField
          color={color}
          disabled={isCreating}
          id="new-project-color"
          label="Project color"
          onColorChange={setColor}
        />

        <button
          className="rounded-md bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
          disabled={isCreating || name.trim().length === 0 || color.length === 0}
          type="submit"
        >
          {isCreating ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  );
}
