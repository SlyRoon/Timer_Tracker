import mongoose, { Schema, type HydratedDocument, type Model } from 'mongoose';
import type { TimeEntryFields } from '../shared/types/domain.types.js';

export type TimeEntryDocument = HydratedDocument<TimeEntryFields>;

const timeEntrySchema = new Schema<TimeEntryFields>(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      default: null,
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 0,
    },
    entryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const TimeEntryModel =
  (mongoose.models.TimeEntry as Model<TimeEntryFields> | undefined) ??
  mongoose.model<TimeEntryFields>('TimeEntry', timeEntrySchema);
