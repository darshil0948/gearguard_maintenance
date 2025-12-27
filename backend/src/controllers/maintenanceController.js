import Maintenance from "../models/Maintenance.js";

// Add Maintenance Record
export const addMaintenance = async (req, res) => {
  try {
    const record = await Maintenance.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Maintenance by Asset
export const getMaintenanceByAsset = async (req, res) => {
  const records = await Maintenance.find({
    assetId: req.params.assetId
  });
  res.json(records);
};
