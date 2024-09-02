import mongoose from 'mongoose';

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
}, { timestamps: true });

export default mongoose.model('League', leagueSchema);
