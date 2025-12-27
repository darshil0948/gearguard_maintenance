import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },
  type: { type: String, enum: ["Corrective", "Preventive"], default: "Corrective" },
  status: { type: String, enum: ["New", "In Progress", "Repaired", "Scrap"], default: "New" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  scheduledDate: Date,
  serviceDate: Date,
  durationHours: Number,
  cost: Number,
  notes: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

requestSchema.index({ scheduledDate: 1 });

export default mongoose.model("Request", requestSchema);
