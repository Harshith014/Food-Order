import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaLock, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import '../css/Register.css';
import registerIllustration from '../img/signup.svg';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithRole = { ...formData, role: 'user' };
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`${process.env.REACT_APP_URI}/api/auth/register`, formDataWithRole);
      // console.log(response.data);
      setFormData({
        email: '',
        password: '',
        role: ''
      });
      navigate("/login");
      setErrorMessage('');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Server Error. Please try again later.');
      }
    }
  };

  return (
    <div className="register-container">
      <motion.div
        className="register-form-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={registerIllustration} alt="Register Illustration" className="register-illustration" />
        <h2 className="register-title" style={{ color: 'black' }}>Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <FaUserCircle className="form-icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <FaLock className="form-icon" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="register-button">Register</button>
          <span className="login-link"><p style={{ color: 'black' }}>Already have an account? <Link to={'/login'}>Login</Link> </p></span>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
