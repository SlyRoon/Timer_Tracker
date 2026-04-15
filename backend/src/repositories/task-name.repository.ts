import { TaskNameModel } from '../models/task-name.model.js';
import type { TaskNameCreateInput } from '../shared/types/repository.types.js';

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

const normalizeLimit = (limit: number) => {
  const numericLimit = Number.isFinite(limit)
    ? Math.trunc(limit)
    : DEFAULT_LIMIT;

  return Math.max(1, Math.min(numericLimit, MAX_LIMIT));
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const TaskNameRepository = {
  findByValue(value: string) {
    return TaskNameModel.findOne({ value }).exec();
  },

  create(input: TaskNameCreateInput) {
    return TaskNameModel.create(input);
  },

  updateLastUsedAt(value: string, lastUsedAt = new Date()) {
    return TaskNameModel.findOneAndUpdate(
      { value },
      { lastUsedAt },
      {
        new: true,
        runValidators: true,
      },
    ).exec();
  },

  searchByValue(query: string, limit = DEFAULT_LIMIT) {
    return TaskNameModel.find({
      value: { $regex: escapeRegExp(query), $options: 'i' },
    })
      .sort({ lastUsedAt: -1, value: 1 })
      .limit(normalizeLimit(limit))
      .exec();
  },

  findRecent(limit = DEFAULT_LIMIT) {
    return TaskNameModel.find()
      .sort({ lastUsedAt: -1, value: 1 })
      .limit(normalizeLimit(limit))
      .exec();
  },
};
