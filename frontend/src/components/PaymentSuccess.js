// src/components/PaymentSuccess.js
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Payment Successful!
            </Typography>
            <Typography variant="body1" paragraph>
                Your order has been placed successfully.
            </Typography>
            <Button component={Link} to="/allorder" variant="contained" color="primary">
                View Orders
            </Button>
        </Box>
    );
};

export default PaymentSuccess;