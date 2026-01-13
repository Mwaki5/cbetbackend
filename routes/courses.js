const express = require("express");
const router = express.Router();
const controller = require("../controllers/courses");
const { courseSchema } = require("../validators/courseScheme");
const validate = require("../middleware/validate");

router.get("/", controller.list);
router.post("/", validate(courseSchema), controller.create);
router.get("/:courseCode", controller.get);
router.put("/:courseCode", validate(courseSchema), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
