import React from 'react';
import './NavBar.css'; // Make sure this is correct relative to your NavBar.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPinterest } from '@fortawesome/free-brands-svg-icons';

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-left">
      <div className="icon-container">
          <FontAwesomeIcon icon={faPinterest} className="nav-icon" />
        </div>
        <span className="brand-name">Pinterest</span>
        <a href="/explore" className="nav-item">Explore</a>
      </div>
      <div className="nav-right">
        <a href="/login" className="nav-item btn">Login</a>
        <a href="/signup" className="nav-item">Sign up</a>
      </div>
    </div>
  );
};

export default NavBar;