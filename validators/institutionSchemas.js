const Joi = require("joi");

const createInstitution = Joi.object({
  institutionName: Joi.string().min(1).max(255).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(1).max(255).required(),
  address: Joi.string().min(1).max(255).required(),
  password: Joi.string().min(1).max(255).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords do not match" }),
});

module.exports = { createInstitution };
