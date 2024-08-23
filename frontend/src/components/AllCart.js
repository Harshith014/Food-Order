import { Add as AddIcon, Remove as RemoveIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CircularProgress, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/system';
import axios from 'axios';
import { motion } from 'framer-motion';
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Container = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
}));

const CustomCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

const CartTitle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

const CartIcon = styled(ShoppingCartIcon)(({ theme }) => ({
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
}));

const ItemCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#ffffff',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
}));

const ItemDetails = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));

const ItemName = styled(Grid)(({ theme }) => ({
    flex: 1,
}));

const ItemPrice = styled(Grid)(({ theme }) => ({
    fontWeight: 'bold',
}));

const PlaceOrderButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const OrderMessage = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.main,
}));

const TotalPriceContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(4),
}));

const NoCartsMessage = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(4),
    textAlign: 'center',
    fontStyle: 'italic',
    color: theme.palette.text.secondary,
}));

const AllCarts = () => {
    const navigate = useNavigate();
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderMessage, setOrderMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const token = localStorage.getItem('token');

    useEffect(() => {
        const checkLoginStatus = () => {
            if (token) {
                try {
                    jwtDecode(token);
                    setIsLoggedIn(true);
                } catch (error) {
                    console.error('Invalid token:', error);
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        };

        const fetchCarts = async () => {
            if (isLoggedIn) {
                try {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.userId;
                    const config = {
                        headers: {
                            'Authorization': token,
                        }
                    };
                    const response = await axios.get(`http://localhost:5000/api/cart/allCart/${userId}`, config);
                    setCarts(response.data || []);
                } catch (error) {
                    console.error('Error fetching carts:', error);
                    setCarts([]);
                }
            }
        };

        checkLoginStatus();
        if (isLoggedIn) {
            fetchCarts();
        }
    }, [isLoggedIn, token]);

    const updateCartItem = async (userId, menuItemId, action) => {
        try {
            if (!token) {
                console.error('Token not found');
                return;
            }

            await axios.post(`${process.env.REACT_APP_URI}/api/cart/updateCart`, {
                userId,
                menuItemId,
                action,
            }, {
                headers: {
                    'Authorization': token,
                }
            });

            const response = await axios.get(`${process.env.REACT_APP_URI}/api/cart/allCart/${userId}`, {
                headers: {
                    'Authorization': token,
                }
            });
            setCarts(response.data || []);
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const placeOrder = async (userId) => {
        setLoading(true);
        setOrderMessage('');
        setShowSuccessMessage(false); // Reset the success message visibility

        try {
            if (!token) {
                console.error('Token not found');
                return;
            }

            // Instead of immediately placing the order, redirect to the payment page
            navigate(`/payment?amount=${totalCartPrice.toFixed(2)}&userId=${userId}`);

        } catch (error) {
            console.error('Error placing order:', error);
            setOrderMessage(error.response?.data?.message || 'Internal server error');
        } finally {
            setLoading(false);
        }
    };

    const totalCartPrice = carts.reduce((total, cart) => total + cart.totalPrice, 0);

    return (
        <Container>
            {!isLoggedIn ? (
                <NoCartsMessage variant="subtitle2">Login to access all features</NoCartsMessage>
            ) : (
                carts.length === 0 ? (
                    <NoCartsMessage variant="subtitle2">{orderMessage || 'Oops! There are no carts available.'}</NoCartsMessage>
                ) : (
                    <>
                        <Grid container spacing={2}>
                            {carts.map((cart) => (
                                <Grid item xs={12} key={cart._id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <CustomCard variant="outlined">
                                            <CardContent>
                                                <CartTitle>
                                                    <CartIcon />
                                                    <Typography variant={isSmallScreen ? "subtitle2" : "h6"} gutterBottom>
                                                        Cart ID: {cart._id}
                                                    </Typography>
                                                </CartTitle>
                                                <Typography variant={isSmallScreen ? "subtitle2" : "subtitle1"} gutterBottom>
                                                    User ID: {cart.userId}
                                                </Typography>
                                                <Typography variant={isSmallScreen ? "subtitle2" : "subtitle1"} gutterBottom>
                                                    Total Price: ${cart.totalPrice.toFixed(2)}
                                                </Typography>
                                                <Typography variant={isSmallScreen ? "subtitle2" : "subtitle1"} gutterBottom>
                                                    Items:
                                                </Typography>
                                                <Grid container spacing={2}>
                                                    {cart.items.map((item) => (
                                                        <Grid item xs={12} key={item._id}>
                                                            <ItemCard variant="outlined">
                                                                <CardContent>
                                                                    <ItemDetails container alignItems="center" spacing={2}>
                                                                        <ItemName item>
                                                                            <Typography variant={isSmallScreen ? "subtitle2" : "subtitle1"} gutterBottom>
                                                                                {item.name}
                                                                            </Typography>
                                                                        </ItemName>
                                                                        <Grid item>
                                                                            <IconButton
                                                                                size="small"
                                                                                onClick={() => updateCartItem(cart.userId, item.menuItemId, 'decrement')}
                                                                            >
                                                                                <RemoveIcon />
                                                                            </IconButton>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Typography variant={isSmallScreen ? "subtitle2" : "subtitle1"} gutterBottom>
                                                                                {item.quantity}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <IconButton
                                                                                size="small"
                                                                                onClick={() => updateCartItem(cart.userId, item.menuItemId, 'increment')}
                                                                            >
                                                                                <AddIcon />
                                                                            </IconButton>
                                                                        </Grid>
                                                                        <ItemPrice item>
                                                                            <Typography variant={isSmallScreen ? "subtitle2" : "subtitle1"} gutterBottom>
                                                                                ${item.price.toFixed(2)}
                                                                            </Typography>
                                                                        </ItemPrice>
                                                                    </ItemDetails>
                                                                </CardContent>
                                                            </ItemCard>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </CardContent>
                                        </CustomCard>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                        <TotalPriceContainer>
                            <Typography variant={isSmallScreen ? "subtitle1" : "h6"}>Total Price: ${totalCartPrice.toFixed(2)}</Typography>
                            <PlaceOrderButton
                                variant="contained"
                                onClick={() => placeOrder(carts[0]?.userId)} // Assuming all carts belong to the same user
                                disabled={loading}
                                startIcon={loading && <CircularProgress size={20} />}
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </PlaceOrderButton>
                        </TotalPriceContainer>
                        {showSuccessMessage && <OrderMessage variant={isSmallScreen ? "subtitle2" : "subtitle1"}>Order has been placed successfully.</OrderMessage>}
                        {!showSuccessMessage && orderMessage && <OrderMessage variant={isSmallScreen ? "subtitle2" : "subtitle1"}>{orderMessage}</OrderMessage>}
                    </>
                )
            )}
            <Snackbar
                open={!!orderMessage}
                autoHideDuration={3000}
                onClose={() => setOrderMessage('')}
                message={orderMessage}
            />
        </Container>
    );
};

export default AllCarts;
