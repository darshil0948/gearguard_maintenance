import Equipment from "../models/equipment.js";
import Request from "../models/request.js";

export const createEquipment = async (req, res) => {
  try {
    const eq = await Equipment.create(req.body);
    res.status(201).json(eq);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getEquipments = async (req, res) => {
  const items = await Equipment.find().populate("maintenanceTeam");
  res.json(items);
};

export const getEquipmentById = async (req, res) => {
  const item = await Equipment.findById(req.params.id).populate("maintenanceTeam");
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
};

export const updateEquipment = async (req, res) => {
  try {
    const item = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteEquipment = async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getEquipmentRequests = async (req, res) => {
  const requests = await Request.find({ equipmentId: req.params.id }).populate("assignedTo");
  res.json(requests);
};
