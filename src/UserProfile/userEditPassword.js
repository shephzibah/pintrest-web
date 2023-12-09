import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import * as client from "./client";
import {toast, ToastContainer} from "react-toastify";

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
        <div className="editProfileContainer">
            <div className="editProfileContent">
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="grid-35">
                            <label>Old password</label>
                        </div>
                        <div className="grid-65">
                            <input type="password" placeholder="Enter old password"
                                   onChange={(e) => setPassword({...password, oldPassword: e.target.value})} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="grid-35">
                            <label>New password</label>
                        </div>
                        <div className="grid-65">
                            <input type="password" placeholder="Enter new password"
                                   onChange={(e) => setPassword({...password, newPassword: e.target.value})} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <Link to="/profile">
                            <input type="button" className="btn cancelBtn" value="Cancel"/>
                        </Link>
                        <input type="submit" className="btn editBtn" value="Edit password"/>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default UserEditPassword;