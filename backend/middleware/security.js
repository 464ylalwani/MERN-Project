const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

module.exports = (app) => {
  // Security headers
  app.use(helmet());

  // CORS setup
  const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173", // vite dev server
  ];

  const corsOptions = {
    origin: function (origin, cb) {
      if (!origin) return cb(null, true); // Postman / curl ke liye
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("CORS blocked: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  };

  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions)); // same config used

  // Rate limiters
  app.use("/api/auth/login", rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));
  app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));
};
