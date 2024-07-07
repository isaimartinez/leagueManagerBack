import mongoose from "mongoose";
const { Schema } = mongoose;

const matchSchema = new Schema({
  local: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  visit: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  date: { type: Date, required: true },
  address: { type: String, required: true },
  visitGoals: { type: Number, default: 0 },
  localGoals: { type: Number, default: 0 },
  type: { type: String, enum: ['regular', 'eliminatoria'], required: true }
}, { timestamps: true });

export default mongoose.model('Match', matchSchema);