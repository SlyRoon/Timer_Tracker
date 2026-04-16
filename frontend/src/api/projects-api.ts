import type { CreateProjectPayload, Project, UpdateProjectPayload } from '../types';
import { requestData } from './http-client';

interface ProjectResponse extends Omit<Project, 'id'> {
  _id?: string;
  id?: string;
}

const toProject = (project: ProjectResponse): Project => ({
  id: project.id ?? project._id ?? '',
  name: project.name,
  color: project.color,
  createdAt: project.createdAt,
  updatedAt: project.updatedAt,
});

export async function getProjects() {
  const projects = await requestData<ProjectResponse[]>('/projects');

  return projects.map(toProject);
}

export async function createProject(payload: CreateProjectPayload) {
  const project = await requestData<ProjectResponse>('/projects', {
    body: payload,
    method: 'POST',
  });

  return toProject(project);
}

export async function updateProject(
  projectId: string,
  payload: UpdateProjectPayload,
) {
  const project = await requestData<ProjectResponse>(
    `/projects/${encodeURIComponent(projectId)}`,
    {
      body: payload,
      method: 'PATCH',
    },
  );

  return toProject(project);
}
