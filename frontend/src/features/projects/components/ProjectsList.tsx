import { useTranslation } from 'react-i18next';
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
      <section className="rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-sm text-zinc-600">{t('projects.loading')}</p>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-zinc-300 bg-white p-6">
        <p className="text-sm font-semibold text-zinc-950">
          {t('projects.emptyTitle')}
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          {t('projects.emptyDescription')}
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <div className="grid gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-semibold uppercase text-zinc-500 md:grid-cols-[minmax(0,1fr)_260px_auto]">
        <span>{t('common.project')}</span>
        <span>{t('common.color')}</span>
        <span className="hidden md:block">{t('common.actions')}</span>
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
