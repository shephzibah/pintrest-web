import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './HomeNavigation/NavBar';
import Login from './Login/login';
import UserProfile from './UserProfile/userprofile';
import Registration from './Registration/registration';
import Header from './components/Header';
import Mainboard from './components/Mainboard';
import CategorySelection from './preferences/CategorySelection';
import './App.css';

function App() {
  const [pins, setNewPins] = useState([]);
  const authState = useSelector(state => state.auth);
  const [redirectToPreferences, setRedirectToPreferences] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]); 

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
  
      // Combine default categories with selected categories
      const allCategories = [...selectedCategories, 'coding', 'makeup', 'street'];
  
      // Fetch images from Unsplash API for each category
      allCategories.forEach((pinTerm) => {
        promises.push(
          getImages(pinTerm).then((res) => {
            let results = res.data.results;
            
            // Append local image URLs to results
            const localImages = [
              { urls: { regular: process.env.PUBLIC_URL + '/images/carrotv2.jpg' } },
              { urls: { regular: process.env.PUBLIC_URL + '/images/carrot.jpg' } },
              { urls: { regular: process.env.PUBLIC_URL + '/images/carrotv3.jpg' } },
              { urls: { regular: process.env.PUBLIC_URL + '/images/carrotv4.jpg' } },
              { urls: { regular: process.env.PUBLIC_URL + '/images/carrotv5.jpg' } },
              // Add more local images as needed
            ];
            
            results = results.concat(localImages);
  
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
  }, [selectedCategories]);
  
  
  const handleCategoriesSelected = (categories) => {
    console.log('Selected categories:', categories); // Log the selected categories
    setSelectedCategories(categories);
  
    // Update the pins array with selected categories and default ones
    setNewPins([...categories, 'coding', 'makeup', 'street']);
  };

  // Call handleCategoriesSelected every time mainboard is loaded
  useEffect(() => {
    handleCategoriesSelected(selectedCategories);
  }, [authState.isAuthenticated]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={
            <>
              <NavBar />
              <div className="overlay-text">Login to create pins</div>
              <Login />
            </>
          } />
          <Route path="/signup" element={
            <>
              <NavBar />
              <div className="overlay-text">Sign up to get your ideas</div>
              <Registration/>
            </>
          } />
          <Route path="/mainboard" element={
            // authState.isAuthenticated ? (
              <>
                <Header onSearchSubmit={onSearchSubmit} />
                <Mainboard pins={pins} />
              </>
            // ) : (
            //   <Navigate to="/login" />
            // )
          } />
          <Route path="/profile" element={
            authState.isAuthenticated ? (
              <>
                <Header onSearchSubmit={onSearchSubmit} />
                <UserProfile />
              </>
            ) : (
              <Navigate to="/login" />
            )
          } />
          {redirectToPreferences && <Navigate to="/preferences" />}
          <Route path="/preferences" element={<CategorySelection onCategoriesSelected={setSelectedCategories} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;