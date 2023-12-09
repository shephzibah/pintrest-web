// UserDataProvider.js
import React, { createContext, useState, useEffect } from 'react';

export const UserDataContext = createContext(null);

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulate fetching data from a local JSON file
    const fetchData = async () => {
      const response = await fetch('/path/to/userData.json'); // replace with the correct path to your JSON file
      const data = await response.json();
      setUserData(data);
    };

    fetchData();
  }, []);

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};
