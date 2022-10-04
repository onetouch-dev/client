import React, { useState, useEffect } from "react";

import { Container, CardActions, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import { SecondaryButton, PrimaryTypography, SecondaryTypography, Loader, SecondaryTextfield, PublicFormHoc } from "../../components";
import { getAuthUser, logout, updateProfile } from "../../apis";
import { removeToken } from "../../helper";
import "./style.scss";

const Profile = (props) => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        imageUrl: '',
    });
    const [editState, setEditState] = useState(profile);
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(false);
    const { history } = props;

    const handleEdit = () => {
        setEditable(true);
    };

    const handleCancel = () => {
        setEditable(false);
        setEditState(profile);
    };

    const handleOnChange = (e, field) => {
        setEditState({ ...editState, [field]: e.target.value })
    };

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await updateProfile(editState);
            if (response.data.status === 200) {
                setEditable(false);
                setLoading(false);
                setProfile(editState);
            } else {
                setLoading(false)
            }
        } catch (err) {
            alert(err.meesage || "Bad request")
        }
    };

    const getProfile = async () => {
        try {
            setLoading(true)
            const response = await getAuthUser();
            if (response.data.status === 200) {
                setLoading(false);
                setProfile({ email: response.data.data.email, name: response.data.data.name, imageUrl: response.data.data.imageUrl })
                setEditState({ email: response.data.data.email, name: response.data.data.name, imageUrl: response.data.data.imageUrl })
            } else {
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(fileReader.error);
            };
        })
    };

    const handleImageChange = async (input) => {
        const file = input.target.files[0];
        const base64 = await convertToBase64(file);
        setEditState({ ...editState, imageUrl: base64 });
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
                <img
                    className="images"
                    src={profile.imageUrl || "/images/default-profile.jpeg"}
                    alt={`${profile.name}-profile`}
                />
                <PrimaryTypography value={profile.name} />
                <SecondaryTypography value={profile.email} />
                <CardActions>
                    <SecondaryButton label="EDIT" onClick={handleEdit} isDisabled={false} />
                    <SecondaryButton label="LOGOUT" onClick={handleLogout} isDisabled={false} />
                </CardActions>
            </React.Fragment>
        )
    }

    return (
        loading ? (
            <Loader />
        ) : (
            <Container className="container" sx={{ display: "flex" }}>
                {editable ? (
                    <React.Fragment>
                        <img
                            className="images"
                            src={editState.imageUrl || profile.imageUrl || "/images/default-profile.jpeg"}
                            alt={`${profile.name}-profile`}
                        />
                        <IconButton onChange={handleImageChange} color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" />
                            <EditIcon />
                        </IconButton>
                        <SecondaryTextfield
                            value={editState.name}
                            label="Name"
                            disabled={false}
                            onChange={(e) => handleOnChange(e, "name")} />
                        <SecondaryTextfield
                            value={editState.email}
                            label="Email"
                            disabled={true}
                            onChange={(e) => handleOnChange(e, "email")} />
                        <CardActions>
                            <SecondaryButton label="CANCEL" onClick={handleCancel} isDisabled={false} />
                            <SecondaryButton label="SUBMIT" onClick={handleSubmit} isDisabled={false} />
                        </CardActions>
                    </React.Fragment>
                ) : <RenderProfileData />}
            </Container >
        )
    )
}

export default Profile;
