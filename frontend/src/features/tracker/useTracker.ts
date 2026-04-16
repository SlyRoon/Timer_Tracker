import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import {
  getActiveTimer,
  getProjects,
  getTaskSuggestions,
  startTimer,
  stopTimer,
} from '../../api';
import type { Project, TaskName, TimeEntry } from '../../types';

const SUGGESTIONS_LIMIT = 8;
const TICK_INTERVAL_MS = 1000;

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Try again.';
}

function getElapsedSeconds(activeTimer: TimeEntry | null, now: number) {
  if (!activeTimer) {
    return 0;
  }

  return Math.max(
    0,
    Math.floor((now - new Date(activeTimer.startTime).getTime()) / 1000),
  );
}

export function useTracker() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTimer, setActiveTimer] = useState<TimeEntry | null>(null);
  const [taskName, setTaskName] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [suggestions, setSuggestions] = useState<TaskName[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');
  const [now, setNow] = useState(Date.now());

  const activeProject = useMemo(
    () =>
      activeTimer
        ? projects.find((project) => project.id === activeTimer.projectId) ??
          null
        : null,
    [activeTimer, projects],
  );

  const canStart =
    taskName.trim().length > 0 &&
    selectedProjectId.length > 0 &&
    !activeTimer &&
    !isStarting &&
    !isLoadingInitialData;

  const elapsedSeconds = getElapsedSeconds(activeTimer, now);

  const refreshSuggestions = useCallback(async (query: string) => {
    setIsLoadingSuggestions(true);

    try {
      const nextSuggestions = await getTaskSuggestions(
        query,
        SUGGESTIONS_LIMIT,
      );
      setSuggestions(nextSuggestions);
    } catch {
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      setIsLoadingInitialData(true);
      setError('');

      try {
        const [nextProjects, nextActiveTimer] = await Promise.all([
          getProjects(),
          getActiveTimer(),
        ]);

        if (!isMounted) {
          return;
        }

        setProjects(nextProjects);
        setActiveTimer(nextActiveTimer);
        setSelectedProjectId((currentProjectId) =>
          currentProjectId || nextProjects[0]?.id || '',
        );
      } catch (loadError) {
        if (isMounted) {
          setError(getErrorMessage(loadError));
        }
      } finally {
        if (isMounted) {
          setIsLoadingInitialData(false);
        }
      }
    }

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeTimer) {
      return;
    }

    const timerId = window.setInterval(() => {
      setNow(Date.now());
    }, TICK_INTERVAL_MS);

    return () => window.clearInterval(timerId);
  }, [activeTimer]);

  useEffect(() => {
    if (!isSuggestionsOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      refreshSuggestions(taskName);
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [isSuggestionsOpen, refreshSuggestions, taskName]);

  const openSuggestions = () => {
    setIsSuggestionsOpen(true);
  };

  const closeSuggestions = () => {
    window.setTimeout(() => setIsSuggestionsOpen(false), 120);
  };

  const selectSuggestion = (value: string) => {
    setTaskName(value);
    setIsSuggestionsOpen(false);
  };

  const start = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTaskName = taskName.trim();

    if (!normalizedTaskName) {
      setError('Task name is required.');
      return;
    }

    if (!selectedProjectId) {
      setError('Select a project before starting the timer.');
      return;
    }

    setIsStarting(true);
    setError('');
    setStatusMessage('');

    try {
      const nextActiveTimer = await startTimer({
        projectId: selectedProjectId,
        taskName: normalizedTaskName,
      });

      setActiveTimer(nextActiveTimer);
      setTaskName(normalizedTaskName);
      setStatusMessage('Timer started.');
      setIsSuggestionsOpen(false);
      setNow(Date.now());
      await refreshSuggestions(normalizedTaskName);
    } catch (startError) {
      setError(getErrorMessage(startError));
    } finally {
      setIsStarting(false);
    }
  };

  const stop = async () => {
    setIsStopping(true);
    setError('');
    setStatusMessage('');

    try {
      const stoppedEntry = await stopTimer();

      setActiveTimer(null);
      setStatusMessage(`Timer stopped for "${stoppedEntry.taskName}".`);
      await refreshSuggestions(stoppedEntry.taskName);
    } catch (stopError) {
      setError(getErrorMessage(stopError));
    } finally {
      setIsStopping(false);
    }
  };

  return {
    activeProject,
    activeTimer,
    canStart,
    closeSuggestions,
    elapsedSeconds,
    error,
    isLoadingInitialData,
    isLoadingSuggestions,
    isStarting,
    isStopping,
    isSuggestionsOpen,
    openSuggestions,
    projects,
    selectedProjectId,
    selectSuggestion,
    setSelectedProjectId,
    setTaskName,
    start,
    statusMessage,
    stop,
    suggestions,
    taskName,
  };
}
