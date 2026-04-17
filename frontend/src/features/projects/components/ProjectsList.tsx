import { useTranslation } from 'react-i18next';
import { LuFolderOpen } from 'react-icons/lu';
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
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-600">{t('projects.loading')}</p>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-zinc-300 bg-white p-6 text-center shadow-sm">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-zinc-100 text-zinc-600">
          <LuFolderOpen className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-4 text-sm font-semibold text-zinc-950">
          {t('projects.emptyTitle')}
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600">
          {t('projects.emptyDescription')}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-sm font-semibold text-zinc-950">
          {t('common.project')}
        </p>
        <p className="text-sm text-zinc-600">
          {projects.length} {t('common.entries').toLowerCase()}
        </p>
      </div>

      <div className="space-y-3">
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
