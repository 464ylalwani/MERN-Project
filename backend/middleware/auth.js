const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET } = require("../config");

// Require logged-in user
exports.auth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing Bearer token" });

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Role-based guard
exports.allow =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" }); // 403 for RBAC block
    next();
  };
