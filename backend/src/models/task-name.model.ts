import { Schema, model, models, type HydratedDocument, type Model } from 'mongoose';
import type { TaskNameFields } from '../shared/types/domain.types.js';

export type TaskNameDocument = HydratedDocument<TaskNameFields>;

const taskNameSchema = new Schema<TaskNameFields>(
  {
    value: {
      type: String,
      required: true,
      trim: true,
    },
    lastUsedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

taskNameSchema.index({ value: 1 });

export const TaskNameModel =
  (models.TaskName as Model<TaskNameFields> | undefined) ??
  model<TaskNameFields>('TaskName', taskNameSchema);
