import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema({
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Asset"
  },
  serviceType: String,
  serviceDate: Date,
  cost: Number,
  nextDueDate: Date,
  notes: String
});

export default mongoose.model("Maintenance", maintenanceSchema);
