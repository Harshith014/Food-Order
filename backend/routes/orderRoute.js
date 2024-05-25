const express = require('express');
const router = express.Router();
const { allOrder, addOrder, getOrder } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

router.get('/allOrder/:userId', auth, allOrder);
router.post('/addOrder', auth, addOrder);
router.get('/getOrder/:id', auth, getOrder);

module.exports = router;
