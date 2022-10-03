import React, { useState, useEffect } from "react";

import { Container, CardActions, TextField } from "@mui/material";

import { SecondaryButton, PrimaryTypography, SecondaryTypography, Loader } from "../../components";
import { getAuthUser, logout } from "../../apis";
import { removeToken } from "../../helper";
import "./style.scss";

const Profile = (props) => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        imageUrl: '',
    })
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(false);
    const { history } = props;

    const handleEdit = () => {
        setEditable(true);
    };

    const handleCancel = () => {
        setEditable(false);
    };

    const handleSubmit = () => {
        console.log("submit");
    };

    const getProfile = async () => {
        try {
            setLoading(true)
            const response = await getAuthUser();
            if (response.data.status === 200) {
                setLoading(false);
                setProfile({ email: response.data.data.email, name: response.data.data.name, imageUrl: response.data.data.imageUrl })
            } else {
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
        }
    };

    const handleLogout = async () => {
        try {
            const response = await logout()
            if (response.data.status === 200) {
                removeToken();
                history.push("/login")
            } else {
                alert("logout failed")
            }
        } catch (err) {
            alert("Logout failed");
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    const RenderProfileData = () => {
        return (
            <React.Fragment>
                <PrimaryTypography value={profile.name} />
                <SecondaryTypography value={profile.email} />
                <CardActions>
                    <SecondaryButton label="EDIT" onClick={handleEdit} isDisabled={false} />
                    <SecondaryButton label="LOGOUT" onClick={handleLogout} isDisabled={false} />
                </CardActions>
            </React.Fragment>
        )
    }

    const RenderEditMode = () => {
        return (
            <React.Fragment>
                <TextField defaultValue={profile.name} />
                <TextField defaultValue={profile.email} />
                <CardActions>
                    <SecondaryButton label="CANCEL" onClick={handleCancel} isDisabled={false} />
                    <SecondaryButton label="SUBMIT" onClick={handleSubmit} isDisabled={false} />
                </CardActions>
            </React.Fragment>
        )
    }

    return (
        loading ? (
            <Loader />
        ) : (
            <Container className="container" sx={{ display: "flex" }}>
                <img
                    className="images"
                    src={profile.imageUrl || "/images/default-profile.jpeg"}
                    alt={`${profile.name}-profile`}
                />

                {editable ? <RenderEditMode /> : <RenderProfileData />}
            </Container >
        )
    )
}

export default Profile;
