const Joi = require("joi");

const departmentSchema = Joi.object({
  deptCode: Joi.string().required(),
  deptName: Joi.string().required(),
});

module.exports = { departmentSchema };
