const express = require("express");
const router = express.Router();
const {
  login,
  refresh,
  logout,
  adminLogin,
  create,
} = require("../controllers/auth");
const controller = require("../controllers/institutions");
const validate = require("../middleware/validate");
const { createUser } = require("../validators/userSchemas");
const { createInstitution } = require("../validators/institutionSchemas");
const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});
const refreshSchema = Joi.object({ refreshToken: Joi.string().required() });

router.post("/login", validate(loginSchema), login);
router.post("/login/admin", validate(loginSchema), adminLogin);
router.post("/refresh", validate(refreshSchema), refresh);
router.post("/register/user", validate(createUser), create);
router.post(
  "/institution/create",
  validate(createInstitution),
  controller.create
);

module.exports = router;
