import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Button, Container, Grid, IconButton, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#FFC107', // Warm orange background color
        color: '#964B00', // Earthy brown text color
        py: 6,
        borderTop: '4px solid #964B00', // Earthy brown border for distinction
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Food Order
            </Typography>
            <Typography variant="body2">
              Order your favorite meals from the best restaurants near you.
            </Typography>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Box>
              <Link href="#" color="inherit" underline="none" display="block" sx={{ mb: 1 }}>
                About Us
              </Link>
              <Link href="#" color="inherit" underline="none" display="block" sx={{ mb: 1 }}>
                Careers
              </Link>
              <Link href="#" color="inherit" underline="none" display="block" sx={{ mb: 1 }}>
                Blog
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Box>
              <Link href="#" color="inherit" underline="none" display="block" sx={{ mb: 1 }}>
                Contact Us
              </Link>
              <Link href="#" color="inherit" underline="none" display="block" sx={{ mb: 1 }}>
                FAQs
              </Link>
              <Link href="#" color="inherit" underline="none" display="block" sx={{ mb: 1 }}>
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" underline="none" display="block" sx={{ mb: 1 }}>
                Terms of Service
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom>
              Social Media
            </Typography>
            <Box>
              <IconButton aria-label="Facebook" sx={{ color: '#964B00', mr: 1 }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" sx={{ color: '#964B00', mr: 1 }}>
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Instagram" sx={{ color: '#964B00' }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Download Our App
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AppleIcon />}
                sx={{ mb: 1, backgroundColor: '#000', '&:hover': { backgroundColor: '#333' } }}
              >
                App Store
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AndroidIcon />}
                sx={{ backgroundColor: '#32CD32', '&:hover': { backgroundColor: '#228B22' } }}
              >
                Google Play
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box
          mt={4}
          pt={3}
          borderTop={1}
          borderColor="grey.700"
          textAlign="center"
        >
          <Typography variant="body2" color="textSecondary">
            © 2024 affamé. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
