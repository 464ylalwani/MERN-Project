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

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (Admin/Instructor only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Product created
 */
router.post("/products", auth, allow("admin", "instructor"), createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/products", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Single product
 */
router.get("/products/:id", validateObjectId("id"), getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product (Admin/Instructor only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put(
  "/products/:id",
  auth,
  allow("admin", "instructor"),
  validateObjectId("id"),
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete(
  "/products/:id",
  auth,
  allow("admin"),
  validateObjectId("id"),
  deleteProduct
);

module.exports = router;
