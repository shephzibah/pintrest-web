import React, { useState } from 'react';
import styled from 'styled-components';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import SettingsIcon from '@material-ui/icons/Settings';
import ManageUsers from './ManageUsers';
import ManagePosts from './ManagePosts';
import { Paper } from '@material-ui/core';
import {useNavigate} from "react-router-dom";
import {Description} from "@material-ui/icons";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('users');

    return (
        <DashboardContainer>
            <Sidebar>
                <SidebarHeader>
                    <SettingsIcon /> Admin Console
                </SidebarHeader>
                <NavItem
                    onClick={() => setActiveTab('users')}
                    active={activeTab === 'users'}>
                    <PeopleIcon /> Manage Users
                </NavItem>
                <NavItem
                    onClick={() => setActiveTab('posts')}
                    active={activeTab === 'posts'}>
                    <DescriptionIcon /> Manage Posts
                </NavItem>
                <NavItem onClick={() => navigate('/profile')}>
                    <DescriptionIcon /> Go back
                </NavItem>
            </Sidebar>
            <MainContent>
                {activeTab === 'users' && <ManageUsers />}
                {activeTab === 'posts' && <ManagePosts />}
            </MainContent>
        </DashboardContainer>
    );
};

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 20px;
  font-size: 1.2em;
  font-weight: bold;
  background-color: #fff;
  color: #DA0101;
  svg {
    margin-right: 10px; // adds spacing between the icon and text
  }
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  overflow: hidden;
`;

const Sidebar = styled(Paper)`
  width: 240px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  width: 100% !important; 
  height: 2.5rem;
  padding: 10px 25px;
  cursor: pointer;
  color: ${(props) => (props.active ? '#DA0101' : '#555')}; // Using Pinterest's red for active tab
  background-color: ${(props) => (props.active ? '#fff' : 'transparent')};

  &:hover {
    background-color: #cc0d00;
    width: 80% !important; 
    color: white;
  }

  svg {
    margin-right: 3px;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 15px;
  background: #AB010121;
`;

export default AdminDashboard;
