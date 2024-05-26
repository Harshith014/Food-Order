const express = require('express');
const router = express.Router();
const { allMenu, addMenu, updateMenu, deleteMenu } = require('../controllers/menuController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware')


router.get('/allMenu', allMenu);
router.post('/addMenu', auth, upload.single('image'), addMenu);
router.put('/updateMenu/:id', auth, upload.single('image'), updateMenu);
router.delete('/deleteMenu/:id', auth, deleteMenu);

module.exports = router;
