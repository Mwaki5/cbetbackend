const express = require("express");
const router = express.Router();
const controller = require("../controllers/institutions");
const { uploadProfile } = require("../middleware/upload");
const validate = require("../middleware/validate");
const { createInstitution } = require("../validators/institutionSchemas");
const requireFileOrField = require("../middleware/requireFileOrField");

router.get("/", controller.list);
// router.post('/', validate(createInstitution), uploadProfile.single('logo'), requireFileOrField('logo'), controller.create);
router.get("/:id", controller.get);
router.put(
  "/:id",
  uploadProfile.single("logo"),
  validate(createInstitution),
  controller.update
);
router.delete("/:id", controller.remove);

module.exports = router;
