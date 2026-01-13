const express = require("express");
const router = express.Router();

router.use("/institutions", require("./institutions"));
// router.use('/users', require('./users'));
router.use("/departments", require("./departments"));
router.use("/courses", require("./courses"));
// router.use('/units', require('./units'));
// router.use('/sessions', require('./sessions'));
// router.use('/enrollments', require('./enrollments'));
// router.use('/marks', require('./marks'));
// router.use('/evidences', require('./evidences'));
// router.use('/activity-logs', require('./activitylogs'));
// router.use('/subscriptions', require('./subscriptions'));
// router.use('/trainer-units', require('./trainer-units'));

module.exports = router;
