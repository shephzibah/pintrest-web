import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import Mainboard from './components/Mainboard';

function App() {
  const [pins, setNewPins] = useState([]);
  const getImages = (term) => {
    return axios.get("https://api.unsplash.com//search/photos", {
      params: { query: term },
      headers: {
        Authorization: "Client-ID Y2PGTILvwArhMr02w2yhJges8GixRuM4bs5_hyhtYAw",
      },
    });
  };

  const onSearchSubmit = (term) => {
    getImages(term).then((res) => {
      let results = res.data.results;
      let newPins = [
        ...pins,
        ...results,
      ];
      newPins.sort(function (a, b) {
        return 0.5 - Math.random();
      });
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
        { urls: { regular: process.env.PUBLIC_URL + '/images/carrot.jpg'  } },
        { urls: { regular: process.env.PUBLIC_URL + '/images/carrotv3.jpg' } },
        { urls: { regular: process.env.PUBLIC_URL + '/images/carrotv4.jpg'  } },
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
    <div className="app">
      <Header onSubmit={onSearchSubmit} />
      <Mainboard pins={pins} />
    </div>
  );
}

export default App;
