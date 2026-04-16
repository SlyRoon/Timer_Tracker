import { TrackerFoundation } from '../features/tracker/TrackerFoundation';
import { TodayEntriesFeature } from '../features/today-entries/TodayEntriesFeature';

export function TrackerPage() {
  return (
    <div className="space-y-8">
      <TrackerFoundation />
      <TodayEntriesFeature />
    </div>
  );
}
