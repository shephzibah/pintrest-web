// ManageUsers.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Menu, MenuItem, Paper } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { green } from '@material-ui/core/colors';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    noShadow: {
      boxShadow: 'none' 
    },
    subtleShadow: {
        boxShadow: '0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)'
      },
  }));

const ManageUsers = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/datasets/manage-users.json');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteUser = (userId) => {
        // Implement delete functionality here
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email Address</TableCell>
                        <TableCell>Last Sign-in</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{new Date(user.lastSignIn).toLocaleString()}</TableCell>
                            <CenteredTableCell>
                                <StatusIndicator status={user.status} />
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
                                    <MenuItem onClick={() => handleDeleteUser(user.id)}>Delete User</MenuItem>
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
    const color = status === 'Enabled' ? green[500] : 'rgba(0, 0, 0, 0.54)';
    return <StatusCircle style={{ backgroundColor: color }} />;
};

const StatusCircle = styled.span`
    height: 15px;
    width: 15px;
    background-color: ${props => props.color};
    border-radius: 50%;
    display: inline-block;
  `;

const CenteredTableCell = styled(TableCell)`
    text-align: center !important;
    vertical-align: middle !important;
`;

export default ManageUsers;
