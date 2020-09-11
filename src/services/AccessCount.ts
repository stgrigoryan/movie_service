import AccessMetric from '../models/AccessMetric';

export const setAccessMetrics = async (name: string) => {
  return await AccessMetric.findOneAndUpdate(
    { seriesName: name },
    { $inc: { accessCount: 1 } },
    { upsert: true }
  );
};

export const getAccessMetrics = async () => {
  return await AccessMetric.find({}, { __v: 0, _id: 0, createdAt: 0, updatedAt: 0 })
    .sort({ accessCount: -1 })
    .limit(5);
};
