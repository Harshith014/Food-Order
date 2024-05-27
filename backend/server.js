require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoute');
const db = require('./db');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoute');
const cartRoutes = require('./routes/cartRoute');
const cors = require('cors');
const path = require('path');
const cloudinary = require('./middleware/cloudinary')

const app = express();

app.use(cors());

app.use(cors({
    origin: ["https://food-order-1-co45.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --------------------------deployment------------------------------

app.use(express.static(path.join(__dirname, "build")));
// --------------------------deployment------------------------------

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);

// Database Connection
db();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
