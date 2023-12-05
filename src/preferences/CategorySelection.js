import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CategorySelection.css';

const CategorySelection = ({ onCategoriesSelected }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleOKClick = () => {
    // Perform any necessary actions with the selected categories
    // For example, store them in the state or navigate to /mainboard
    console.log('Selected Categories:', selectedCategories);

    // Pass the selected categories to the parent component
    onCategoriesSelected(selectedCategories);

    // Navigate to /mainboard
    navigate('/mainboard');
  };

  const categories = ['fashion', 'technology', 'food', 'fitness', 'animals'];

  return (
    <div className="category-selection">
      <h2>Select up to 3 categories:</h2>
      <div className="category-options">
        {categories.map((category) => (
          <div
            key={category}
            className={`category-option ${selectedCategories.includes(category) ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <button onClick={handleOKClick}>OK</button>
    </div>
  );
};

export default CategorySelection;
