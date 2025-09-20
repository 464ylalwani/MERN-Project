const Product = require("../models/Product");
const QueryHelper = require("../utils/QueryHelper");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Create a product
// @route   POST /api/products
// @access  Admin / Instructor
exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({ ...req.body, user: req.user.id });
  // wrapping in object so test receives { product: {...} }
  res.status(201).json({ product });
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const features = new QueryHelper(Product.find(), req.query)
    .search(["name", "category"])
    .filter()
    .sort()
    .paginate();

  const products = await features.query.populate("user", "name email");
  res.status(200).json({ count: products.length, products });
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(200).json({ product });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Admin / Instructor
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(200).json({ product });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(200).json({ message: "Product deleted" });
});
