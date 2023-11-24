import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from './actions'; 
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Redux state and dispatch
  const authState = useSelector(state => state.auth); 
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  return (
    <div className="login-container">
      <div className="login-form">
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
        <div className="alternative-login">
          <button className="facebook-login">Continue with Facebook</button>
          <button className="google-login">Continue with Google</button>
        </div>
      </div>
    </div>
  );
}
