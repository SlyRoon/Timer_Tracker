import { useState } from 'react';
import { TrackerFoundation } from '../features/tracker/TrackerFoundation';
import { TodayEntriesFeature } from '../features/today-entries/TodayEntriesFeature';

export function TrackerPage() {
  const [todayEntriesRefreshSignal, setTodayEntriesRefreshSignal] = useState(0);

  const refreshTodayEntries = () => {
    setTodayEntriesRefreshSignal((currentSignal) => currentSignal + 1);
  };

  return (
    <div className="space-y-8">
      <TrackerFoundation onTimerStopped={refreshTodayEntries} />
      <TodayEntriesFeature refreshSignal={todayEntriesRefreshSignal} />
    </div>
  );
}
