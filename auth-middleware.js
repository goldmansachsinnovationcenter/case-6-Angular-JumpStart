// Simple auth middleware for demo purposes
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Allow login/logout endpoints without auth
  if (req.path === '/api/auth/login' || req.path === '/api/auth/logout') {
    return next();
  }
  
  if (req.path.endsWith('.ico') || req.path.endsWith('.js') || req.path.endsWith('.css') || req.path.endsWith('.png') || req.path.endsWith('.jpg')) {
    return next();
  }
  
  if (req.path.startsWith('/api/')) {
    return next();
  }
  
  next();
};

export default authMiddleware;
