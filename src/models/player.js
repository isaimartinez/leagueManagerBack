import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  goals: { type: Number, default: 0 }
});

export default mongoose.model('Player', playerSchema);