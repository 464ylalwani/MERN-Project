const mongoose = require("mongoose");
const app = require("./app");
const { swaggerDocs } = require("./config/swagger");
const { MONGO_URI } = require("./config");

const PORT = process.env.PORT || 5000;

// DB Connect + Server Start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB connected:", MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
      swaggerDocs(app, PORT);
    });
  })
  .catch((e) => console.error("DB connect error", e));
