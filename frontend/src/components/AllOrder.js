import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { motion } from 'framer-motion';
import { jwtDecode } from "jwt-decode";
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const AllOrder = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
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

        const fetchOrders = async () => {
            if (isLoggedIn) {
                try {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.userId;
                    const config = {
                        headers: {
                            'Authorization': token,
                        }
                    };
                    const response = await axios.get(`http://localhost:5000/api/order/allOrder/${userId}`, config);
                    setOrders(response.data.orders);
                } catch (error) {
                    console.error('Failed to fetch orders:', error);
                    setError('Failed to retrieve orders');
                }
            }
        };

        checkLoginStatus();
        fetchOrders();
    }, [isLoggedIn, token]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={isSmallScreen ? 2 : 4}>
            {error && <Typography color="error">{error}</Typography>}
            {!isLoggedIn ? (
                <Typography variant={isSmallScreen ? "h6" : "h5"} component="h1" fontWeight="bold" color="error">
                    Login to access all features
                </Typography>
            ) : (
                <>
                    <Typography variant={isSmallScreen ? "h6" : "h5"} component="h1" fontWeight="bold" mb={isSmallScreen ? 2 : 4}>
                        All Orders
                    </Typography>
                    <Box width="100%" maxWidth={isSmallScreen ? "320px" : "800px"}>
                        {orders.map(order => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{ marginBottom: isSmallScreen ? '1rem' : '2rem', borderRadius: '8px' }}
                            >
                                <Accordion component={Paper} elevation={3}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography variant="h6" component="div">
                                            Order ID: {order._id}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant={isSmallScreen ? "body2" : "body1"} gutterBottom>
                                            Status: {order.status}
                                        </Typography>
                                        <Typography variant={isSmallScreen ? "body2" : "body1"} color="text.secondary">
                                            Total Price: ${order.totalPrice.toFixed(2)}
                                        </Typography>
                                        <Typography variant={isSmallScreen ? "body2" : "body1"} color="text.secondary">
                                            Ordered At: {moment(order.orderDate).format('YYYY-MM-DD HH:mm:ss')}
                                        </Typography>
                                        {order.items.map(item => (
                                            <Box
                                                key={item._id}
                                                mt={isSmallScreen ? 1 : 2}
                                                p={isSmallScreen ? 1 : 2}
                                                bgcolor="#f9f9f9"
                                                borderRadius="8px"
                                            >
                                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                                    <Typography variant="subtitle1">
                                                        {item.name}
                                                    </Typography>
                                                    <Box display="flex" alignItems="center">
                                                        <Typography variant="body2" color="text.secondary" mr={2}>
                                                            Quantity: {item.quantity}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Price: ${item.price.toFixed(2)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            </motion.div>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default AllOrder;
