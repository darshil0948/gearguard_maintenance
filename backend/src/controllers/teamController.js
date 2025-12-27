import Team from "../models/team.js";

export const createTeam = async (req, res) => {
  try {
    const t = await Team.create(req.body);
    res.status(201).json(t);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTeams = async (req, res) => {
  const list = await Team.find().populate("members");
  res.json(list);
};

export const updateTeam = async (req, res) => {
  try {
    const t = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(t);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
