import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Button,
  Container,
  Grid, SvgIcon, Typography, useTheme
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DescriptionAlerts from "../components/Alert";

const PaymentSuccess = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState(null);
  const [alertStatus, setAlertStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const placeOrder = async () => {
      if (!location.state || !location.state.cartItems) {
        setError("No order data found. Please try again.");
        return;
      }

      const { cartItems, userId, token } = location.state;

      if (!cartItems || cartItems.length === 0) {
        setError(
          "Cart is empty. Please add items to your cart before placing an order."
        );
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: token,
          },
        };

        const orderData = {
          userId,
          items: cartItems.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
          })),
        };

        await axios.post(
          `${import.meta.env.VITE_REACT_APP_URI}/api/order/addOrder`,
          orderData,
          config
        );

        setOrderPlaced(true);
        setAlertStatus("success");
      } catch (error) {
        console.error("Error placing order:", error);
        setAlertStatus("error");
        setError("Failed to place order. Please try again.");
      } finally {
        setTimeout(() => {
          setAlertStatus(null);
        }, 3000); // display alert for 3 seconds
      }
    };

    placeOrder();
  }, [location.state]);

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/cart")}
          startIcon={<ShoppingCartIcon />}
        >
          Return to Cart
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      {alertStatus && (
        <DescriptionAlerts
          status={alertStatus}
          title={
            alertStatus === "success"
              ? "Order placed successfully!"
              : "Error placing order!"
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
          icon={
            alertStatus === "success" ? (
              <SvgIcon color="success">
                <CheckCircleIcon />
              </SvgIcon>
            ) : (
              <SvgIcon color="error">
                <ErrorIcon />
              </SvgIcon>
            )
          }
        />
      )}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Your Payment is successful!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {orderPlaced ? (
            <Typography variant="body1" color="success" sx={{ mb: 2 }}>
              Your order has been placed successfully!
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ mb: 2 }}>
              Processing your order...
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            startIcon={<ShoppingCartIcon />}
          >
            Continue Shopping
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentSuccess;
