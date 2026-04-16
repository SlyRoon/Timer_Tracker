import type { Project, UpdateProjectPayload } from '../../../types';
import { ProjectItemRow } from './ProjectItemRow';

interface ProjectsListProps {
  isLoading: boolean;
  onUpdateProject: (
    projectId: string,
    payload: UpdateProjectPayload,
  ) => Promise<void>;
  projects: Project[];
  updatingProjectId: string | null;
}

export function ProjectsList({
  isLoading,
  onUpdateProject,
  projects,
  updatingProjectId,
}: ProjectsListProps) {
  if (isLoading) {
    return (
      <section className="rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-sm text-zinc-600">Loading projects...</p>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-zinc-300 bg-white p-6">
        <p className="text-sm font-semibold text-zinc-950">No projects yet</p>
        <p className="mt-2 text-sm text-zinc-600">
          Create the first project to use it in tracker and today entries.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <div className="grid gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-semibold uppercase text-zinc-500 md:grid-cols-[1fr_260px_auto]">
        <span>Project</span>
        <span>Color</span>
        <span className="hidden md:block">Actions</span>
      </div>

      <div className="divide-y divide-zinc-100">
        {projects.map((project) => (
          <ProjectItemRow
            isUpdating={updatingProjectId === project.id}
            key={project.id}
            onUpdateProject={onUpdateProject}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
