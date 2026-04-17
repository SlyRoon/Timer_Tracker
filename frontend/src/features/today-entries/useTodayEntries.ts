import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  deleteTimeEntry,
  getProjects,
  getTodayEntries,
  getTodayEntryGroups,
  getTodayProjectTotals,
  updateEntryManualTime,
  updateEntryProject,
  updateEntryTaskName,
} from '../../api';
import type {
  Project,
  ProjectTotal,
  TimeEntry,
  TodayEntryGroup,
  UpdateEntryManualTimePayload,
} from '../../types';

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export function useTodayEntries(refreshSignal = 0) {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [groups, setGroups] = useState<TodayEntryGroup[]>([]);
  const [totals, setTotals] = useState<ProjectTotal[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [updatingEntryId, setUpdatingEntryId] = useState<string | null>(null);

  const projectById = useMemo(
    () => new Map(projects.map((project) => [project.id, project])),
    [projects],
  );

  const loadTodayEntries = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const [nextProjects, nextEntries, nextGroups, nextTotals] =
        await Promise.all([
          getProjects(),
          getTodayEntries(),
          getTodayEntryGroups(),
          getTodayProjectTotals(),
        ]);

      setProjects(nextProjects);
      setEntries(nextEntries);
      setGroups(nextGroups);
      setTotals(nextTotals);
    } catch (loadError) {
      setError(getErrorMessage(loadError, t('common.genericError')));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadTodayEntries();
  }, [loadTodayEntries, refreshSignal]);

  const runEntryUpdate = async (
    entryId: string,
    update: () => Promise<unknown>,
    nextMessage: string,
  ) => {
    setUpdatingEntryId(entryId);
    setError('');
    setMessage('');

    try {
      await update();
      await loadTodayEntries();
      setMessage(nextMessage);
    } catch (updateError) {
      setError(getErrorMessage(updateError, t('common.genericError')));
    } finally {
      setUpdatingEntryId(null);
    }
  };

  const saveTaskName = (entryId: string, taskName: string) =>
    runEntryUpdate(
      entryId,
      () => updateEntryTaskName(entryId, { taskName: taskName.trim() }),
      t('today.taskUpdated'),
    );

  const saveProject = (entryId: string, projectId: string) =>
    runEntryUpdate(
      entryId,
      () => updateEntryProject(entryId, { projectId }),
      t('today.projectUpdated'),
    );

  const saveManualTime = (
    entryId: string,
    payload: UpdateEntryManualTimePayload,
  ) =>
    runEntryUpdate(
      entryId,
      () => updateEntryManualTime(entryId, payload),
      t('today.timeSaved'),
    );

  const removeEntry = (entryId: string) =>
    runEntryUpdate(
      entryId,
      () => deleteTimeEntry(entryId),
      t('today.entryDeleted'),
    );

  return {
    entries,
    error,
    groups,
    isLoading,
    loadTodayEntries,
    message,
    projectById,
    projects,
    removeEntry,
    saveManualTime,
    saveProject,
    saveTaskName,
    totals,
    updatingEntryId,
  };
}
