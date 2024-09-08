import {
  Add,
  Delete,
  Remove,
  ShoppingBasket,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DescriptionAlerts from "../components/Alert";
import { AuthContext } from "../context/UserContext";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { token, userId } = useContext(AuthContext);
  const [alertStatus, setAlertStatus] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const config = {
          headers: {
            Authorization: token,
          },
        };

        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URI}/api/cart/allCart/${userId}`,
          config
        );

        const cartItems = response.data.reduce(
          (acc, cartItem) => acc.concat(cartItem.items),
          []
        );

        setCartItems(cartItems);

      } catch (error) {
        console.error("Error fetching cart items:", error);
        setAlertStatus("error");
      } 
    };
    if (userId) {
      fetchCartItems();
    }
  }, [userId, token]);

  const handleQuantityUpdate = async (item, action) => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };

      await axios.post(
        `${import.meta.env.VITE_REACT_APP_URI}/api/cart/updateCart`,
        {
          userId,
          menuItemId: item.menuItemId,
          action,
        },
        config
      );

      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          if (action === "increment") {
            cartItem.quantity += 1;
          } else if (action === "decrement" && cartItem.quantity > 1) {
            cartItem.quantity -= 1;
          }
        }
        return cartItem;
      });

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const handleQuantityChange = (item, increment) => {
    const action = increment ? "increment" : "decrement";
    if (action === "decrement" && item.quantity === 1) {
      handleRemoveItem(item);
    } else {
      handleQuantityUpdate(item, action);
    }
  };

  const handleRemoveItem = async (item) => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };

      await axios.delete(`${import.meta.env.VITE_REACT_APP_URI}/api/cart/deletecart`, {
        headers: config.headers,
        data: { userId, menuItemId: item.menuItemId },
      });

      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem._id !== item._id
      );

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleProceedToOrder = async () => {
    navigate('/payment', { state: { cartItems } }); // Navigate to payment form
  };

 
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        bgcolor: "#f5f5f5", 
        p: 2,
      }}
    >
      {alertStatus && (
        <DescriptionAlerts
          status={alertStatus}
          title={
            alertStatus === "success"
              ? "Item added to cart!"
              : "Error adding item to cart!"
          }
          sx={{
            mt: 2,
            mb: 2,
            px: 2,
            py: 1,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            [theme.breakpoints.down("sm")]: {
              fontSize: "14px",
            },
          }}
        />
      )}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", mb: 3, color: "#964B00" }} 
      >
        <ShoppingCart sx={{ mr: 2, color: "#FFC107" }} />{" "}
        Your Cart
      </Typography>
      <Grid container spacing={2}>
        {cartItems.map((item) => (
          <Grid item xs={12} key={item._id}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#fff5e6",
                borderRadius: 2,
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 120, height: 120, objectFit: "cover" }}
                image={item.image}
                alt={item.name}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: "#964B00" }} 
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    ${item.price.toFixed(2)} each
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item, false)}
                    >
                      <Remove fontSize="small" sx={{ color: "#FFC107" }} />{" "}
                    </IconButton>
                    <Typography
                      variant="body1"
                      sx={{ mx: 1, minWidth: "24px", textAlign: "center" }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item, true)}
                    >
                      <Add fontSize="small" sx={{ color: "#FFC107" }} />{" "}
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#964B00" }} 
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(item)}
                    sx={{ mt: 1 }}
                  >
                    <Delete sx={{ color: "#FFC107" }} />{" "}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {cartItems.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mt: 4, color: "#964B00" }} 
        >
          Your cart is empty. Add some delicious items!
        </Typography>
      ) : (
        <Paper
          elevation={3}
          sx={{ mt: 4, p: 3, bgcolor: "#fff5e6" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" component="div" sx={{ color: "#964B00" }}>
              Total
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#964B00" }} 
            >
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<ShoppingBasket sx={{ color: "#FFC107" }} />}
            onClick={handleProceedToOrder}
            sx={{
              py: 1.5,
              backgroundColor: "#FFC107",
              "&:hover": {
                backgroundColor: "#e0a800", 
              },
            }}
          >
            Proceed to Order
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default CartPage;
