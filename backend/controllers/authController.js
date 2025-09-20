const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require("../config");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

// sign helpers
const signAccess = (payload) =>
  jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "15m" });
const signRefresh = (payload) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });

// Register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

// Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const access = signAccess({ id: user._id, role: user.role });
  const refresh = signRefresh({
    id: user._id,
    tokenVersion: user.tokenVersion,
  });

  res.status(200).json({
    access,
    refresh,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// Refresh
exports.refresh = asyncHandler(async (req, res) => {
  // handle both body key & cookie
  const token =
    req.body.refresh || req.body.refreshToken || req.cookies?.refresh;
  if (!token) return res.status(400).json({ message: "Missing refresh token" });

  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id).select("role tokenVersion");
    if (!user) return res.status(401).json({ message: "Invalid refresh" });

    if (decoded.tokenVersion !== user.tokenVersion) {
      return res.status(401).json({ message: "Refresh token expired/rotated" });
    }

    const access = signAccess({ id: user._id, role: user.role });
    return res.json({ access });
  } catch (e) {
    return res.status(401).json({ message: "Invalid refresh" });
  }
});

// Logout
exports.logout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.tokenVersion += 1;
  await user.save();

  res.json({ message: "Logged out (refresh tokens invalidated)" });
});

// Me
exports.me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "-password -tokenVersion"
  );
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});
