import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useParams
} from 'react-router-dom';
import NavBar from './HomeNavigation/NavBar';
import Login from './Login/login';
import UserProfile from './UserProfile/userprofile';
import Registration from './Registration/registration';
import Header from './components/Header';
import Mainboard from './components/Mainboard';
import CategorySelection from './preferences/CategorySelection';
import ExplorePage from './explore/ExplorePage';
import UserEditProfile from "./UserProfile/userEditProfile";
import UserEditPassword from "./UserProfile/userEditPassword";

import * as client from './components/client';

import './App.css';
import {createToken} from "./authReducer";

function App() {
  const dispatch = useDispatch();

  let isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated)

  // Discuss
  if(localStorage.getItem('authToken')) {
    isAuthenticated = true;
    dispatch(createToken(localStorage.getItem('authToken')));
  }

  const [pins, setNewPins] = useState([]);
  const [redirectToPreferences, setRedirectToPreferences] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]); 
  const { category } = useParams();

  const onSearchSubmit = (term) => {
    client.getCategoryImages(term).then((res) => {
      let newPins = [...res, ...pins];
      newPins.sort(() => 0.5 - Math.random());
      setNewPins(newPins);
    });
  };

  useEffect(() => {
    const  getNewPins = async () => {
      let promises = [];
      let pinData = [];

      try {
        // Fetch posts from the endpoint
        const response = await client.getAllPosts();

        // Extract data from the response
        let posts = response.data;
        for(let index = 0; index < posts.length; index ++){
          let post = posts[index];
          posts[index] = {
            "regular": post.docId
          };
        }

        pinData = posts;

        // Combine default categories with selected categories
        const allCategories = [...selectedCategories, 'coding', 'makeup', 'street', category].filter(Boolean);

        // Fetch images from Unsplash API for each category
        allCategories.forEach((pinTerm) => {
          promises.push(
            client.getCategoryImages(pinTerm).then((res) => {
              // Replace local image URLs with docId from posts
              res.forEach((result, index) => {
              });

              pinData = pinData.concat(res);

              pinData.sort(function (a, b) {
                return 0.5 - Math.random();
              });
            })
          );
        });

        Promise.all(promises).then(() => {
          setNewPins(pinData);
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getNewPins();
  }, [selectedCategories, category]);
  
  const handleExploreCategoriesSelected = (categories) => {
    console.log('Selected categories from ExplorePage:', categories);
    setSelectedCategories(categories);
    // Update the pins array with selected categories and default ones
    setNewPins([...categories, 'coding', 'makeup', 'street']);
  };
  
  const handleCategoriesSelected = (categories) => {
    console.log('Selected categories:', categories); // Log the selected categories
    setSelectedCategories(categories);
  
    // Update the pins array with selected categories and default ones
    setNewPins([...categories, 'coding', 'makeup', 'street']);
  };

  // Call handleCategoriesSelected every time mainboard is loaded
  useEffect(() => {
    handleCategoriesSelected(selectedCategories);
  }, [isAuthenticated]);

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
            isAuthenticated ? (
              <>
                <Header onSearchSubmit={onSearchSubmit} />
                <Mainboard pins={pins} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/profile" element={
            isAuthenticated ? (
              <>
                <Header onSearchSubmit={onSearchSubmit} />
                <UserProfile />
              </>
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/profile/:profileUserId" element={
            isAuthenticated ? (
                <>
                  <Header onSearchSubmit={onSearchSubmit} />
                  <UserProfile />
                </>
            ) : (
                <Navigate to="/login" />
            )
          } />
          <Route path="/passwordEdit/:userId" element={
            isAuthenticated ? (
                <>
                  <Header onSearchSubmit={onSearchSubmit} />
                  <UserEditPassword />
                </>
            ) : (
                <Navigate to="/login" />
            )
          }
          />
          <Route path="/profileEdit/:userId" element={
            isAuthenticated ? (
                <>
                  <Header onSearchSubmit={onSearchSubmit} />
                  <UserEditProfile />
                </>
            ) : (
                <Navigate to="/login" />
            )
          }
          />
          {redirectToPreferences && <Navigate to="/preferences" />}
          <Route path="/preferences" element={<CategorySelection onCategoriesSelected={setSelectedCategories} />} />
          <Route path="explore" element={<ExplorePage onCategoriesSelected={handleExploreCategoriesSelected} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;