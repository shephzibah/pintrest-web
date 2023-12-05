// PinCard.js
import React from 'react';

const PinCard = ({ pin }) => {
  return (
    <div className="pin-card">
      <img src={pin.imageUrl} alt={pin.altDescription} />
    </div>
  );
};

export default PinCard;
