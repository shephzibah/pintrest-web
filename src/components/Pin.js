import React, { useState } from 'react';
import styled from 'styled-components';

function Pin({ urls, onClick, onDownload, onSaveToBoard }) {
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleMouseEnter = () => {
    setOptionsVisible(true);
  };

  const handleMouseLeave = () => {
    setOptionsVisible(false);
  };

  return (
    <Wrapper onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Container>
        <img src={urls?.regular} alt="pin" />
        {optionsVisible && (
          <ButtonWrapper>
            <Button onClick={(e) => onDownload(e, urls?.regular)}>Download</Button>
            <Button onClick={(e) => onSaveToBoard(e, urls?.regular)}>Save</Button>
          </ButtonWrapper>
        )}
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

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0 0 16px 0;
`;

const Button = styled.button`
  margin-bottom: 8px;
  padding: 4px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;
