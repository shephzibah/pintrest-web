// PinDetail.js
import React from 'react';

const PinDetail = ({ match, pins }) => {
  const pinId = match.params.id;

  // Find the pin details based on the pinId
  const pinDetails = pins.find((pin) => pin.id.toString() === pinId);

  if (!pinDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{pinDetails.alt_description}</h2>
      <img src={pinDetails.urls.full} alt={pinDetails.alt_description} />
      {/* Add other details you want to display */}
    </div>
  );
};

export default PinDetail;
