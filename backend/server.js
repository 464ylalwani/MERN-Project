const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { MONGO_URI } = require("./config");
const security = require("./middleware/security");
const errorHandler = require("./middleware/error");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

// ✅ Security middlewares
security(app);

// ✅ Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);

// ✅ DB Connect + Server Start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB connected:", MONGO_URI);
    app.listen(5000, () => console.log("Server running on 5000"));
  })
  .catch((e) => console.error("DB connect error", e));

// ✅ Error handler (keep last)
app.use(errorHandler);
