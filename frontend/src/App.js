// src/App.js
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddMenu from './components/AddMenu';
import AllCart from './components/AllCart';
import AllOrder from './components/AllOrder';
import Menu from './components/Allmenu';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Payment from './components/Payment';
import PaymentSuccess from './components/PaymentSuccess';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const stripePromise = loadStripe(process.env.REACT_APP_CLIENT_KEY);

const MainContent = () => {
  const { theme } = useTheme();

  const mainContentStyles = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
    color: theme === 'light' ? '#000000' : '#ffffff',
    minHeight: '100vh',
    padding: '20px'
  };

  return (
    <div style={mainContentStyles}>
      <Routes>
        <Route path="/" element={<Navigate to="/allmenu" />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allmenu" element={<Menu />} />
        <Route path="/allcart" element={<AllCart />} />
        <Route path="/allorder" element={<AllOrder />} />
        <Route path="/addmenu" element={<AddMenu />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/payment" element={
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        } />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <MainContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;