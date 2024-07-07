import mongoose from "mongoose";
const { Schema } = mongoose;

const leagueStatsSchema = new Schema({
  leagueId: { type: Schema.Types.ObjectId, ref: 'League', required: true },
  matchesPlayed: { type: Number, default: 0 },
  matchesWon: { type: Number, default: 0 },
  matchesDrawn: { type: Number, default: 0 },
  matchesLost: { type: Number, default: 0 },
  goalsFor: { type: Number, default: 0 },
  goalsAgainst: { type: Number, default: 0 },
  goalDifference: { type: Number, default: function() { return this.goalsFor - this.goalsAgainst; } },
  points: { type: Number, default: function() { return (this.matchesWon * 3) + this.matchesDrawn; } }
}, { _id: false });

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  activeLeagueId: { type: Schema.Types.ObjectId, ref: 'League', required: true },
  leagueStats: [leagueStatsSchema]
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);