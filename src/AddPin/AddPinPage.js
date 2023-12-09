import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CloseIcon from '@material-ui/icons/Close';

const AddPinPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    // Handle image upload logic as needed
    setImage(selectedImage);
  };

  const handleCancel = () => {
    navigate(-1);
  };


  // Function to handle pin submission
  const handlePinSubmit = () => {
    // Handle pin submission logic using the entered data
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Category:', category);
    console.log('Image:', image);
    // Additional logic for submitting the pin to the server

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
            <ProfileIcon>👤</ProfileIcon>
            <UserName>John Doe</UserName>
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

const ProfileIcon = styled(IconButton)`
  font-size: 24px;
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
