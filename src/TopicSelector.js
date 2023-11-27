import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TopicSelector.css'; // Import your stylesheet for styling

const topics = ['Fashion', 'Food', 'Fitness', 'Technology', 'Pets'];

const TopicSelector = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [showSelectedTopics, setShowSelectedTopics] = useState(false);

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((selectedTopic) => selectedTopic !== topic));
    } else if (selectedTopics.length < 3) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleOkClick = () => {
    // Show selected topics when OK button is clicked
    setShowSelectedTopics(true);
  };

  return (
    <div className="topic-selector">
      <h2>Select up to three topics:</h2>
      <div className="topic-buttons">
        {topics.map((topic) => (
          <button
            key={topic}
            className={`topic-button ${selectedTopics.includes(topic) ? 'selected' : ''}`}
            onClick={() => toggleTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      {selectedTopics.length > 0 && selectedTopics.length <= 3 && (
        <button className="ok-button" onClick={handleOkClick}>
          OK
        </button>
      )}
      {showSelectedTopics && selectedTopics.length > 0 && (
        <div className="selected-topics">
          <h3>Selected Topics:</h3>
          <ul>
            {selectedTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopicSelector;
