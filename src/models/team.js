import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  matchesPlayed: { type: Number, default: 0 },
  matchesWon: { type: Number, default: 0 },
  matchesDrawn: { type: Number, default: 0 },
  matchesLost: { type: Number, default: 0 },
  goalsFor: { type: Number, default: 0 },
  goalsAgainst: { type: Number, default: 0 },
  goalDifference: { type: Number, default: function() { return this.goalsFor - this.goalsAgainst; } },
  points: { type: Number, default: function() { return (this.matchesWon * 3) + this.matchesDrawn; } }
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);