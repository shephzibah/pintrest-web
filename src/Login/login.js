// Login.js
import React, { useState } from 'react';
import { loginAction } from './actions';
import { useDispatch } from 'react-redux';
import './login.css'; // Ensure the file name matches the casing
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redux state and dispatch
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const response = await fetch('datasets/authorized_users.json');
    if (!response.ok) {
      setError(`HTTP error! status: ${response.status}`);
      return;
    }
    const authorizedUsers = await response.json();

    const userExists = authorizedUsers.find(user => user.email === email && user.password === password);

    if (userExists) {
      dispatch(loginAction(email, password)); // Dispatching login action to update Redux state
      navigate('/mainboard'); 
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
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
      </div>
    </div>
  );
}
