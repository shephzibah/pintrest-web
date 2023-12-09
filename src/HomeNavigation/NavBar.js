import React from 'react';
import './NavBar.css'; 
import PinterestIcon from '@material-ui/icons/Pinterest';
import { IconButton } from '@material-ui/core';

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-left">
        <IconButton>
          <PinterestIcon className="nav-icon" />
        </IconButton>
        <span className="brand-name">Pinterest</span>
        <a href="/explore" className="nav-item">Explore</a>
      </div>
      <div className="nav-right">
        <a href="/login" className="nav-item btn btn-login">Login</a>
        <a href="/signup" className="nav-item btn btn-signup">Sign up</a>
      </div>
    </div>
  );
};

export default NavBar;
