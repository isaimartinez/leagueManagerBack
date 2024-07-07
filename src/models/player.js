import mongoose from "mongoose";
const { Schema } = mongoose;

const playerSchema = new Schema({
  name: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  goals: { type: Number, default: 0 },
  yellowCards: { type: Number, default: 0 },
  redCards: { type: Number, default: 0 },
  matchesPlayed: { type: Number, default: 0 },
  picture: { type: String }
}, { timestamps: true });

export default mongoose.model('Player', playerSchema);