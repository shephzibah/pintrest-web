import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPinterest } from '@fortawesome/free-brands-svg-icons';
import NavBar from './HomeNavigation/NavBar';
import Login from './Login/login';
import Registration from './Registration/registration';
function App() {
  return (
    <Router>
      <div className="app-background">
      <NavBar /> {/* Include the NavBar component */}
        <div className="overlay-text">Sign up to get your ideas</div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration/>} />
          {/* Define other routes here */}
        </Routes>
      </div>
    </Router> 
  );
}

export default App;