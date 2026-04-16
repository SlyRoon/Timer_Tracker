import { useCallback, useEffect, useState } from 'react';
import {
  createProject as createProjectRequest,
  getProjects,
  updateProject as updateProjectRequest,
} from '../../api';
import type { CreateProjectPayload, Project, UpdateProjectPayload } from '../../types';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Try again.';
}

function normalizeProjectPayload(payload: CreateProjectPayload) {
  return {
    color: payload.color.trim(),
    name: payload.name.trim(),
  };
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [updatingProjectId, setUpdatingProjectId] = useState<string | null>(
    null,
  );
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const nextProjects = await getProjects();
      setProjects(nextProjects);
    } catch (loadError) {
      setError(getErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const createProject = async (payload: CreateProjectPayload) => {
    const normalizedPayload = normalizeProjectPayload(payload);

    if (!normalizedPayload.name || !normalizedPayload.color) {
      setError('Project name and color are required.');
      return false;
    }

    setIsCreating(true);
    setError('');
    setMessage('');

    try {
      await createProjectRequest(normalizedPayload);
      await loadProjects();
      setMessage('Project created.');
      return true;
    } catch (createError) {
      setError(getErrorMessage(createError));
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const updateProject = async (
    projectId: string,
    payload: UpdateProjectPayload,
  ) => {
    const normalizedPayload = normalizeProjectPayload({
      color: payload.color ?? '',
      name: payload.name ?? '',
    });

    if (!normalizedPayload.name || !normalizedPayload.color) {
      setError('Project name and color are required.');
      return;
    }

    setUpdatingProjectId(projectId);
    setError('');
    setMessage('');

    try {
      await updateProjectRequest(projectId, normalizedPayload);
      await loadProjects();
      setMessage('Project updated.');
    } catch (updateError) {
      setError(getErrorMessage(updateError));
    } finally {
      setUpdatingProjectId(null);
    }
  };

  return {
    createProject,
    error,
    isCreating,
    isLoading,
    loadProjects,
    message,
    projects,
    updateProject,
    updatingProjectId,
  };
}
