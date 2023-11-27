// Registration.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerAction } from './action';
import './registration.css';

const validUserRoles = ['user', 'seller'];

export default function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userrole, setUserrole] = useState('');

  // Redux state and dispatch
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();

    // Validate userrole
    if (!validUserRoles.includes(userrole)) {
      alert('Invalid userrole. Please choose "user" or "seller".');
      return;
    }

    dispatch(registerAction({ firstName, lastName, email, password, userrole }));
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <form onSubmit={handleRegister}>
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
          <div>
            <label>
              <input
                type="radio"
                value="user"
                checked={userrole === 'user'}
                onChange={() => setUserrole('user')}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                value="seller"
                checked={userrole === 'seller'}
                onChange={() => setUserrole('seller')}
              />
              Seller
            </label>
          </div>
          <button type="submit" className="registration-button">Register</button>
        </form>
        <div className="alternative-login">
          <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
      </div>
    </div>
  );
}
