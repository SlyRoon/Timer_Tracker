import { isValidObjectId } from 'mongoose';
import { ProjectModel } from '../models/project.model.js';
import type {
  EntityId,
  ProjectCreateInput,
  ProjectUpdateInput,
} from '../shared/types/repository.types.js';

export const ProjectRepository = {
  create(input: ProjectCreateInput) {
    return ProjectModel.create(input);
  },

  findAll() {
    return ProjectModel.find().sort({ name: 1 }).exec();
  },

  findById(id: EntityId) {
    if (!isValidObjectId(id)) {
      return Promise.resolve(null);
    }

    return ProjectModel.findById(id).exec();
  },

  updateById(id: EntityId, input: ProjectUpdateInput) {
    if (!isValidObjectId(id)) {
      return Promise.resolve(null);
    }

    return ProjectModel.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    }).exec();
  },
};
