// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddMenu from './components/AddMenu';
import AllCart from './components/AllCart';
import AllOrder from './components/AllOrder';
import Menu from './components/Allmenu';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import { ThemeProvider, useTheme } from './context/ThemeContext';

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allmenu" element={<Menu />} />
        <Route path="/allcart" element={<AllCart />} />
        <Route path="/allorder" element={<AllOrder />} />
        <Route path="/addmenu" element={<AddMenu />} />
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
