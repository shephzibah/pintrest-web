import React, { useState, useEffect } from 'react';
import './userprofile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/datasets/user_data.json')
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.profilePicture} alt={`${user.name}'s profile`} className="profile-picture" />
        <h2>{user.name}</h2>
      </div>
      <div className="user-posts">
        {user.posts.map((post) => (
          <div key={post.id} className="post">
            <img src={post.image} alt={post.title} />
            <p>{post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
