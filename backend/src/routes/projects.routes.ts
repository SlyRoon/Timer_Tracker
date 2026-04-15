import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller.js';
import { validateRequest } from '../middlewares/validate-request.middleware.js';
import {
  createProjectSchema,
  getProjectByIdSchema,
  updateProjectSchema,
} from '../validators/project.validators.js';

export const projectsRouter = Router();

projectsRouter.post(
  '/',
  validateRequest(createProjectSchema),
  ProjectController.createProject,
);
projectsRouter.get('/', ProjectController.getAllProjects);
projectsRouter.get(
  '/:id',
  validateRequest(getProjectByIdSchema),
  ProjectController.getProjectById,
);
projectsRouter.patch(
  '/:id',
  validateRequest(updateProjectSchema),
  ProjectController.updateProject,
);
