import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAction } from './action';
import './registration.css';
import { useNavigate } from 'react-router-dom';
import * as client from './client';

// Toast Message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);

  // Redux state and dispatch
  const dispatch = useDispatch();

  // React Router's useNavigate
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const userDetails = { firstName, lastName, email, password, userrole: isSeller ? 'seller' : 'user' };
    dispatch(registerAction(userDetails));

    try {
      const response = await client.signupUser(userDetails);
        navigate('/login');
      
    } catch (error) {
      toast.error(error.message, {
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

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-card registration-card">
        <form onSubmit={handleRegister}>
        <div className="name-inputs">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
          <div className="user-role-input">
            <label>
              <input
                type="checkbox"
                value={isSeller}
                onChange={() => setIsSeller(!isSeller)}
              />
              Seller
            </label>
          </div>
          <button type="submit" className="login-button registration-button">Register</button>
        </form>
      </div>
    </div>
  );
}