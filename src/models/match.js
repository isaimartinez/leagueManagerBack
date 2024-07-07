import mongoose from "mongoose";
const { Schema } = mongoose;

const goalSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
}, { _id: false });

const matchSchema = new Schema({
  local: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  visit: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  date: { type: Date, required: true },
  address: { type: String, required: true },
  league: { type: Schema.Types.ObjectId, ref: 'League', required: true },
  visitGoals: [goalSchema],
  localGoals: [goalSchema],
  type: { type: String, enum: ['regular', 'eliminatoria'], required: true }
}, { timestamps: true });

export default mongoose.model('Match', matchSchema);
