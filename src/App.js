import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPinterest } from '@fortawesome/free-brands-svg-icons';
import NavBar from './HomeNavigation/NavBar';
import Login from './Login/login';
function App() {
  return (
    <Router>
      <div className="app-background">
      <NavBar /> {/* Include the NavBar component */}
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