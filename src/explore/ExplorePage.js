// ExplorePage.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ExplorePage.css'; // Make sure to import your CSS file

const ExplorePage = ({ onCategoriesSelected }) => {
  const navigate = useNavigate();

  // Sample local image data
  const localImages = [
    { id: 1, imageUrl: '/images/fashion.jpg', title: 'Fashion' },
    { id: 2, imageUrl: '/images/technology.jpg', title: 'Technology' },
    { id: 3, imageUrl: '/images/fitness.jpg', title: 'Fitness' },
    { id: 4, imageUrl: '/images/food.jpg', title: 'Food' },
    { id: 5, imageUrl: '/images/animals.jpg', title: 'Animals' },
    // Add more local images as needed
  ];

  const handleCardClick = (category) => {
    onCategoriesSelected([category]);
    navigate(`/explore/${category.toLowerCase()}`);
  };

  return (
    <div className="explore-page">
      <h1 className="explore-heading">Explore</h1>
      <div className="grid-container">
        {localImages.map((image) => (
          <div key={image.id} className="card" onClick={() => handleCardClick(image.title)}>
            {/* Set a fixed height for the card view */}
            <div className="card-content" style={{ height: '200px' }}>
              {/* Apply styles to make images responsive */}
              <img src={image.imageUrl} alt={image.title} style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div className="card-footer">
              <h2>{image.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
