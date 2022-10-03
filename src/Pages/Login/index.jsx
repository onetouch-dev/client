import React, { useState } from 'react';
import axios from "axios";
import {
    Box,
    Link,
    FormControlLabel,
    Checkbox,
    Container,
    Backdrop,
    CircularProgress,
    InputAdornment,
    IconButton
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import "./style.scss";
import { PrimaryButton, Heading, PrimaryTextfield } from "../../components";

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

    const handleLogin = async () => {
        try {
            setLoading(true);
            const data = {
                username: state.username,
                password: state.password
            };
            const config = {
                method: 'post',
                url: 'http://localhost:9000/api/user/login',
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
                setLoading(false);
                setState({});
            } else {
                alert(response.data.message || "Bad request");
                setLoading(false);
                setState({});
            }
            setState({})

        } catch (err) {
            alert("login failed")
            setLoading(false);
            setState({})
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
            <Container maxWidth="sm">
                <Box
                    className="box"
                    sx={{
                        marginTop: 12,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <img src="/images/login.png" alt="login" className="image" />
                    <Heading value="Login" />
                    <PrimaryTextfield
                        label="Email Address"
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <PrimaryButton
                        label="SIGN IN"
                        onClick={handleLogin}
                        isDisabled={!(state.username && state.password)} />
                    <div onClick={() => history.push('/signup')}>
                        <Link variant="body2" style={{ cursor: "pointer" }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </div>
                </Box>
            </Container>
    )
}

export default Login;