// SelectedOptions.js
import React from 'react';

const SelectedOptions = () => {
  // Access the selected topics from the state, or you can use any other method to fetch or pass data
  const selectedTopics = ["Fashion", "Food"]; // Replace this with your actual selected topics

  return (
    <div>
      <h2>Selected Options</h2>
      <ul>
        {selectedTopics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedOptions;
