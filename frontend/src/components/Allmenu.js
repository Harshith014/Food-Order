// src/components/Allmenu.js
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateMenu from './UpdateMenu';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState('');
    const [userId, setUserId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedMenuItemId, setSelectedMenuItemId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const itemsPerPage = 9;

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };

    const tokenUser = async () => {
        try {
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }

            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            if (!decodedToken || !decodedToken.userId) {
                console.error('Invalid token structure:', decodedToken);
                return;
            }

            const userId = decodedToken.userId;
            const userRole = decodedToken.role;
            setUserId(userId);
            setIsAdmin(userRole === 'admin');
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('https://food-order-ovjj.onrender.com/api/menu/allMenu');
                setMenuItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenuItems();
        tokenUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addCart = async (menuItem) => {
        try {
            if (!token) {
                navigate('/login');
                return;
            }

            const cartData = {
                userId: userId,
                menuItemId: menuItem._id
            };


            const { data } = await axios.post('https://food-order-ovjj.onrender.com/api/cart/addCart', cartData, config);

            setOrders([...orders, data.cart]);
            setSnackbarMessage('Item added to cart successfully!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Failed to add item to cart:', error);
            setError('Failed to add item to cart');
            setSnackbarMessage('Failed to add item to cart');
            setSnackbarOpen(true);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleMenuItemUpdate = (updatedMenuItem) => {
        setMenuItems(menuItems.map((item) => (item._id === updatedMenuItem._id ? updatedMenuItem : item)));
        setSelectedMenuItemId(null);
        setSnackbarMessage('Menu item updated successfully!');
        setSnackbarOpen(true);
    };

    const handleMenuItemDelete = async (menuItemId) => {
        try {
            await axios.delete(`https://food-order-ovjj.onrender.com/api/menu/deleteMenu/${menuItemId}`, config);
            setSnackbarMessage('Menu item deleted successfully!');
            setSnackbarOpen(true);
            // Refetch menu items from the backend
            const response = await axios.get('https://food-order-ovjj.onrender.com/api/menu/allMenu');
            setMenuItems(response.data);
        } catch (error) {
            console.error('Failed to delete menu item:', error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMenuItems = menuItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(menuItems.length / itemsPerPage);

    return (
        <Box sx={{ padding: { xs: '1rem', md: '2rem' } }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
                Menu
            </Typography>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ paddingBottom: '100px' }}>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '16px',
                            overflow: 'hidden'
                        }}
                    >
                        {currentMenuItems.map((menuItem) => (
                            <motion.div
                                key={menuItem._id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '100%' }}> {/* Add height property */}
                                    <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                                        <CardMedia
                                            component="img"
                                            image={menuItem.image}
                                            alt={menuItem.name}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </Box>
                                    <CardContent sx={{ backgroundColor: 'darkgrey', height: '100%' }}> {/* Add height property */}
                                        <Box
                                            sx={{
                                                backgroundColor: '#f5f5f5',
                                                padding: '1rem',
                                                borderRadius: '8px',
                                                marginBottom: '1rem',
                                                color: '#333',
                                                maxWidth: '100%', // Set maximum width to prevent overflow
                                                height: '100%' // Ensure content fills the entire height
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                gutterBottom
                                                sx={{
                                                    fontWeight: 'bold',
                                                    borderBottom: '1px solid #ddd',
                                                    paddingBottom: '0.5rem',
                                                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                                                    wordWrap: 'break-word', // Allow long words to break and wrap
                                                }}
                                            >
                                                {menuItem.name}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                gutterBottom
                                                sx={{
                                                    borderLeft: '4px solid #ccc',
                                                    paddingLeft: '0.5rem',
                                                    marginBottom: '0.5rem',
                                                    fontSize: { xs: '1rem', md: '1.2rem' },
                                                    wordWrap: 'break-word', // Allow long words to break and wrap
                                                }}
                                            >
                                                {menuItem.description}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    borderBottom: '1px solid #ddd',
                                                    paddingBottom: '0.5rem',
                                                    fontSize: { xs: '1rem', md: '1.2rem' },
                                                }}
                                            >
                                                Price: ${menuItem.price}
                                            </Typography>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                {!isAdmin && (
                                                    <Button variant="contained" color="primary" onClick={() => addCart(menuItem)}>
                                                        Add to Cart
                                                    </Button>
                                                )}
                                                {isAdmin && (
                                                    <Box>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => setSelectedMenuItemId(menuItem._id)}
                                                            startIcon={<EditIcon />}
                                                            sx={{ marginRight: '0.5rem' }}
                                                        >
                                                            Update
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={() => handleMenuItemDelete(menuItem._id)}
                                                            startIcon={<DeleteIcon />}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>

                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </Box>
                    {selectedMenuItemId && (
                        <UpdateMenu
                            menuItem={menuItems.find((item) => item._id === selectedMenuItemId)}
                            onUpdate={handleMenuItemUpdate}
                        />
                    )}
                    <Box display="flex" justifyContent="center" marginTop="1rem">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                            <Button
                                key={pageNumber}
                                variant={currentPage === pageNumber ? 'contained' : 'outlined'}
                                color="primary"
                                onClick={() => handlePageChange(pageNumber)}
                                sx={{ marginRight: '0.5rem' }}
                            >
                                {pageNumber}
                            </Button>
                        ))}
                    </Box>
                </Box>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default Menu;
