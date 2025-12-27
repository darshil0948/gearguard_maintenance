import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  name: String,
  type: String,
  purchaseDate: Date,
  usageMetric: Number
});

export default mongoose.model("Asset", assetSchema);
