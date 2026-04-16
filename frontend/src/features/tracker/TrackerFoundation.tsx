import { ActiveTimerPanel } from './components/ActiveTimerPanel';
import { TrackerForm } from './components/TrackerForm';
import { TrackerMessage } from './components/TrackerMessage';
import { useTracker } from './useTracker';

export function TrackerFoundation() {
  const tracker = useTracker();

  return (
    <div className="space-y-5">
      <ActiveTimerPanel
        activeProject={tracker.activeProject}
        activeTimer={tracker.activeTimer}
        elapsedSeconds={tracker.elapsedSeconds}
        isStopping={tracker.isStopping}
        onStop={tracker.stop}
      />

      <TrackerMessage
        error={tracker.error}
        isLoading={tracker.isLoadingInitialData}
        message={tracker.statusMessage}
      />

      <TrackerForm
        canStart={tracker.canStart}
        isLoadingProjects={tracker.isLoadingInitialData}
        isLoadingSuggestions={tracker.isLoadingSuggestions}
        isStarting={tracker.isStarting}
        isSuggestionsOpen={tracker.isSuggestionsOpen}
        onProjectChange={tracker.setSelectedProjectId}
        onStart={tracker.start}
        onSuggestionSelect={tracker.selectSuggestion}
        onSuggestionsClose={tracker.closeSuggestions}
        onSuggestionsOpen={tracker.openSuggestions}
        onTaskNameChange={tracker.setTaskName}
        projects={tracker.projects}
        selectedProjectId={tracker.selectedProjectId}
        suggestions={tracker.suggestions}
        taskName={tracker.taskName}
      />
    </div>
  );
}
