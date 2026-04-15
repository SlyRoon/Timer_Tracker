import { ProjectRepository } from '../repositories/project.repository.js';
import { ServiceError } from '../shared/errors/service-error.js';
import type { EntityId } from '../shared/types/repository.types.js';
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from '../shared/types/service.types.js';
import { normalizeRequiredText } from './service.helpers.js';

export const ProjectService = {
  createProject(input: CreateProjectInput) {
    return ProjectRepository.create({
      name: normalizeRequiredText(input.name, 'Project name'),
      color: normalizeRequiredText(input.color, 'Project color'),
    });
  },

  getAllProjects() {
    return ProjectRepository.findAll();
  },

  async getProjectById(id: EntityId) {
    const project = await ProjectRepository.findById(id);

    if (!project) {
      throw new ServiceError('NOT_FOUND', 'Project not found');
    }

    return project;
  },

  async updateProject(id: EntityId, input: UpdateProjectInput) {
    const update: UpdateProjectInput = {};

    if (input.name !== undefined) {
      update.name = normalizeRequiredText(input.name, 'Project name');
    }

    if (input.color !== undefined) {
      update.color = normalizeRequiredText(input.color, 'Project color');
    }

    if (Object.keys(update).length === 0) {
      throw new ServiceError('VALIDATION_ERROR', 'No project fields to update');
    }

    const project = await ProjectRepository.updateById(id, update);

    if (!project) {
      throw new ServiceError('NOT_FOUND', 'Project not found');
    }

    return project;
  },
};
