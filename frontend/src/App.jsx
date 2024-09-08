import { Box } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Header";
import CartPage from "./pages/Cart";
import HomePage from "./pages/Home";
import MenuPage from "./pages/Menu";
import MenuAdmin from "./pages/MenuAdmin";
import OrderPage from "./pages/Order";
import PaymentSuccess from "./pages/PaymentSuccess";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import StripePayment from "./pages/StripePayment";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            flex: "1",
            width: "100%",
            paddingBottom: "20px", // Add some padding for spacing
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/editmenu" element={<MenuAdmin />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/payment" element={<StripePayment />} />
            <Route path="/success" element={<PaymentSuccess />} />
            {/* Add other routes here */}
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
