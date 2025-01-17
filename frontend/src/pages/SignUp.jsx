import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/restaurant.jpg";
import LoadingComponent from "../components/Loading";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFC107",
    },
    secondary: {
      main: "#E53935",
    },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
});

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_URI}/api/auth/register`,
        {
          email,
          password,
          role: "user",
        }
      );

      navigate("/menu");
    } catch (error) {
      console.error("Error during sign up:", error);
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false); // Set loading status to false when API request is complete
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
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
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 1,
          },
          [theme.breakpoints.down("sm")]: {
            height: "auto",
            padding: "20px",
          },
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            backgroundColor: "#F7F7F7",
            p: 4,
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            position: "relative",
            zIndex: 2,
            [theme.breakpoints.down("sm")]: {
              padding: "10px",
              borderRadius: "10px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              [theme.breakpoints.down("sm")]: {
                padding: "10px",
              },
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                mb: 2,
                color: "#E53935",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "18px",
                },
              }}
            >
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "4px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      [theme.breakpoints.down("sm")]: {
                        fontSize: "14px",
                      },
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "4px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      [theme.breakpoints.down("sm")]: {
                        fontSize: "14px",
                      },
                    }}
                  />
                  {error && (
                    <Alert severity="error" sx={{ mt: 2, fontSize: "14px" }}>
                      {error}
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "#E53935",
                      color: "#FFF",
                      "&:hover": {
                        backgroundColor: "#d32f2f",
                      },
                      [theme.breakpoints.down("sm")]: {
                        padding: "10px",
                        fontSize: "14px",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      fontSize: "14px",
                      [theme.breakpoints.down("sm")]: {
                        fontSize: "12px",
                      },
                    }}
                  >
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      style={{
                        color: "#E53935",
                        textDecoration: "none",
                        fontSize: "14px",
                      }}
                    >
                      SignIn
                    </Link>
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SignUpPage;
