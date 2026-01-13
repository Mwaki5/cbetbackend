const multer = require("multer");
const path = require("path");
const fs = require("fs");

module.exports = function upload(options = {}) {
  const {
    folder = "uploads",
    allowedMimes = [],
    maxSize = 10 * 1024 * 1024, // 10MB default
  } = options;

  const uploadDir = path.join("public", "uploads", folder);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, unique + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (allowedMimes.length && !allowedMimes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"), false);
    }
    cb(null, true);
  };

  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
  });
};
