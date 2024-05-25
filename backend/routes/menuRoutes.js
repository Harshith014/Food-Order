const express = require('express');
const router = express.Router();
const { allMenu, addMenu, updateMenu, deleteMenu } = require('../controllers/menuController');
const auth = require('../middleware/authMiddleware');
const path = require('path');
// Import Multer for handling file uploads
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/allMenu', allMenu);
router.post('/addMenu', auth, upload.single('image'), addMenu);
router.put('/updateMenu/:id', auth,upload.single('image'), updateMenu);
router.delete('/deleteMenu/:id',auth,  deleteMenu);

module.exports = router;
