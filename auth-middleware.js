// Simple auth middleware for demo purposes
const authMiddleware = (req, res, next) => {
  return next();
};

export default authMiddleware;
