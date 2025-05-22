const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log("Token no enviado");
    return res.status(401).json({ message: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token válido:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token inválido o expirado:", err.message);
    res.status(403).json({message: 'Token inválido o expirado' });
  }
};

module.exports = auth;

