import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    seriesName: { type: String, indexed: true },
    accessCount: { type: Number },
  },
  { timestamps: true }
);

const AccessMetric = mongoose.model('AccessMetric', schema);
export default AccessMetric;
