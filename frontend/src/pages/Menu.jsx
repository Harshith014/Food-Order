import { AddShoppingCart } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import tableImage from "../assets/table.jpg";
import DescriptionAlerts from "../components/Alert";
import { AuthContext } from "../context/UserContext";

const MenuPage = () => {
  const { token, userId } = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);
  const [alertStatus, setAlertStatus] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10); // display 10 items per page
  const [totalItems, setTotalItems] = useState(0); // Store total item count
  const theme = useTheme();

  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URI}/api/menu/allMenu?page=${pageNumber}&pageSize=${pageSize}`
        );
  
        // Extract the data and set state
        setMenuItems(response.data.menuItems);
        setTotalItems(response.data.totalItems); // Set the total number of items
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setAlertStatus("error");
      }
    };
    fetchMenuItems();
  }, [pageNumber, pageSize, userId, token]);

  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  const handleAddToCart = async (menuItem) => {
    try {
      const cartData = {
        userId: userId,
        menuItemId: menuItem._id,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      await axios.post(
        `${import.meta.env.VITE_REACT_APP_URI}/api/cart/addCart`,
        cartData,
        config
      );

      setAlertStatus("success");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setAlertStatus("error");
    } finally {
      setTimeout(() => {
        setAlertStatus(null);
      }, 3000); 
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${tableImage})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        py: 4,
        [theme.breakpoints.down("sm")]: {
          py: 2,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
        <Grid container spacing={4}>
          {menuItems.map((item, index) => (
            <Grid
              item
              key={`${item._id}-${index}`}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  maxWidth: "100%",
                },
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 16,
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff5e6",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.name}
                  loading="lazy" // Lazy load the images
                  sx={{
                    objectFit: "cover",
                    borderRadius: "16px 16px 0 0",
                    [theme.breakpoints.down("sm")]: {
                      height: 150,
                    },
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    padding: 2,
                    backgroundColor: "#f9f3e6",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontSize: 18,
                      fontWeight: 500,
                      color: "#964B00",
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 16,
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: 14,
                      lineHeight: 1.5,
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 12,
                      },
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{
                      fontSize: 16,
                      fontWeight: 500,
                      mt: 2,
                      color: "#FFC107",
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 14,
                      },
                    }}
                  >
                    ${item.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<AddShoppingCart />}
                    sx={{
                      mt: "auto",
                      borderRadius: 16,
                      padding: "12px 24px",
                      backgroundColor: "#FFC107",
                      "&:hover": {
                        backgroundColor: "#ff9800",
                      },
                      [theme.breakpoints.down("sm")]: {
                        padding: "10px 20px",
                        fontSize: 14,
                      },
                    }}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={Math.ceil(totalItems / pageSize)} // Calculate total pages from totalItems
          page={pageNumber}
          onChange={handlePageChange}
          sx={{
            mt: 2,
            mb: 2,
            display: "flex",
            justifyContent: "center", 
            "& .MuiPaginationItem-root": {
              fontSize: 30,
              fontWeight: 500,
              color: "#ffd0a2",
              borderRadius: 16, 
              "&:hover": {
                backgroundColor: "#ff9800",
              },
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#FFC107",
              color: "#fff",
              borderRadius: 16, 
            },
          }}
        />
      </Container>
    </Box>
  );
};

export default MenuPage;
