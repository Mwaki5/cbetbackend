const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const validate = require('../middleware/validate');
const { createUser, updateUser } = require('../validators/userSchemas');
const auth = require('../middleware/verifyJwt');
const { uploadProfile } = require('../middleware/upload');

router.get('/', controller.list);

router.post('/', uploadProfile.single('profilePic'), validate(createUser), controller.create);

router.get('/:id', controller.get);
router.put('/:id', auth, uploadProfile.single('profilePic'), validate(updateUser), controller.update);
router.delete('/:id', auth, controller.remove);

module.exports = router;
