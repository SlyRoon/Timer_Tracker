interface TrackerMessageProps {
  error: string;
  isLoading: boolean;
  message: string;
}

export function TrackerMessage({
  error,
  isLoading,
  message,
}: TrackerMessageProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
        Loading tracker data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (message) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        {message}
      </div>
    );
  }

  return null;
}
