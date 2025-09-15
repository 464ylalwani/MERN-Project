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

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     responses:
 *       201:
 *         description: User registered
 */
router.post("/auth/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     responses:
 *       200:
 *         description: User logged in
 */
router.post("/auth/login", login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     responses:
 *       200:
 *         description: New token generated
 */
router.post("/auth/refresh", refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out
 */
router.post("/auth/logout", auth, logout);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get logged-in user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
router.get("/auth/me", auth, me);

module.exports = router;
