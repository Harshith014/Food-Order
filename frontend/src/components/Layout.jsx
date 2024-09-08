import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Footer from "./Footer"; // The Footer component you created
import Navbar from "./Navbar"; // Assuming you have a Navbar component

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box sx={{ flex: "1", width: "100%" }}>
        {children} {/* This will be your page content */}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
