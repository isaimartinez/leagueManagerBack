import mongoose from "mongoose";
const { Schema } = mongoose;

const groupSchema = new Schema({
  name: { type: String, required: true },
  league: { type: Schema.Types.ObjectId, ref: "League", required: true },
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }]
});

export default mongoose.model("Group", groupSchema);