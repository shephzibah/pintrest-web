// UserProfile.js
import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UserPins from './userPins'
import * as client from "./client";
import {Link} from "react-router-dom";

function UserProfile() {
  const [userData, setUserData] = useState({});
  const [createdPosts, setCreatedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const userId = 1;

  useEffect(async () => {
    const profile = await client.profile(userId);
    const createdPosts = await client.postsCreatedByUser(userId);
    const savedPosts = await client.postsSavedByUser(userId);
    setUserData(profile);
    setCreatedPosts(createdPosts);
    setSavedPosts(savedPosts);
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <AvatarContainer>
        <StyledAvatar src={userData.profilePicture} />
        <UserName>{userData.firstName + ' ' + userData.lastName}</UserName>
        <FollowInfo>
          <span>{userData.followers} Followers</span>
          <span>{userData.following} Following</span>
        </FollowInfo>
        <ButtonContainer>
          <StyledButton variant="outlined" color="primary">
            <Link to={`/passwordEdit/${userId}`} style={{textDecoration: "none", color: "inherit"}}>
              Update password
            </Link>
          </StyledButton>
          <StyledButton variant="outlined" color="primary">
            <Link to={`/profileEdit/${userId}`} style={{textDecoration: "none", color: "inherit"}}>
              Edit Profile
            </Link>
          </StyledButton>
        </ButtonContainer>
      </AvatarContainer>
      <TabsContainer>
        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
          <TabList>
            <Tab>Created</Tab>
            <Tab>Saved</Tab>
          </TabList>
          <TabPanel>
            <UserPins posts={createdPosts} />
          </TabPanel>
          <TabPanel>
            <UserPins posts={savedPosts} />
          </TabPanel>
        </Tabs>
      </TabsContainer>
    </ProfileContainer>
  );
}

// Styled Components

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  
  gap: 10px;
  margin-bottom: 20px;

  .MuiButton-outlinedPrimary {
    border-color: #e60023;
    color: #e60023;
  }
`;

const StyledAvatar = styled(Avatar)`
  width: 180px; 
  height: 180px;
  margin-top: 20px;
  border: 2px solid white; 
`;

const UserName = styled.h2`
  font-weight: bold;
  font-size: 24px; 
  margin-top: 20px;
  margin-bottom: 10px;
  color: black; 
`;

const FollowInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 16px; 
  color: grey; 
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  && {
    margin: 5px;
    border-radius: 24px;
    border: 1px solid #efefef; 
    color: black; 
    font-weight: bold;
    background-color: #efefef; 
  }
`;

const TabsContainer = styled.div`
  width: 100%;
  
  .react-tabs__tab-list {
    border-bottom: 1px solid #e60023;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  .react-tabs__tab {
    list-style: none;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: bold;
    user-select: none;
    color: #555;

    &--selected {
      border: none;
      border-bottom: 2px solid #e60023;
      color: #e60023;
    }
  }

  .react-tabs__tab-panel {
    display: none;
    &--selected {
      display: block;
    }
  }
`;



export default UserProfile;
