import Request from "../models/request.js";
import Equipment from "../models/equipment.js";

export const createRequest = async (req, res) => {
  try {
    const r = await Request.create(req.body);
    res.status(201).json(r);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getRequests = async (req, res) => {
  const { equipmentId, teamId, status, date } = req.query;
  const q = {};
  if (equipmentId) q.equipmentId = equipmentId;
  if (status) q.status = status;
  if (date) {
    // return requests scheduled on a specific date
    const d = new Date(date);
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    q.scheduledDate = { $gte: d, $lt: next };
  }

  const list = await Request.find(q).populate("assignedTo").populate("equipmentId", "name");
  res.json(list);
};

export const getRequestById = async (req, res) => {
  const r = await Request.findById(req.params.id).populate("assignedTo").populate("equipmentId", "name");
  if (!r) return res.status(404).json({ error: "Not found" });
  res.json(r);
};

export const updateRequest = async (req, res) => {
  try {
    const r = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // If moved to SCRAP, mark equipment as scrapped
    if (r && r.status === "Scrap" && r.equipmentId) {
      await Equipment.findByIdAndUpdate(r.equipmentId, { isScrapped: true });
    }

    res.json(r);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
