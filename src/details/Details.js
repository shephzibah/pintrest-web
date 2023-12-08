// Details.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Wrapper,
  ImageContainer,
  ImageCard,
  ContentContainer,
  DummyText,
  UserContainer,
  UserImagePlaceholder,
  UserInfo,
  UserName,
  CommentList,
  CommentItem as StyledCommentItem, // Rename to avoid conflict with CommentItem variable
  AddCommentForm,
  ButtonContainer,
  Button,
  CommentUserImage, // Import CommentUserImage from detailsStyles.js
} from './detailsStyles.js';
import Header from '../components/Header'; // Import the Header component

function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const imageUrl = decodeURIComponent(new URLSearchParams(location.search).get('imageUrl'));
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Add logic to save the comment
    if (comment.trim() !== '') {
      // You can replace the user icon with the actual user profile image
      const userIcon = <CommentUserImage />;

      setComments([...comments, { userIcon, text: comment }]);
      setComment('');
    }
  };

  const handleDownloadClick = () => {
    // Open the image URL in a new tab
    window.open(imageUrl, '_blank');
  };

  const handleSavePinClick = () => {
    // Log the URL of the image
    console.log('Image URL:', imageUrl);
    // Add logic to save the pin
    console.log('Saving Pin...');
  };

  return (
    <>
      <Header onSearchSubmit={(term) => navigate(`/mainboard?q=${term}`)} /> {/* Header with search functionality */}

      <Wrapper>
        <ImageContainer>
          <ImageCard>
            <img src={imageUrl} alt="pin" />
          </ImageCard>
          <ButtonContainer>
            <Button onClick={handleSavePinClick}>Save Pin</Button>
            <Button onClick={handleDownloadClick}>Download Pin</Button>
          </ButtonContainer>
        </ImageContainer>
        <ContentContainer>
          <DummyText>About the Pin: This is a dummy text describing the pin.</DummyText>
          <UserContainer>
            <UserImagePlaceholder />
            <UserInfo>
              {/* Display user information here */}
              <UserName>User Name</UserName>
            </UserInfo>
          </UserContainer>
          <CommentList>
        {comments.map((c, index) => (
          <StyledCommentItem key={index}>
            {c.userIcon}
            <span>{c.text}</span>
          </StyledCommentItem>
        ))}
      </CommentList>
          <AddCommentForm onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Add a comment..."
              value={comment}
              onChange={handleCommentChange}
            />
            <button type="submit">Add Comment</button>
          </AddCommentForm>
        </ContentContainer>
      </Wrapper>
    </>
  );
}

export default Details;
