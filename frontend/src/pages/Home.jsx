import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VeganBurgerImage from "../assets/burger.jpg";
import PizzaImage from "../assets/pizza.jpg";
import BackgroundImage from "../assets/restaurant.jpg";
import TacosImage from "../assets/tacos.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  const dishes = [
    {
      name: "Gourmet Pizza",
      description:
        "A delightful mix of fresh ingredients and flavors that burst with every bite.",
      image: PizzaImage,
    },
    {
      name: "Spicy Tacos",
      description:
        "Mouth-watering tacos that will transport your taste buds straight to Mexico.",
      image: TacosImage,
    },
    {
      name: "Vegan Burger",
      description:
        "A healthy yet tasty burger option for all vegan food lovers out there.",
      image: VeganBurgerImage,
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "#FFF",
          py: 4,
        }}
      >
        {/* Hero Section */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
            mb: 2,
          }}
        >
          {`Welcome to Foodie's Paradise!`}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            mb: 3,
          }}
        >
          Explore our delicious menu and enjoy fast delivery right to your door.
          Your hunger ends here.
        </Typography>

        {/* Call to Action */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/menu")}
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            padding: "8px 16px",
            backgroundColor: "#FFC107",
            "&:hover": {
              backgroundColor: "#FFB300",
            },
          }}
        >
          Explore Menu
        </Button>

        {/* Section for Featured Dishes */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              color: "#FFC107",
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
            }}
          >
            Featured Dishes
          </Typography>

          {/* Featured Dishes List */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
              gap: 2,
            }}
          >
            {dishes.map((dish, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "200px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Background Image */}
                <Box
                  sx={{
                    backgroundImage: `url(${dish.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      zIndex: 1,
                    },
                  }}
                />

                {/* Dish Details */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    color: "#FFF",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                    }}
                  >
                    {dish.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    }}
                  >
                    {dish.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
