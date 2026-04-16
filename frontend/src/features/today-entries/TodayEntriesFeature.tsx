import { TodayEntriesGroupedSummary } from './components/TodayEntriesGroupedSummary';
import { TodayEntriesList } from './components/TodayEntriesList';
import { TodayEntriesMessage } from './components/TodayEntriesMessage';
import { useTodayEntries } from './useTodayEntries';

export function TodayEntriesFeature() {
  const todayEntries = useTodayEntries();

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">Today</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-normal text-zinc-950">
              Today entries
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
              Review today's tracked work, adjust details, and keep project
              totals current.
            </p>
          </div>

          <button
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950 disabled:cursor-not-allowed disabled:text-zinc-400"
            disabled={todayEntries.isLoading}
            onClick={todayEntries.loadTodayEntries}
            type="button"
          >
            Refresh
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
