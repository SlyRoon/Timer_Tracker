import type { PeriodReport, ReportPeriod } from '../types';
import { getApiUrl, requestData } from './http-client';

interface ReportQuery {
  date: string;
  period: ReportPeriod;
}

function buildReportSearchParams({ date, period }: ReportQuery) {
  const params = new URLSearchParams({ period });

  if (date) {
    params.set('date', date);
  }

  return params;
}

function getCsvFileName(response: Response, period: ReportPeriod, date: string) {
  const disposition = response.headers.get('Content-Disposition') ?? '';
  const match = disposition.match(/filename="([^"]+)"/);

  return match?.[1] ?? `time-tracker-${period}-${date || 'report'}.csv`;
}

export function getReport(period: ReportPeriod, date: string) {
  const params = buildReportSearchParams({ date, period });

  return requestData<PeriodReport>(`/reports?${params.toString()}`);
}

export async function exportReportCsv(period: ReportPeriod, date: string) {
  const params = buildReportSearchParams({ date, period });
  params.set('format', 'csv');

  const response = await fetch(getApiUrl(`/reports/export?${params.toString()}`));

  if (!response.ok) {
    throw new Error('CSV export failed.');
  }

  return {
    blob: await response.blob(),
    fileName: getCsvFileName(response, period, date),
  };
}
