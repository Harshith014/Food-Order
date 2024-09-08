import MenuIcon from "@mui/icons-material/Menu";
import FoodIcon from '@mui/icons-material/Restaurant';
import { AppBar, Box, Button, Container, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { isLoggedIn, logout, userRole } = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOut = () => {
    logout();
    navigate("/signin");
  };

  const handleHomeNavigation = () => {
    navigate("/home");
  };

  const pages = isLoggedIn
    ? userRole === "admin"
      ? ["Home", "Menu", "Edit Menu"]
      : ["Home", "Menu", "Cart", "Order"]
    : ["Home", "Menu"];

  const renderNavItems = (isMobile = false) => [
    ...pages.map((page) => (
      <MenuItem key={page} onClick={handleCloseNavMenu}>
        <Typography textAlign="center">
          <Link
            href={`/${page.toLowerCase().replace(" ", "")}`}
            color="inherit"
            underline="none"
            sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
          >
            {page}
          </Link>
        </Typography>
      </MenuItem>
    )),
    isMobile && isLoggedIn && (
      <MenuItem key="signout" onClick={handleSignOut}>
        <Button color="inherit">Sign Out</Button>
      </MenuItem>
    ),
    isMobile && !isLoggedIn && (
      <MenuItem key="signin" onClick={() => navigate("/signin")}>
        <Button color="inherit">Sign In</Button>
      </MenuItem>
    ),
    isMobile && !isLoggedIn && (
      <MenuItem key="signup" onClick={() => navigate("/signup")}>
        <Button variant="outlined" color="inherit">
          Sign Up
        </Button>
      </MenuItem>
    ),
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFC107', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for larger screens */}
          <IconButton
            size="large"
            aria-label="affamé"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleHomeNavigation}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <FoodIcon sx={{ color: '#964B00' }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={handleHomeNavigation}
            sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', md: 'flex' }, 
              color: '#964B00', 
              fontWeight: 'bold',
              cursor: 'pointer' 
            }}
          >
            affamé
          </Typography>

          {/* Mobile view */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="affamé"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleHomeNavigation}
              sx={{ ml: 1 }}
            >
              <FoodIcon sx={{ color: '#964B00' }} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={handleHomeNavigation}
              sx={{ 
                ml: 1,
                color: '#964B00', 
                fontWeight: 'bold',
                cursor: 'pointer' 
              }}
            >
              affamé
            </Typography>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiMenu-paper': {
                  backgroundColor: '#FFC107',
                },
              }}
            >
              {renderNavItems(true)}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {renderNavItems(false)}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'flex-end' }}>
            {isLoggedIn && (
              <Button color="inherit" onClick={handleSignOut} sx={{ fontWeight: 'bold', color: '#964B00' }}>
                Sign Out
              </Button>
            )}
            {!isLoggedIn && (
              <>
                <Button color="inherit" onClick={() => navigate("/signin")} sx={{ fontWeight: 'bold', color: '#964B00' }}>
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => navigate("/signup")}
                  sx={{ ml: 2, fontWeight: 'bold', color: '#964B00', borderColor: '#964B00' }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;