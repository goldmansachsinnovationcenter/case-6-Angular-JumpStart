// Simple auth middleware for demo purposes
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Allow login/logout endpoints without auth
  if (req.path === '/api/auth/login' || req.path === '/api/auth/logout') {
    return next();
  }
  
  if (req.path.endsWith('.ico') || req.path.endsWith('.js') || req.path.endsWith('.css') || req.path.endsWith('.png') || req.path.endsWith('.jpg') || req.path.endsWith('.svg') || req.path.endsWith('.woff') || req.path.endsWith('.woff2') || req.path.endsWith('.ttf')) {
    return next();
  }
  
  if (req.path.startsWith('/api/')) {
    return next();
  }
  
  next();
};

export default authMiddleware;
