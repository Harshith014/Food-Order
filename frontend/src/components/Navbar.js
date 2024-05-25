// src/components/Navbar.js
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const pages = ['Allmenu', 'Allorder', 'Allcart'];

export default function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { theme, toggleTheme } = useTheme();  // Using the theme context

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getUserRole = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.role;
    }
    return null;
  };

  const userRole = getUserRole();

  const navbarBorderColor = theme === 'light' ? '#333' : '#fff';  // Border color based on theme

  return (
    <nav>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#333', border: `1px solid ${navbarBorderColor}` }}>
          <Toolbar>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleMenu}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Link to="/allmenu" style={{ textDecoration: 'none', color: 'white' }}>
                affamé
              </Link>
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
              {pages.map((page) => (
                <React.Fragment key={page}>
                  {(userRole !== 'admin' || (page !== 'Allorder' && page !== 'Allcart')) && (
                    <Button
                      key={page}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      component={Link}
                      to={`/${page.toLowerCase()}`}
                    >
                      {page}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </Box>
            {!token ? (
              <>
                <Button color="inherit" component={Link} to="/login" sx={{ marginRight: 1 }}>
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            ) : (
              <>
                {userRole === 'admin' && (
                  <Button color="inherit" sx={{ my: 2 }} component={Link} to="/addmenu">
                    Addmenu
                  </Button>
                )}
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
            <IconButton color="inherit" onClick={toggleTheme}>
              {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={isMenuOpen}
          onClose={toggleMenu}
          sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: '#333',
              color: 'white',
              width: '250px',
              border: `1px solid ${navbarBorderColor}`,  // Drawer border
            },
          }}
        >
          <Toolbar />
          <List>
            {pages
              .filter((page) => userRole !== 'admin' || (page !== 'Allorder' && page !== 'Allcart'))
              .map((page) => (
                <ListItem
                  button
                  key={page}
                  component={Link}
                  to={`/${page.toLowerCase()}`}
                  onClick={toggleMenu}
                  sx={{ '&:hover': { backgroundColor: '#555' } }}
                >
                  <ListItemText primary={page} />
                </ListItem>
              ))}
          </List>
        </Drawer>
      </Box>
    </nav>
  );
}
