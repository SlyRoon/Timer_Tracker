import { asyncHandler } from '../middlewares/async-handler.middleware.js';
import { ProjectService } from '../services/project.service.js';
import { sendSuccess } from '../shared/http/responses.js';
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from '../shared/types/service.types.js';

export const ProjectController = {
  createProject: asyncHandler(async (req, res) => {
    const project = await ProjectService.createProject(
      req.body as CreateProjectInput,
    );

    return sendSuccess(res, project, 201);
  }),

  getAllProjects: asyncHandler(async (_req, res) => {
    const projects = await ProjectService.getAllProjects();

    return sendSuccess(res, projects);
  }),

  getProjectById: asyncHandler(async (req, res) => {
    const project = await ProjectService.getProjectById(req.params.id);

    return sendSuccess(res, project);
  }),

  updateProject: asyncHandler(async (req, res) => {
    const project = await ProjectService.updateProject(
      req.params.id,
      req.body as UpdateProjectInput,
    );

    return sendSuccess(res, project);
  }),
};
