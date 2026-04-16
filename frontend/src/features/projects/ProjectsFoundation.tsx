import { useTranslation } from 'react-i18next';
import { ProjectForm } from './components/ProjectForm';
import { ProjectsList } from './components/ProjectsList';
import { ProjectsMessage } from './components/ProjectsMessage';
import { useProjects } from './useProjects';

export function ProjectsFoundation() {
  const { t } = useTranslation();
  const projects = useProjects();

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[rgb(var(--color-accent-text))]">
              {t('projects.eyebrow')}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-normal text-zinc-950">
              {t('projects.title')}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
              {t('projects.description')}
            </p>
          </div>

          <button
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950 disabled:cursor-not-allowed disabled:text-zinc-400"
            disabled={projects.isLoading}
            onClick={projects.loadProjects}
            type="button"
          >
            {t('common.refresh')}
          </button>
        </div>

        <ProjectsMessage
          error={projects.error}
          isLoading={projects.isLoading}
          message={projects.message}
        />
      </div>

      <ProjectForm
        isCreating={projects.isCreating}
        onCreateProject={projects.createProject}
      />

      <ProjectsList
        isLoading={projects.isLoading}
        onUpdateProject={projects.updateProject}
        projects={projects.projects}
        updatingProjectId={projects.updatingProjectId}
      />
    </section>
  );
}
