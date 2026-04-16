interface ReportMessageProps {
  error: string;
  isLoading: boolean;
  message: string;
}

export function ReportMessage({
  error,
  isLoading,
  message,
}: ReportMessageProps) {
  if (isLoading) {
    return (
      <p className="mt-5 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
        Loading report...
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </p>
    );
  }

  if (message) {
    return (
      <p className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
        {message}
      </p>
    );
  }

  return null;
}
