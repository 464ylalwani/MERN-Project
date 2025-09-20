const User = require("../models/User");
const QueryHelper = require("../utils/QueryHelper");
const asyncHandler = require("../utils/asyncHandler");

exports.getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const features = new QueryHelper(User.find().select("-password"), req.query)
    .search(["name", "email"])
    .filter()
    .sort()
    .paginate();

  const users = await features.query;
  const count = await User.countDocuments(); // total users

  res.json({ count, users });
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
});
