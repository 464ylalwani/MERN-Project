// backend/app.js
const express = require("express");
const { MONGO_URI } = require("./config");
const security = require("./middleware/security");
const errorHandler = require("./middleware/error");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

// Security middlewares
security(app);

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);

// Error handler (keep last)
app.use(errorHandler);

module.exports = app;
