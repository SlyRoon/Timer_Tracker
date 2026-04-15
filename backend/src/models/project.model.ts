import mongoose, { Schema, type HydratedDocument, type Model } from 'mongoose';
import type { ProjectFields } from '../shared/types/domain.types.js';

export type ProjectDocument = HydratedDocument<ProjectFields>;

const projectSchema = new Schema<ProjectFields>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ProjectModel =
  (mongoose.models.Project as Model<ProjectFields> | undefined) ??
  mongoose.model<ProjectFields>('Project', projectSchema);
