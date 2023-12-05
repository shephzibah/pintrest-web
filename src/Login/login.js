// Login.js
import React, { useState } from 'react';
import { loginAction } from './actions';
import { useDispatch } from 'react-redux';
import './login.css'; // Ensure the file name matches the casing
import { useNavigate } from 'react-router-dom';

import * as client from './service';

// Toast Message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redux state and dispatch
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const credentials = { email, password };

      const response = await client.loginUser(credentials);

      dispatch(loginAction(credentials));
      navigate('/mainboard');

    } catch (error) {
      toast.error("Invalid login credentials", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleExplore = () => {
    // Navigate to the Explore page
    navigate('/explore');
  };

  return (
    <div className="login-container">
      <ToastContainer />
      {error && <p className="error-message">{error}</p>}
      <div className="login-card">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Log in</button>
        </form>
        <button className="facebook-login">Continue with Facebook</button>
        <button className="google-login">Continue with Google</button>
        
        {/* Explore button */}
        <button className="explore-button" onClick={handleExplore}>Explore</button>
      </div>
    </div>
  );
}
