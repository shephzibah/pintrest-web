import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {  Navigate } from 'react-router-dom';
import {useSelector } from 'react-redux';
function Pin({ urls }) {
  const navigate = useNavigate();
  let isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);

  const handlePinClick = () => {
    // Redirect to the "details" page with the image URL as a query parameter
    
    isAuthenticated ? (
      navigate(`/details?imageUrl=${urls?.regular}`)
    ) : (
      <Navigate to="/login" />
    )
  };

  return (
    <Wrapper onClick={handlePinClick}>
      <Container>
        <img src={urls?.regular} alt="pin" />
      </Container>
    </Wrapper>
  );
}

export default Pin;

const Wrapper = styled.div`
  display: inline-flex;
  padding: 8px;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  width: 236px;

  img {
    display: flex;
    width: 100%;
    cursor: zoom-in;
    border-radius: 16px;
    object-fit: cover;
  }
`;
