import React, { useState } from 'react';
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { IconButton, InputAdornment } from '@mui/material';

import { PrimaryButton, Heading, PublicFormHoc, PrimaryTextfield, FormFooter, Loader } from '../../components';
import { setToken } from '../../helper';
import { signup } from '../../apis';


const Signup = (props) => {
    const { history } = props;
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (input, field) => {
        setState({ ...state, [field]: input.target.value });
    };

    const resetState = () => {
        setLoading(false)
        setState({});
    };

    const handleSignup = async () => {
        try {
            const { email, password, name } = state;
            setLoading(true);
            const response = await signup(name, email, password);
            const { data: { accessToken = "", refreshToken = "" }, status } = response
            if (status === 200) {
                setToken(accessToken, refreshToken);
                history.push('/profile')
                resetState();
            } else {
                alert(response.data.message || "Bad request");
                resetState();
            }
        } catch (err) {
            alert("login failed");
            resetState();
        }
    };

    const handleEnter = (e) => {
        const { email, password, name } = state;
        if (e.key === "Enter" && email && password && name) {
            handleSignup();
        }
    };

    return (
        loading ? (
            <Loader />
        ) : (
            <>
                <img src="/images/login.png" alt="login" className="image" />
                <Heading value="Sign up" />
                <PrimaryTextfield
                    label="Full Name"
                    onEnter={handleEnter}
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
                    onEnter={handleEnter}
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
                    onEnter={handleEnter}
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
    )
}

export default PublicFormHoc(Signup);
