module.exports = (err, req, res, next) => {
  // Mongoose duplicate key
  if (err.code === 11000) {
    return res
      .status(400)
      .json({ message: "Duplicate key", details: err.keyValue });
  }
  // Mongoose validation
  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: "Validation error", details });
  }
  // JWT errors (optional differentiation)
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Invalid/Expired token" });
  }

  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
};
