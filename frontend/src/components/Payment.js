import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get('amount');
    const userId = queryParams.get('userId');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        setError(null);

        if (!stripe || !elements) {
            setError('Stripe has not loaded. Please try again.');
            setProcessing(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                throw new Error(error.message);
            }

            const { data } = await axios.post(`${process.env.REACT_APP_URI}/api/payment`, {
                amount: Math.round(parseFloat(amount) * 100), // Convert to cents
                paymentMethodId: paymentMethod.id,
                userId: userId
            });

            if (data.requires_action) {
                const { error, paymentIntent } = await stripe.handleCardAction(
                    data.payment_intent_client_secret
                );

                if (error) {
                    throw new Error('Payment failed');
                } else if (paymentIntent.status === 'succeeded') {
                    await placeOrder();
                    navigate('/payment-success');
                }
            } else if (data.success) {
                await placeOrder();
                navigate('/payment-success');
            } else {
                throw new Error('Payment failed');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setProcessing(false);
        }
    };

    const placeOrder = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_URI}/api/order/addOrder`,
                { userId },
                {
                    headers: { 'Authorization': localStorage.getItem('token') }
                }
            );
        } catch (error) {
            console.error('Error placing order:', error);
            throw new Error('Failed to place order');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Payment
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }} />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!stripe || processing}
                >
                    {processing ? <CircularProgress size={24} /> : `Pay $${amount}`}
                </Button>
            </form>
            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default Payment;