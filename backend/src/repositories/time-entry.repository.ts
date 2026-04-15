import { isValidObjectId } from 'mongoose';
import { TimeEntryModel } from '../models/time-entry.model.js';
import type {
  DateRange,
  EntityId,
  TimeEntryCreateInput,
  TimeEntryUpdateInput,
} from '../shared/types/repository.types.js';

const getDayBounds = (date: Date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start, end };
};

export const TimeEntryRepository = {
  create(input: TimeEntryCreateInput) {
    return TimeEntryModel.create(input);
  },

  findById(id: EntityId) {
    if (!isValidObjectId(id)) {
      return Promise.resolve(null);
    }

    return TimeEntryModel.findById(id).exec();
  },

  findActive() {
    return TimeEntryModel.findOne({ endTime: null })
      .sort({ startTime: -1 })
      .exec();
  },

  findActiveByProjectId(projectId: EntityId) {
    if (!isValidObjectId(projectId)) {
      return Promise.resolve(null);
    }

    return TimeEntryModel.findOne({ projectId, endTime: null })
      .sort({ startTime: -1 })
      .exec();
  },

  updateById(id: EntityId, input: TimeEntryUpdateInput) {
    if (!isValidObjectId(id)) {
      return Promise.resolve(null);
    }

    return TimeEntryModel.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    }).exec();
  },

  deleteById(id: EntityId) {
    if (!isValidObjectId(id)) {
      return Promise.resolve(null);
    }

    return TimeEntryModel.findByIdAndDelete(id).exec();
  },

  findTodayEntries(date = new Date()) {
    const { start, end } = getDayBounds(date);

    return TimeEntryModel.find({
      entryDate: {
        $gte: start,
        $lt: end,
      },
    })
      .sort({ startTime: 1 })
      .exec();
  },

  findByDateRange(range: DateRange) {
    return TimeEntryModel.find({
      entryDate: {
        $gte: range.from,
        $lte: range.to,
      },
    })
      .sort({ entryDate: 1, startTime: 1 })
      .exec();
  },

  findForReportsByDateRange(range: DateRange) {
    return TimeEntryModel.find({
      entryDate: {
        $gte: range.from,
        $lte: range.to,
      },
    })
      .sort({ projectId: 1, entryDate: 1, startTime: 1 })
      .exec();
  },
};
