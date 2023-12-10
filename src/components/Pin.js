import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as client from './client';

function Pin({ urls }) {
  const navigate = useNavigate();
  let isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);

  const handlePinClick = async () => {

    if (!urls.docId) {
      urls = await client.imageUploadUnsplash({ docId: urls.regular });
    }

    (isAuthenticated && urls.regular) ? (
      navigate(`/details?docId=${urls?.regular}&postId=${urls.id}&postUserId=${urls.userId}`)
    ) : (
      navigate("/login")
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
    cursor: pointer;
    border-radius: 16px;
    object-fit: cover;
  }
`;
