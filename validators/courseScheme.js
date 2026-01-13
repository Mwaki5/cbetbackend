const Joi = require("joi");

const courseSchema = Joi.object({
  courseCode: Joi.string().required(),
  courseName: Joi.string().required(),
  deptId: Joi.string().uuid().required(),
});

module.exports = { courseSchema };
