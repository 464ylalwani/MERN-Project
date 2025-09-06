// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refresh,
  logout,
  me,
} = require("../controllers/authController");
const { auth } = require("../middleware/auth");

// 🔓 Public
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/refresh", refresh);

// 🔐 Protected
router.post("/auth/logout", auth, logout);
router.get("/auth/me", auth, me);

module.exports = router;
