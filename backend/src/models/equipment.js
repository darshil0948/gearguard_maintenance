import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serialNumber: String,
  category: String,
  department: String,
  ownerName: String,
  purchaseDate: Date,
  warrantyInfo: String,
  location: String,
  maintenanceTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },
  isScrapped: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Equipment", equipmentSchema);
