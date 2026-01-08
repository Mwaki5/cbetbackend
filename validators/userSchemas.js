const Joi = require('joi');

const createUser = Joi.object({
  institutionId: Joi.string().uuid().optional(),
  firstname: Joi.string().min(1).max(255).required(),
  lastname: Joi.string().min(1).max(255).required(),
  email: Joi.string().email().required(),
  passwordHarsh: Joi.string().min(6).required(),
  role: Joi.string().optional(),
  status: Joi.boolean().optional(),
});

const updateUser = Joi.object({
  institutionId: Joi.string().uuid().optional(),
  firstname: Joi.string().min(1).max(255).optional(),
  lastname: Joi.string().min(1).max(255).optional(),
  email: Joi.string().email().optional(),
  passwordHarsh: Joi.string().min(6).optional(),
  role: Joi.string().optional(),
  status: Joi.boolean().optional(),
});

module.exports = { createUser, updateUser };
