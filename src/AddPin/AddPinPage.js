import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect } from 'react';

import * as PinClient from './client';
import * as UserClient from '../UserProfile/client';

import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';

const AddPinPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // updating the current user
  const [currentUserId, setCurrentUserId] = useState(1);
  const [userData, setUserData] = useState({});

  // getting the auth token
  const authToken = useSelector((state) => state.authReducer.token);

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    // Handle image upload logic as needed
    setImage(selectedImage);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // setting current user id
  useEffect(async () => {
    let { id } = await jwtDecode(authToken);
    setCurrentUserId(id);

    // setting the current user profile
    const profile = await UserClient.profile(id);
    setUserData(profile);
  }
    , [])


  // Function to handle pin submission
  const handlePinSubmit = async (e) => {
    // Handle pin submission logic using the entered data
    e.preventDefault();

    if (!title.trim() || !image) {
      alert("Please provide a title and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);

    try {
      await PinClient.uploadImage(currentUserId, formData);
      navigate('/mainboard');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    // Redirect to mainboard after submitting
    navigate('/mainboard');
  };

  return (
    <Wrapper>
      <Card>
        <CloseButton onClick={handleCancel}>
          <CloseIcon />
        </CloseButton>
        <ImageUploadSection>

          <ImagePreview>
            <UploadIcon>
              <PhotoCameraIcon />
            </UploadIcon>
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Uploaded" />
            ) : (
              <PlaceholderText>No Image Selected</PlaceholderText>
            )}
          </ImagePreview>
          <ImageUploadInput
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </ImageUploadSection>

        {/* Text Entry Fields Section */}
        <TextEntrySection>
          <InputField
            type="text"
            placeholder="Add your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* Display user profile icon and username (you can replace this with actual user data) */}
          <UserInfo>
            {userData.profilePicture ?
              <ProfileIcon src={userData.profilePicture} alt="Profile" /> :
              <ProfileIcon as="span">👤</ProfileIcon> // Fallback to default icon
            }
            <UserName>{userData.firstName} {userData.lastName}</UserName>
          </UserInfo>
          <Textarea
            placeholder="Tell about the pin..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* Dropdown for category */}
          <CategoryDropdown
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Choose category
            </option>
            <option value="Fashion">Fashion</option>
            <option value="Food">Food</option>
            <option value="Technology">Technology</option>
            <option value="Animals">Animals</option>
            <option value="Fitness">Fitness</option>
          </CategoryDropdown>
        </TextEntrySection>

        {/* Submit Button */}
        <SubmitButton onClick={handlePinSubmit}>Submit Pin</SubmitButton>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  width: 80%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ImageUploadSection = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const ImagePreview = styled.div`
  height: 200px;
  margin-bottom: 10px;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 5px;

  img {
    width: auto;
    height: 100%;
    object-fit: contain;
  }
`;

const ImageUploadInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const UploadIcon = styled(IconButton)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PlaceholderText = styled.p`
  text-align: center;
`;

const TextEntrySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled.img`
  width: 24px; // Adjust size as needed
  height: 24px; // Adjust size as needed
  border-radius: 50%; // Make it circular
  object-fit: cover; // Ensure the image covers the area
  margin-right: 10px;
`;

const UserName = styled.span`
  font-weight: bold;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CategoryDropdown = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background-color: #e60023;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover,
  &:active {
  background: #AE0101;
  color: white; 
}
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px; 
  color: #555;
  font-weight: bold;
`;

export default AddPinPage;
