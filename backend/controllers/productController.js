const Product = require("../models/Product");
const QueryHelper = require("../utils/QueryHelper");
const asyncHandler = require("../utils/asyncHandler");

exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({ ...req.body, user: req.user.id });
  res.status(201).json(product);
});

exports.getProducts = asyncHandler(async (req, res) => {
  const features = new QueryHelper(Product.find(), req.query)
    .search(["name", "category"])
    .filter()
    .sort()
    .paginate();

  const products = await features.query.populate("user", "name email");
  res.json({ count: products.length, products });
});

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
});
