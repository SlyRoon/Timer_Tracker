import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  exportReportCsv,
  getProjects,
  getReport,
} from '../../api';
import type { PeriodReport, Project, ReportPeriod } from '../../types';

function getTodayInputValue() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;

  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

function triggerCsvDownload(blob: Blob, fileName: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export function useReports() {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<ReportPeriod>('day');
  const [date, setDate] = useState(getTodayInputValue);
  const [report, setReport] = useState<PeriodReport | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const projectById = useMemo(
    () => new Map(projects.map((project) => [project.id, project])),
    [projects],
  );

  const entryCount = useMemo(
    () =>
      report?.groups.reduce(
        (total, group) => total + group.entries.length,
        0,
      ) ?? 0,
    [report],
  );

  const loadReport = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const [nextProjects, nextReport] = await Promise.all([
        getProjects(),
        getReport(period, date),
      ]);

      setProjects(nextProjects);
      setReport(nextReport);
    } catch (loadError) {
      setError(getErrorMessage(loadError, t('common.genericError')));
      setReport(null);
    } finally {
      setIsLoading(false);
    }
  }, [date, period, t]);

  useEffect(() => {
    loadReport();
  }, [loadReport]);

  const exportCsv = async () => {
    setIsExporting(true);
    setError('');
    setMessage('');

    try {
      const csv = await exportReportCsv(period, date);
      triggerCsvDownload(csv.blob, csv.fileName);
      setMessage(t('reports.csvStarted'));
    } catch {
      setError(t('reports.csvFailed'));
    } finally {
      setIsExporting(false);
    }
  };

  return {
    date,
    entryCount,
    error,
    exportCsv,
    isExporting,
    isLoading,
    loadReport,
    message,
    period,
    projectById,
    report,
    setDate,
    setPeriod,
  };
}
