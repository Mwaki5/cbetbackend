const express = require('express');
const router = express.Router();
const controller = require('../controllers/evidences');
const { uploadEvidence } = require('../middleware/upload');

router.get('/', controller.list);
router.post('/', uploadEvidence.single('file'), controller.create);
router.get('/:id', controller.get);
router.put('/:id', uploadEvidence.single('file'), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
