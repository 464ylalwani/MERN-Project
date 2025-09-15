const express = require("express");
const { auth, allow } = require("../middleware/auth");
const validateObjectId = require("../utils/validateObjectId");
const {
  getUsers,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/users", auth, allow("admin"), getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: User found
 */
router.get(
  "/users/:id",
  auth,
  allow("admin"),
  validateObjectId("id"),
  getUserById
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete(
  "/users/:id",
  auth,
  allow("admin"),
  validateObjectId("id"),
  deleteUser
);

module.exports = router;
