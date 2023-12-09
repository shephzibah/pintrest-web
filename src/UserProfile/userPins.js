//UserPins.js
import styled from 'styled-components';
import {Navigate, useNavigate} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

const MasonryLayout = styled.div`
  column-count: 4;
  column-gap: 1rem;
`;

const PinItem = styled.div`
  break-inside: avoid;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px;
  margin-top: 1rem;
  cursor: pointer;
`;

const UserPins = ({ posts }) => {
  const navigate = useNavigate();
  let isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);

  const handlePinClick = (docId, id, userId) => {
    isAuthenticated ? (
        navigate(`/details?docId=${docId}&postId=${id}&postUserId=${userId}`)
    ) : (
        <Navigate to="/login" />
    )
  };

  return (
    <MasonryLayout>
      {posts.map((post) => (
        <PinItem key={post.id} onClick={() => { handlePinClick(post.docId, post.id, post.userId) }}>
          <Image src={post.docId} alt={post.title} />
        </PinItem>
      ))}
    </MasonryLayout>
  );
};

export default UserPins;