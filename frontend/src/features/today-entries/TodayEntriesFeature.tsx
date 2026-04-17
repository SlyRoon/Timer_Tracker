import { useTranslation } from 'react-i18next';
import { LuRefreshCw, LuRows3 } from 'react-icons/lu';
import { TodayEntriesGroupedSummary } from './components/TodayEntriesGroupedSummary';
import { TodayEntriesList } from './components/TodayEntriesList';
import { TodayEntriesMessage } from './components/TodayEntriesMessage';
import { useTodayEntries } from './useTodayEntries';

type TodayEntriesFeatureProps = {
  refreshSignal?: number;
};

export function TodayEntriesFeature({
  refreshSignal = 0,
}: TodayEntriesFeatureProps) {
  const { t } = useTranslation();
  const todayEntries = useTodayEntries(refreshSignal);

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[rgb(var(--color-accent-soft))] text-[rgb(var(--color-accent-text))]">
              <LuRows3 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[rgb(var(--color-accent-text))]">
                {t('today.eyebrow')}
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-normal text-zinc-950">
                {t('today.title')}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                {t('today.description')}
              </p>
            </div>
          </div>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-400 hover:text-zinc-950 disabled:cursor-not-allowed disabled:text-zinc-400"
            disabled={todayEntries.isLoading}
            onClick={todayEntries.loadTodayEntries}
            type="button"
          >
            <LuRefreshCw className="h-4 w-4" aria-hidden="true" />
            {t('common.refresh')}
          </button>
        </div>

        <TodayEntriesMessage
          error={todayEntries.error}
          isLoading={todayEntries.isLoading}
          message={todayEntries.message}
        />

        <TodayEntriesList
          entries={todayEntries.entries}
          isLoading={todayEntries.isLoading}
          onDeleteEntry={todayEntries.removeEntry}
          onSaveManualTime={todayEntries.saveManualTime}
          onSaveProject={todayEntries.saveProject}
          onSaveTaskName={todayEntries.saveTaskName}
          projectById={todayEntries.projectById}
          projects={todayEntries.projects}
          updatingEntryId={todayEntries.updatingEntryId}
        />
      </div>

      <TodayEntriesGroupedSummary
        groups={todayEntries.groups}
        isLoading={todayEntries.isLoading}
        projectById={todayEntries.projectById}
        totals={todayEntries.totals}
      />
    </section>
  );
}
