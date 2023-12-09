// detailsStyles.js
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  max-width: 800px; /* Set your desired fixed card width */
  margin: 0 auto; /* Center the card */
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const ImageCard = styled.div`
  width: 100%;
  height: 400px; /* Set your desired fixed card height */
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  margin-left: 20px;
`;

export const DummyText = styled.p`
  margin-bottom: 20px;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const UserImagePlaceholder = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ddd;
  border-radius: 50%;
  margin-right: 10px;
  /* Add a background image for the user icon */
  background-image: url('path/to/user-icon.png');
  background-size: cover;
`;

export const UserInfo = styled.div`
  /* Style user information here */
`;

export const UserName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const CommentItem = styled.li`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  /* Add a margin and display:flex for better alignment */
  margin-left: 50px; /* Adjust as needed */
  display: flex;
  align-items: center;
`;

export const CommentUserImage = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ddd;
  border-radius: 50%;
  margin-right: 10px;
  /* Add a background image for the user icon */
  background-image: url('path/to/user-icon.png');
  background-size: cover;
`;

export const CommentText = styled.span`
  /* Add styles for comment text */
`;

export const AddCommentForm = styled.form`
  display: flex;
  flex-direction: column;

  textarea {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: vertical;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #45a049;
    }
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  flex-direction: row; /* Adjusted to row for side-by-side buttons */
`;

export const Button = styled.button`
  background-color: #e74c3c;
  color: white;
  padding: 10px;
  margin-right: 10px; /* Added margin between buttons */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;
