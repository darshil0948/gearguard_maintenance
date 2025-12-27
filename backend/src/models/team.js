import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  description: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Team", teamSchema);
