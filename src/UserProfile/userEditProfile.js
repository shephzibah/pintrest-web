
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as client from './client';

function UserEditProfile() {
    const [userData, setUserData] = useState({})
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
        const response = await client.profile(userId);
        setUserData(response)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await client.updateProfile(userId, userData);
        navigate("/profile");
    }

    return (
        <Container>
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        type="text"
                        placeholder="Enter first name"
                        value={userData.firstName}
                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    />

                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        type="text"
                        placeholder="Enter last name"
                        value={userData.lastName}
                        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    />

                    <Label htmlFor="email">Email</Label>
                    <Email
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={userData.email}
                        disabled
                    />
                    <FieldSet>
                        <ButtonContainer>
                            <Link to="/profile">
                                <CancelButton type="button" value="Cancel" />
                            </Link>
                            <EditButton type="submit" value="Edit profile" />
                        </ButtonContainer>
                    </FieldSet>
                </Form>
            </Card>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #efefef;
`;

const Card = styled.div`
  width: 300px;
  padding: 20px;
  background: #fff; 
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FieldSet = styled.fieldset`
    border: none;
    margin-bottom: 20px;
`;

const Button = styled.input`
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                margin-right: 10px;
                cursor: pointer;
                font-weight: bold;
                &:hover {
                    opacity: 0.9;
  }
                `;

const ButtonContainer = styled.div`
                display: flex;
                justify-content: center; 
                gap: 10px; 
                `;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #e60023 !important; 
  border-radius: 10px !important;
  margin: 2px 0;
`;

const Email = styled.input`
  padding: 10px !important;
  border: 2px solid grey !important; 
  border-radius: 10px !important;

  &::placeholder {
    text-align: start !important;
  }
  &:focus::placeholder {
    text-align: start !important;
  }
`;

const CancelButton = styled(Button)`
                background-color: #efefef;
                color: #333;
                `;

const EditButton = styled(Button)`
                background-color: #e60023;
                color: #fff;
                `;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;


export default UserEditProfile;