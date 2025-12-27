import Asset from "../models/aset.js";

// Create Asset
export const createAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Assets
export const getAssets = async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
};
