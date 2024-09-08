import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserContext";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const { token, userId } = useContext(AuthContext);
  const theme = useTheme();

  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        try {
          const config = {
            headers: {
              Authorization: token,
            },
          };

          const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_URI}/api/order/allOrder/${userId}`,
            config
          );

          setOrders(response.data.orders); 
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }
  }, [userId, token]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)", 
        padding: 3,
        [theme.breakpoints.down("xs")]: {
          padding: 2,
        },
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 4,
          color: "#964B00", 
          [theme.breakpoints.down("xs")]: {
            // Adjust font size for mobile screens
            fontSize: 18,
          },
        }}
      >
        Your Orders
      </Typography>
      <Grid container spacing={4}>
        {orders.map((order) => (
          <Grid item key={`order-${order._id}`} xs={12}>
            <Card sx={{ mb: 3, backgroundColor: "#fff5e6" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    [theme.breakpoints.down("xs")]: {
                      // Adjust box padding for mobile screens
                      padding: 1,
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: "#964B00" }}
                  >
                    Order ID: {order._id}
                  </Typography>
                  <Chip
                    label={order.status}
                    color={order.status === "Delivered" ? "success" : "warning"}
                    sx={{ color: "#964B00", borderColor: "#964B00" }} 
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    [theme.breakpoints.down("xs")]: {
                      // Adjust font size for mobile screens
                      fontSize: 14,
                    },
                  }}
                >
                  Date: {moment(order.orderDate).format("YYYY-MM-DD HH:mm:ss")}
                </Typography>
                <Divider />
                <Box
                  sx={{
                    mt: 2,
                    [theme.breakpoints.down("xs")]: {
                      // Adjust box padding for mobile screens
                      padding: 1,
                    },
                  }}
                >
                  {order.items.map((item) => (
                    <Box
                      key={item._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                        [theme.breakpoints.down("xs")]: {
                          // Adjust box padding for mobile screens
                          padding: 0.5,
                        },
                      }}
                    >
                      <Typography variant="body1" sx={{ color: "#964B00" }}>
                        {item.quantity ? `${item.quantity} x ` : ""}
                        {item.name}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#964B00" }}>
                        {item.price && item.quantity
                          ? `$${(item.price * item.quantity).toFixed(2)}`
                          : "N/A"}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Divider
                  sx={{
                    mt: 2,
                    mb: 2,
                    [theme.breakpoints.down("xs")]: {
                      // Adjust divider margin for mobile screens
                      mt: 1,
                      mb: 1,
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    [theme.breakpoints.down("xs")]: {
                      // Adjust box padding for mobile screens
                      padding: 1,
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#964B00" }}>
                    Total: $
                    {order.totalPrice ? order.totalPrice.toFixed(2) : "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.status === "Delivered"
                      ? "Delivered"
                      : "Expected soon"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          mt: 4,
          textAlign: "center",
          [theme.breakpoints.down("xs")]: {
            // Adjust box padding for mobile screens
            mt: 2,
          },
        }}
      >
        <IconButton
          sx={{
            color: "#FFC107",
            [theme.breakpoints.down("xs")]: {
              // Adjust icon size for mobile screens
              fontSize: "large",
            },
          }}
        >
          <LocalDiningIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "#FFC107",
            [theme.breakpoints.down("xs")]: {
              // Adjust icon size for mobile screens
              fontSize: "large",
            },
          }}
        >
          <RestaurantIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "#FFC107",
            [theme.breakpoints.down("xs")]: {
              // Adjust icon size for mobile screens
              fontSize: "large",
            },
          }}
        >
          <FastfoodIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default OrderPage;
