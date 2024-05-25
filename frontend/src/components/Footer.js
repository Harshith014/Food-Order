// components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </footer>
  );
};

const footerStyles = {
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
  height: '60px',
  backgroundColor: '#333333',
  color: '#ffffff',
  textAlign: 'center',
  padding: '20px',
  fontSize: '14px', // Default font-size

  // Media queries for responsiveness
  '@media (maxWidth: 768px)': {
    padding: '15px',
    fontSize: '12px',
  },
  '@media (maxWidth: 576px)': {
    padding: '10px',
    fontSize: '10px',
  },
};

export default Footer;
