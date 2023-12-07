import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as client from "./client";

import "./userEditProfile.css";

function UserEditProfile() {
    const [userData, setUserData] = useState({})
    const {userId} = useParams();
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
        <div className="editProfileContainer">
            <div className="editProfileContent">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="grid-35">
                            <label>FirstName</label>
                        </div>
                        <div className="grid-65">
                            <input type="text" placeholder="Enter first name"
                                   value={userData.firstName}
                                   onChange={(e) => setUserData({...userData, firstName: e.target.value})} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="grid-35">
                            <label>LastName</label>
                        </div>
                        <div className="grid-65">
                            <input type="text" placeholder="Enter last name"
                                value={userData.lastName}
                                onChange={(e) => setUserData({...userData, lastName: e.target.value})}/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="grid-35">
                            <label>Email</label>
                        </div>
                        <div className="grid-65">
                            <input type="text" placeholder="Enter email"
                            value={userData.email} disabled />
                        </div>
                    </fieldset>
                    <fieldset>
                        <Link to="/profile">
                            <input type="button" className="btn cancelBtn" value="Cancel"/>
                        </Link>
                        <input type="submit" className="btn editBtn" value="Edit profile"/>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default UserEditProfile;