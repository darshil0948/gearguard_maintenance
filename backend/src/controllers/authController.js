import User from "../models/user.js";

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const user = await User.create({ name, email, password });
  res.status(201).json(user);
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Account not exist" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  res.json(user);
};
