import type { ReportPeriod } from '../../../types';

const PERIODS: Array<{ label: string; value: ReportPeriod }> = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

interface ReportControlsProps {
  date: string;
  isExporting: boolean;
  isLoading: boolean;
  onDateChange: (date: string) => void;
  onExportCsv: () => void;
  onPeriodChange: (period: ReportPeriod) => void;
  onRefresh: () => void;
  period: ReportPeriod;
}

export function ReportControls({
  date,
  isExporting,
  isLoading,
  onDateChange,
  onExportCsv,
  onPeriodChange,
  onRefresh,
  period,
}: ReportControlsProps) {
  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_220px_auto_auto] lg:items-end">
      <div>
        <p className="text-sm font-medium text-zinc-700">Period</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PERIODS.map((item) => {
            const isSelected = item.value === period;

            return (
              <button
                className={[
                  'rounded-md border px-4 py-2 text-sm font-semibold transition',
                  isSelected
                    ? 'border-emerald-700 bg-emerald-700 text-white'
                    : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 hover:text-zinc-950',
                ].join(' ')}
                disabled={isLoading}
                key={item.value}
                onClick={() => onPeriodChange(item.value)}
                type="button"
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Date</span>
        <input
          className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          disabled={isLoading}
          onChange={(event) => onDateChange(event.target.value)}
          type="date"
          value={date}
        />
      </label>

      <button
        className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950 disabled:cursor-not-allowed disabled:text-zinc-400"
        disabled={isLoading}
        onClick={onRefresh}
        type="button"
      >
        Refresh
      </button>

      <button
        className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
        disabled={isLoading || isExporting}
        onClick={onExportCsv}
        type="button"
      >
        {isExporting ? 'Exporting...' : 'Export CSV'}
      </button>
    </div>
  );
}
