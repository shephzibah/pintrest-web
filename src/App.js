import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './HomeNavigation/NavBar';
import Login from './Login/login';
import Registration from './Registration/registration';
import Header from './components/Header';
import Mainboard from './components/Mainboard';
import './App.css';

function App() {
  const [pins, setNewPins] = useState([]);
  const authState = useSelector(state => state.auth);

  const getImages = (term) => {
    return axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
      headers: {
        Authorization: "Client-ID Y2PGTILvwArhMr02w2yhJges8GixRuM4bs5_hyhtYAw",
      },
    });
  };

  const onSearchSubmit = (term) => {
    getImages(term).then((res) => {
      let results = res.data.results;
      let newPins = [...pins, ...results];
      newPins.sort(() => 0.5 - Math.random());
      setNewPins(newPins);
    });
  };

  useEffect(() => {
    const getNewPins = () => {
      let promises = [];
      let pinData = [];
      let pins = ['Istanbul', 'dogs', 'sky', 'apple', 'nature'];

      // Load local images
      const localImages = [
        { urls: { regular: process.env.PUBLIC_URL + '/images/carrotv2.jpg' } },
        { urls: { regular: process.env.PUBLIC_URL + '/images/carrot.jpg' } },
        { urls: { regular: process.env.PUBLIC_URL + '/images/carrotv3.jpg' } },
        { urls: { regular: process.env.PUBLIC_URL + '/images/carrotv4.jpg' } },
        { urls: { regular: process.env.PUBLIC_URL + '/images/carrotv5.jpg' } },
        // Add more local images as needed
      ];

      pinData = pinData.concat(localImages);

      // Fetch images from Unsplash API
      pins.forEach((pinTerm) => {
        promises.push(
          getImages(pinTerm).then((res) => {
            let results = res.data.results;
            pinData = pinData.concat(results);

            pinData.sort(function (a, b) {
              return 0.5 - Math.random();
            });
          })
        );
      });

      Promise.all(promises).then(() => {
        setNewPins(pinData);
      });
    };

    getNewPins();
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={
            <>
              <NavBar />
              <div className="overlay-text">Sign up to get your ideas</div>
              <Login />
            </>
          } />
          <Route path="/signup" element={
            <>
              <NavBar />
              <div className="overlay-text">Sign up to get your ideas</div>
              <Registration />
            </>
          } />
          <Route path="/mainboard" element={
            authState.isAuthenticated ? ( // Check if user is authenticated
              <>
                <Header onSearchSubmit={onSearchSubmit} />
                <Mainboard pins={pins} />
              </>
            ) : (
              <Navigate to="/login" /> // Redirect to login if not authenticated
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
