import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import * as client from "./client";
import styled from 'styled-components';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function UserEditPassword() {
    const {userId} = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await client.updatePassword(userId, password);
            navigate("/profile");
        } catch (error) {
            console.log(error.message)
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    return (
        <EditProfileContainer>
            <EditProfileContent>
                <ToastContainer />
                <Form onSubmit={handleSubmit}>
                    <FieldSet>
                        <Label>Old password</Label>
                        <Input type="password" placeholder="Enter old password"
                            onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })} />
                    </FieldSet>
                    <FieldSet>
                        <Label>New password</Label>
                        <Input type="password" placeholder="Enter new password"
                            onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} />
                    </FieldSet>
                    <FieldSet>
                        <ButtonContainer>
                            <Link to="/profile">
                                <CancelButton type="button" value="Cancel" />
                            </Link>
                            <EditButton type="submit" value="Edit password" />
                        </ButtonContainer>
                    </FieldSet>
                </Form>
            </EditProfileContent>
        </EditProfileContainer>

    );
}

// Styled components
const EditProfileContainer = styled.div`
                display: flex;
                justify-content: center;
                padding: 50px;
                background-color: #fff; 
                `;

const ButtonContainer = styled.div`
                display: flex;
                justify-content: center; 
                gap: 10px; 
                `;


const EditProfileContent = styled.div`
                width: 100%;
                max-width: 400px;
                background: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                `;

const Form = styled.form`
                display: flex;
                flex-direction: column;
                `;

const FieldSet = styled.fieldset`
                border: none;
                margin-bottom: 20px;
                `;

const Label = styled.label`
                font-weight: bold;
                color: #333;
                padding: 10px;
              `;

const Input = styled.input`
                padding: 10px;
                border-radius: 5px;
                border: 1px solid #ddd; 
                margin: 10px 0;
                &:focus {
                    outline: none;
                border-color: #e60023; 
                }
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

const CancelButton = styled(Button)`
                background-color: #efefef;
                color: #333;
                `;

const EditButton = styled(Button)`
                background-color: #e60023;
                color: #fff;
                `;

export default UserEditPassword;