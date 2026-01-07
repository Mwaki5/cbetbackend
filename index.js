const express = require("express");
const app = express();
const { User } = require("./models"); // Import models
const { sequelize } = require("./models");
const env = require("./config/env");
app.use(express.json());

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
});
