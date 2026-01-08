const Joi = require("joi");

const createInstitution = Joi.object({
  institutionName: Joi.string().min(1).max(255).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(1).max(255).required(),
  address: Joi.string().min(1).max(255).required(),
  password: Joi.string().min(1).max(255).required(),
  logo: Joi.string().uri().optional(),
  status: Joi.string()
    .valid("pending", "rejected", "approved")
    .required()
    .default("pending"),
});

module.exports = { createInstitution };
