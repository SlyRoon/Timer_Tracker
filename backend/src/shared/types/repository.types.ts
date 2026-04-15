import type { Types } from 'mongoose';
import type {
  ProjectFields,
  TaskNameFields,
  TimeEntryFields,
} from './domain.types.js';

export type EntityId = string | Types.ObjectId;

export type ProjectCreateInput = ProjectFields;
export type ProjectUpdateInput = Partial<ProjectFields>;

export type TaskNameCreateInput = Pick<TaskNameFields, 'value'> &
  Partial<Pick<TaskNameFields, 'lastUsedAt'>>;

export interface DateRange {
  from: Date;
  to: Date;
}

export type TimeEntryCreateInput = TimeEntryFields;
export type TimeEntryUpdateInput = Partial<TimeEntryFields>;
