import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPinterest } from '@fortawesome/free-brands-svg-icons';
import Login from './Login/login';
function App() {
  return (
    <Router>
      <div className="app-background">
        <nav className="app-nav">
          <a href="/" className="nav-logo">
            <FontAwesomeIcon icon={faPinterest} style={{ color: 'red' }} />
          </a>
          <a href="/" className="nav-logo">Pinterest</a>
          <a href="/explore" className="nav-item">Explore</a>
          <a href="/login" className="nav-item selected">Login</a>
          <a href="/signup" className="nav-item">Sign up</a>
        </nav>
        <div className="overlay-text">Sign up to get your ideas</div>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Define other routes here */}
        </Routes>
      </div>
    </Router> 
  );
}

export default App;