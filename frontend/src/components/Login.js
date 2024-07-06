import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaLock, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';
import loginIllustration from '../img/login.svg';

const Login = () => {
  const navigate = useNavigate();
  const [loggedIn, isLoggedin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      const response = await axios.post(`${process.env.REACT_APP_URI}/api/auth/login`, formData);
      // console.log(response.data); // Assuming the backend returns a token upon successful login
      setFormData({
        email: '',
        password: ''
      });
      setErrorMessage('');
      localStorage.setItem('token', response.data.token);
      isLoggedin(true);
      navigate("/allmenu");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Server Error. Please try again later.');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
  }

  return (
    <div className="login-container">
      <motion.div
        className="login-form-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={loginIllustration} alt="Login Illustration" className="login-illustration" />
        <h2 className="login-title">Welcome Back!</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {loggedIn ?
          <div className="logged-in-container">
            <p>You are Logged In</p>
            <button onClick={logout} className="logout-button">Logout</button>
          </div>
          :
          <form onSubmit={handleSubmit} className="login-form">
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
            <button type="submit" className="login-button">Login</button>
            <span className="register-link"><p style={{ color: 'black' }}>No account? <Link to={'/register'}>Register</Link> </p></span>
          </form>
        }
      </motion.div>
    </div>
  );
};

export default Login;
