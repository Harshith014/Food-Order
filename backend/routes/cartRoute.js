const express = require('express');
const router = express.Router();
const { addCart, allCarts, updateCartItem, deleteCartItem } = require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');

router.get('/allCart/:userId', auth, allCarts);
router.post('/addCart', auth, addCart);
router.post('/updateCart', auth, updateCartItem);
router.delete('/deleteCart', auth, deleteCartItem);

module.exports = router;




