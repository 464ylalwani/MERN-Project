const express = require("express");
const { auth, allow } = require("../middleware/auth");
const validateObjectId = require("../utils/validateObjectId");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/products", auth, allow("admin", "instructor"), createProduct);
router.get("/products", getProducts);
router.get("/products/:id", validateObjectId("id"), getProductById);
router.put(
  "/products/:id",
  auth,
  allow("admin", "instructor"),
  validateObjectId("id"),
  updateProduct
);
router.delete(
  "/products/:id",
  auth,
  allow("admin"),
  validateObjectId("id"),
  deleteProduct
);

module.exports = router;
