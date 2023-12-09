import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell,TableContainer, TableHead, TableRow, IconButton, Paper,  Menu, MenuItem } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import { yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components';

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
          const response = await fetch('/datasets/manage-posts.json'); 
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      };
  
      fetchPosts();
    }, []);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDeletePost = (postId) => {
        // Implement delete functionality here
    };

    return (
        <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Email Id</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Date Posted</TableCell>
                                    <TableCell>Community Guidlines</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell>{post.emailId}</TableCell>
                                        <TableCell>{post.title}</TableCell>
                                        <TableCell>{post.category}</TableCell>
                                        <TableCell>{new Date(post.datePosted).toLocaleString()}</TableCell>
                                        <CenteredTableCell>
                                            <StatusIndicator status={post.postStatus} />
                                        </CenteredTableCell>
                            <TableCell>
                                <IconButton aria-label="actions" onClick={handleMenuClick}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    classes={{ paper: classes.subtleShadow }}>
                                    <MenuItem onClick={() => handleDeletePost(post.id)}>Delete Post</MenuItem>
                                </Menu>
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