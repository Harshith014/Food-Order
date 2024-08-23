require('dotenv').config();
const express = require('express');

const authRoutes = require('./routes/authRoute');
const db = require('./db');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoute');
const cartRoutes = require('./routes/cartRoute');
const cors = require('cors');
const path = require('path');
const stripe = require('stripe')(process.env.SERVER_KEY);

const app = express();

app.use(cors());

app.use(cors({
    origin: [process.env.URI],
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

app.post('/api/payment', async (req, res) => {
    const { amount, paymentMethodId, userId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            return_url: `${process.env.URI}/payment-success`, // Add this line
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'always'
            }
        });

        if (paymentIntent.status === 'requires_action') {
            // The payment requires additional action (e.g., 3D Secure)
            res.json({
                requires_action: true,
                payment_intent_client_secret: paymentIntent.client_secret
            });
        } else if (paymentIntent.status === 'succeeded') {
            // The payment was successful
            res.json({ success: true, paymentIntent: paymentIntent });
        } else {
            // The payment failed
            res.status(400).json({ error: 'Payment failed' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
