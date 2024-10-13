import mongoose from "mongoose";
const { Schema } = mongoose;

const goalSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
}, { _id: false });

const matchSchema = new Schema({
  local: { type: Schema.Types.ObjectId, ref: 'Team' },
  visit: { type: Schema.Types.ObjectId, ref: 'Team' },
  date: { type: Date, required: true },
  address: { type: String, required: true },
  league: { type: Schema.Types.ObjectId, ref: 'League', required: true },
  visitGoals: [goalSchema],
  localGoals: [goalSchema],
  type: { type: String, enum: ['regular', 'draft_semifinal', 'draft_final'], required: true },
  name: { type: String } // For draft matches
}, { timestamps: true });

export default mongoose.model('Match', matchSchema);
