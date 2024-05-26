const express = require('express');
const router = express.Router();
const { register, login, updateProfile, getProfile } = require('../controllers/authController');
const upload = require('../middleware/multerMiddleware')
const auth = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.put('/profile/:userId', auth, upload.single('avatar'), updateProfile);
router.get('/profile/:userId', auth, getProfile);

module.exports = router;
