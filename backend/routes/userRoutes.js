const express = require("express");
const { auth, allow } = require("../middleware/auth");
const validateObjectId = require("../utils/validateObjectId");
const {
  getUsers,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/users", auth, allow("admin"), getUsers);
router.get(
  "/users/:id",
  auth,
  allow("admin"),
  validateObjectId("id"),
  getUserById
);
router.delete(
  "/users/:id",
  auth,
  allow("admin"),
  validateObjectId("id"),
  deleteUser
);

module.exports = router;
