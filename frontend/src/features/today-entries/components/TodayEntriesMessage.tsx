interface TodayEntriesMessageProps {
  error: string;
  isLoading: boolean;
  message: string;
}

export function TodayEntriesMessage({
  error,
  isLoading,
  message,
}: TodayEntriesMessageProps) {
  if (isLoading) {
    return (
      <div className="mt-5 rounded-lg border border-zinc-200 bg-neutral-50 px-4 py-3 text-sm text-zinc-600">
        Loading today entries...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (message) {
    return (
      <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        {message}
      </div>
    );
  }

  return null;
}
