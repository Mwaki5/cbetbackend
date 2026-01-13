const express = require("express");
const router = express.Router();
const {
  login,
  refresh,
  logout,
  refreshAdmin,
  adminLogin,
  create,
} = require("../controllers/auth");
const controller = require("../controllers/institutions");
const validate = require("../middleware/validate");
const upload = require("../middleware/upload");
const { createUser } = require("../validators/userSchemas");
const { createInstitution } = require("../validators/institutionSchemas");
const Joi = require("joi");

const logoUpload = upload({
  folder: "institution-logos",
  allowedMimes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
  maxSize: 20 * 1024 * 1024,
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});
const refreshSchema = Joi.object({ refreshToken: Joi.string().required() });

router.post("/login", validate(loginSchema), login);
router.post("/login/admin", validate(loginSchema), adminLogin);
router.get("/refresh", refreshAdmin);
router.post("/register/user", validate(createUser), create);
router.post(
  "/institution/add",
  logoUpload.single("logo"), // ✅ FIRST
  validate(createInstitution), // ✅ SECOND
  controller.create
);

module.exports = router;
