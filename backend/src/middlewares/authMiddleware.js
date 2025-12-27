// Dummy middleware (for hackathon)
const authMiddleware = (req, res, next) => {
  // later you can verify JWT here
  next();
};

export default authMiddleware;
