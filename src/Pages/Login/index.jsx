import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment, IconButton } from '@mui/material'

import { PrimaryButton, Heading, PrimaryTextfield, PublicFormHoc, FormFooter, CustomCheckbox, Loader } from "../../components";
import { login } from '../../apis';
import { setToken } from '../../helper';
import "./style.scss";


const Login = (props) => {
    const { history } = props;

    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (input, field) => {
        setState({ ...state, [field]: input.target.value });
    };

    const resetState = () => {
        setLoading(false);
        setState({});
    };

    const handleLogin = async () => {
        try {
            const { username, password } = state;
            setLoading(true);
            const response = await login(username, password);
            const { data: { accessToken = "", refreshToken = "" }, status } = response
            if (status === 200) {
                setToken(accessToken, refreshToken);
                history.push('/profile')
                resetState()
            } else {
                alert(response.data.message || "Bad request");
                resetState()
            }
        } catch (err) {
            alert("Wrong Credentials")
            resetState()
        }
    };

    const handleEnter = (e) => {
        const { username, password } = state;
        if (e.key === "Enter" && username && password) {
            handleLogin();
        }
    };

    return (
        loading ? (
            <Loader />
        ) : (
            <>
                <img src="/images/login.png" alt="login" className="image" />
                <Heading value="Login" />
                <PrimaryTextfield
                    label="Email Address"
                    onEnter={handleEnter}
                    onChange={(input) => { handleChange(input, 'username') }}
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
                    label="Password"
                    type={visible ? "text" : "password"}
                    onEnter={handleEnter}
                    onChange={(input) => { handleChange(input, 'password') }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={() => setVisible(!visible)} className="icon-button">
                                    {visible ? <VisibilityOffIcon className="icon" /> : <VisibilityIcon className="icon" />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <br />
                <CustomCheckbox />

                <PrimaryButton
                    label="LOGIN"
                    onClick={handleLogin}
                    isDisabled={!(state.username && state.password)} />

                <br />
                <FormFooter
                    onClick={() => history.push("/signup")}
                    label="Not registered yet?"
                    value="Create an Account" />
            </>
        ))
}

export default PublicFormHoc(Login);
