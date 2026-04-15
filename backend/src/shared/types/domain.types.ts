import type { Types } from 'mongoose';

export interface ProjectFields {
  name: string;
  color: string;
}

export interface TaskNameFields {
  value: string;
  lastUsedAt: Date;
}

export interface TimeEntryFields {
  taskName: string;
  projectId: Types.ObjectId;
  startTime: Date;
  endTime: Date | null;
  durationMinutes: number;
  entryDate: Date;
}
