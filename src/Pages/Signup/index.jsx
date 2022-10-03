import React, { useState } from 'react';
import axios from "axios";
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Backdrop, CircularProgress, IconButton, InputAdornment } from '@mui/material';

import { PrimaryButton, Heading, PublicFormHoc, PrimaryTextfield, FormFooter } from '../../components';


const Signup = (props) => {
    const { history } = props;
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (input, field) => {
        setState({ ...state, [field]: input.target.value });
    };

    const handleSignup = async () => {
        try {
            setLoading(true);
            const data = JSON.stringify({
                "name": state.name,
                "email": state.email,
                "password": state.password,
            });

            const config = {
                method: 'post',
                url: 'http://localhost:9000/api/user/signup',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios(config)

            if (response.data.status === 200) {
                localStorage.setItem("access-token", response.data.accessToken);
                localStorage.setItem("refresh-token", response.data.refreshToken);
                history.push('/profile')
                setLoading(false)
                setState({});
            } else {
                alert(response.data.message || "Bad request");
                setLoading(false)
                setState({});
            }
        } catch (err) {
            alert("login failed");
            setState({});
            setLoading(false);
        }

    }

    return (
        loading ? (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        ) :
            <>
                <img src="/images/login.png" alt="login" className="image" />
                <Heading value="Sign up" />
                <PrimaryTextfield
                    label="Full Name"
                    onChange={(input) => { handleChange(input, 'name') }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton className="icon-button">
                                    <AccountCircle className="icon" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <PrimaryTextfield
                    label="Email Address"
                    onChange={(input) => { handleChange(input, 'email') }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton className="icon-button">
                                    <EmailIcon className="icon" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <PrimaryTextfield
                    label="Password"
                    onChange={(input) => { handleChange(input, 'password') }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton className="icon-button">
                                    <HttpsIcon className="icon" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <PrimaryButton
                    label="SIGN UP"
                    onClick={handleSignup}
                    isDisabled={!(state.name && state.email && state.password)} />

                <br />
                <FormFooter
                    onClick={() => history.push("/login")}
                    label="Already have an account?"
                    value="Login" />
            </>
    )
}

export default PublicFormHoc(Signup);
