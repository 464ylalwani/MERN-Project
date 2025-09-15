const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require("../config");

// ✅ Access token generate
const generateAccessToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

// ✅ Refresh token generate
const generateRefreshToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
