const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const env = require("./utils/env");
const { corsOption } = require("./middleware/cors");
const { credentials } = require("./middleware/credentials");
const verifyJwt = require("./middleware/verifyJwt");
const apiRoutes = require("./routes");
const { sequelize } = require("./models");
const multer = require("multer");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(credentials);
app.use(cors(corsOption));

// Serve uploaded files under /uploads
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// Serve the upload demo HTML at /upload-demo.html
app.get("/upload-demo.html", (req, res) =>
  res.sendFile(path.join(__dirname, "upload-demo.html"))
);
app.get("/upload-demo", (req, res) => res.redirect("/upload-demo.html"));

// Routes that start (public routes) above verify JWT middleware

app.use(cookieParser());
app.use("/auth", require("./routes/auth"));

// Verify JWT middleware
app.use(verifyJwt);

// The rest of the routes below

app.use("/api", apiRoutes);


const PORT = env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
});
