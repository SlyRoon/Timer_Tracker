import { useTranslation } from 'react-i18next';
import { LuFolderKanban, LuRefreshCw } from 'react-icons/lu';
import { ProjectForm } from './components/ProjectForm';
import { ProjectsList } from './components/ProjectsList';
import { ProjectsMessage } from './components/ProjectsMessage';
import { useProjects } from './useProjects';

export function ProjectsFoundation() {
  const { t } = useTranslation();
  const projects = useProjects();

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[rgb(var(--color-accent-soft))] text-[rgb(var(--color-accent-text))]">
              <LuFolderKanban className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[rgb(var(--color-accent-text))]">
                {t('projects.eyebrow')}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
                {t('projects.title')}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                {t('projects.description')}
              </p>
            </div>
          </div>

          <button
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-400 hover:text-zinc-950 disabled:cursor-not-allowed disabled:text-zinc-400"
            disabled={projects.isLoading}
            onClick={projects.loadProjects}
            type="button"
          >
            <LuRefreshCw className="h-4 w-4" aria-hidden="true" />
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
