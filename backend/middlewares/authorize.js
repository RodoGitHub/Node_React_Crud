const authorize = (...rolesPermitidos) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole || !rolesPermitidos.includes(userRole)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
  };
};

module.exports = authorize;
