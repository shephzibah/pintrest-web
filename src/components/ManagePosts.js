import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell,TableContainer, TableHead, TableRow, IconButton, Paper,  Menu, MenuItem } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import { yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components';

import * as AdminClient from "./client";

const useStyles = makeStyles((theme) => ({
    noShadow: {
      boxShadow: 'none' 
    },
    subtleShadow: {
        boxShadow: '0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)'
      },
  }));

const ManagePosts = () => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await AdminClient.getAllPostsAdmin();
          const data = await response.posts;
          setPosts(data);
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      };
  
      fetchPosts();
    }, []);

    const handleDeletePost = async (postId) => {
        await AdminClient.deletePost(postId);
        window.location.reload();
    };

    return (
        <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User Name</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell>{post.user.firstName + ' ' + post.user.lastName}</TableCell>
                                        <TableCell>{post.imageUpload.title}</TableCell>
                                        <TableCell>{post.imageUpload.description}</TableCell>
                            <TableCell>
                                <button onClick={() => handleDeletePost(post.id)}>
                                    Delete Post
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const StatusIndicator = ({ status }) => {
    let color;
    switch (status) {
        case 'Approved':
            color = green[500];
            break;
        case 'Pending':
            color = yellow[500];
            break;
        default:
            color = red[500];
    }
    return <StatusCircle style={{ backgroundColor: color }} />;
};

const StatusCircle = styled.span`
    height: 15px;
    width: 15px;
    background-color: ${props => props.color};
    border-radius: 50%;
    display: inline-block;
    margin: auto; // Center align in the TableCell
`;


const CenteredTableCell = styled(TableCell)`
    text-align: center !important;
    vertical-align: middle !important;
`;

export default ManagePosts;