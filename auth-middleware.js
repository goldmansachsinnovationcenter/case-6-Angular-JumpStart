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
    if (authHeader && authHeader === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbW8gVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o') {
      return next();
    }
    return next(); // For demo purposes, allow all API requests regardless of token
  }
  
  next();
};

export default authMiddleware;
