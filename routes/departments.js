const express = require("express");
const router = express.Router();
const controller = require("../controllers/departments");
const { departmentSchema } = require("../validators/departmentSchema");
const validate = require("../middleware/validate");

router.get("/", controller.list);
router.post("/", validate(departmentSchema), controller.create);
router.get("/:deptCode", controller.get);
router.put("/:deptCode", validate(departmentSchema), controller.update);
router.delete("/:deptCode", controller.remove);

module.exports = router;
