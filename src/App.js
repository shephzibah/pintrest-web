// App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from 'react-router-dom';
import NavBar from './HomeNavigation/NavBar';
import Login from './Login/login';
import UserProfile from './UserProfile/userprofile';
import Registration from './Registration/registration';
import Header from './components/Header';
import Mainboard from './components/Mainboard';
import CategorySelection from './preferences/CategorySelection';
import ExplorePage from './explore/ExplorePage';
import UserEditProfile from './UserProfile/userEditProfile';
import UserEditPassword from './UserProfile/userEditPassword';

// Import the PinDetail component and styles
import PinDetail from './details/Details';
import {
  Wrapper,
  ImageContainer,
  ImageCard,
  ContentContainer,
  DummyText,
  UserContainer,
  UserImagePlaceholder,
  UserInfo,
  UserName,
  CommentList,
  CommentItem,
  AddCommentForm,
  ButtonContainer,
  Button,
} from './details/detailsStyles';

import * as client from './components/client';
import { createToken } from './authReducer';

import './App.css';

function App() {
  const dispatch = useDispatch();
  let isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);

  // Check if the user is authenticated and has a token in local storage
  if (localStorage.getItem('authToken')) {
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
    const getNewPins = async () => {
      let promises = [];
      let pinData = [];

      try {
        const response = await client.getAllPosts();
        let posts = response.data;
        for (let index = 0; index < posts.length; index++) {
          let post = posts[index];
          posts[index] = {
            ...post,
            regular: post.docId,
          };
        }

        pinData = posts;

        const allCategories = [...selectedCategories, 'coding', 'makeup', 'street', category].filter(Boolean);

        allCategories.forEach((pinTerm) => {
          promises.push(
            client.getCategoryImages(pinTerm).then((res) => {
              res.forEach((result, index) => {});
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
        console.error('Error fetching posts:', error);
      }
    };

    getNewPins();
  }, [selectedCategories, category]);

  const handleExploreCategoriesSelected = (categories) => {
    console.log('Selected categories from ExplorePage:', categories);
    setSelectedCategories(categories);
    setNewPins([...categories, 'coding', 'makeup', 'street']);
  };

  const handleCategoriesSelected = (categories) => {
    console.log('Selected categories:', categories);
    setSelectedCategories(categories);
    setNewPins([...categories, 'coding', 'makeup', 'street']);
  };

  useEffect(() => {
    handleCategoriesSelected(selectedCategories);
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="app" style={{ minHeight: '100vh' }}>
        <Routes>
          {/* Add a Route for the default route (/) to redirect to login */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/mainboard" />
              ) : (
                <>
                  <NavBar />
                  <div className="overlay-text">Login to create pins</div>
                  <Login />
                </>
              )
            }
          />
          <Route
            path="/login"
            element={
              <>
                <NavBar />
                <div className="overlay-text">Login to create pins</div>
                <Login />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <NavBar />
                <div className="overlay-text">Sign up to get your ideas</div>
                <Registration />
              </>
            }
          />
          <Route
            path="/mainboard"
            element={
                <>
                    <Header onSearchSubmit={onSearchSubmit} />
                    <Mainboard pins={pins} />
                </>
            }
          />
          <Route
            path="/profile"
            element={
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
            }
          />
          <Route path="/passwordEdit/:userId"
                element={
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
          <Route
            path="/profileEdit/:userId"
            element={
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
          <Route path="/explore" element={<ExplorePage onCategoriesSelected={handleExploreCategoriesSelected} />} />
          {/* Include the Header component with search functionality */}
          <Route path="/details" element={<PinDetail onSearchSubmit={onSearchSubmit} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
