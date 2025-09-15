const dotenv = require("dotenv");

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
  console.log("⚡ Loaded .env.test for testing");
} else {
  dotenv.config();
  console.log("⚡ Loaded .env");
}

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
};
