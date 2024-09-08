require('dotenv').config();
const express = require('express');

const authRoutes = require('./routes/authRoute');
const db = require('./db');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoute');
const cartRoutes = require('./routes/cartRoute');
const cors = require('cors');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_API_SECRET_KEY);

const app = express();

app.use(cors());

app.use(cors({
    origin: [process.env.VITE_REACT_APP_URI],
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

const calculateTotalOrderAmount = (items) => {
    return items[0].amount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateTotalOrderAmount(items),
        currency: "usd",
        description: "This is for GFG Stripe API Demo",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
