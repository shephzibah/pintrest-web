//UserPins.js
import styled from 'styled-components';

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
`;

const UserPins = ({ posts }) => {
  return (
    <MasonryLayout>
      {posts.map((post) => (
        <PinItem key={post.id}>
          <Image src={post.image} alt={post.title} />
        </PinItem>
      ))}
    </MasonryLayout>
  );
};

export default UserPins;